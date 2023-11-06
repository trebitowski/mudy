'use client'

import { updateEntry, analyzeEntry } from '@/utils/api'
import { CheckIcon, Loader2Icon, LucideRotateCw, XIcon } from 'lucide-react'
import React from 'react'
import { useAutosave } from 'react-autosave'
import type { JournalEntry, Analysis } from '@prisma/client';

type PropTypes = {
  entry: (JournalEntry & { analysis: Analysis | null }) | null
}

function Editor({ entry }: PropTypes) {
  const [content, setContent] = React.useState(entry?.content)
  const [isSaved, setIsSaved] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [analysis, setAnalysis] = React.useState(entry?.analysis)
  const [analysisLoading, setAnalysisLoading] = React.useState(false)

  useAutosave({
    data: content,
    onSave: async (newContent: string) => {
      setLoading(true)
      setIsSaved(true)
      await updateEntry(entry?.id ?? "", newContent)
      setLoading(false)
    },
  })

  async function reanalyze() {
    setAnalysisLoading(true)
    const { analysis } = await analyzeEntry(entry?.id ?? "");
    setAnalysis(analysis)
    setAnalysisLoading(false)
  }

  const {
    subject = '',
    color = '',
  } = analysis || {}

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-52 shrink-0 relative" style={{ backgroundColor: color }}>
        <button disabled={analysisLoading || !isSaved} onClick={reanalyze} className={'absolute bottom-4 right-4 w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-sky-100' + (analysisLoading ? " animate-spin" : "") + (isSaved ? "" : " opacity-50")}><LucideRotateCw strokeWidth={3} size={20} /></button>
      </div>
      <div className="w-full relative grow">
        <div className="w-full h-full text-xl flex flex-col">
          <div
            className={
              loading
                ? 'absolute bottom-4 right-4 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-amber-100'
                : isSaved ? 'absolute bottom-4 right-4 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-emerald-100'
                : 'absolute bottom-4 right-4 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-rose-100'
              }
          >
            {loading ? (
              <Loader2Icon strokeWidth={4} size={20} className="animate-spin" />
            ) : isSaved ? (
              <CheckIcon strokeWidth={4} size={20} />
            ) : (<XIcon strokeWidth={4} size={20} />)}
          </div>
          <div className="pt-16 w-full max-w-[calc(80ch+64px)] mx-auto px-8">
            <h1 className="text-[40px] font-bold leading-[48px]">{subject}</h1>
          </div>
          <textarea
            value={content}
            onChange={(event) => {setContent(event.target.value), setIsSaved(false)}}
            className="grow pt-8 bg-transparent outline-none resize-none"
            style={{
              paddingInline: "max(calc((100% - 80ch) / 2), 32px)"
            }}
          />
        </div>
        </div>
    </div>
  )
}

export default Editor
