import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from 'langchain/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { JournalEntry } from '@prisma/client'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the emotion of the person who wrote the journal entry.'),
    subject: z.string().describe('the title of the journal entry.'),
    summary: z.string().describe('a quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hsl color code that represents the journal entry. Example hsl(220, 50%, 75%) for blue representing sadness. The hue should represent the mood and ranges from 0 to 360. saturation should be less than 60% depending on the mood. lightness is always 75%.'
      ),
  })
)

async function getPrompt(content: string) {
  const formattedInstructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formattedInstructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  })

  const input = await prompt.format({
    entry: content,
  })

  return input
}

export async function analyze(content: string) {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const prompt = await getPrompt(content)
  const result = await model.call(prompt)

  try {
    return parser.parse(result)
  } catch (error) {
    console.log(error)
  }
}

export async function qa(question: string, entries: JournalEntry[]) {
  const docs = entries.map(
    (entry) =>
      new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, createdAt: entry.createdAt },
      })
  )

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)

  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)

  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.call({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
