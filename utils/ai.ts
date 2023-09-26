import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from 'langchain/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the emotion of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    summary: z.string().describe('a quick summary of the entire entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hsl color code that represents the mood of the journal entry. Example hsl(220, 50%, 75%) for blue representing sadness. The hue should represent the mood and ranges from 0 to 360. saturation should be less than 60% depending on the mood. lightness is always 75%.'
      ),
  })
)

async function getPrompt(content) {
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

export async function analyze(content) {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const prompt = await getPrompt(content)
  const result = await model.call(prompt)

  try {
    return parser.parse(result)
  } catch (error) {
    console.log(error)
  }
}

export async function qa() {
  //TODO: implement
}
