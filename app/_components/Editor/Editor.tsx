'use client'

import { updateEntry } from '@/utils/api'
import { CheckIcon, Loader2Icon } from 'lucide-react'
import React from 'react'
import { useAutosave } from 'react-autosave'

function Editor({ entry }) {
  const [content, setContent] = React.useState(entry.content)
  const [loading, setLoading] = React.useState(false)
  const [analysis, setAnalysis] = React.useState(entry.analysis)

  useAutosave({
    data: content,
    onSave: async (newContent) => {
      setLoading(true)
      const { analysis } = await updateEntry(entry.id, newContent)
      setAnalysis(analysis)
      setLoading(false)
    },
  })

  const {
    mood = '',
    summary = '',
    subject = '',
    negative = false,
    color = '',
  } = analysis || {}

  const analysisData = [
    { name: 'Mood', value: mood },
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Negative', value: negative.toString() },
  ]

  return (
    <div className="grid grid-cols-3 h-full">
      <div className="w-full h-full flex col-span-2">
        <div className="w-full h-full flex relative">
          <div
            className={
              loading
                ? 'absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-amber-100'
                : 'absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-emerald-100'
            }
          >
            {loading ? (
              <Loader2Icon strokeWidth={4} size={14} className="animate-spin" />
            ) : (
              <CheckIcon strokeWidth={4} size={14} />
            )}
          </div>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="grow p-8 text-xl bg-transparent outline-none resize-none"
          />
        </div>
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-3xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="w-full px-6 flex gap-8 justify-between border-b border-black/10 first:border-t py-2"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
