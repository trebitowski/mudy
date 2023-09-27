'use client'

import { askQuestion } from '@/utils/api'
import React from 'react'

function Question() {
  const [value, setValue] = React.useState('')
  const [answer, setAnswer] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(event) {
    event?.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    setAnswer(answer)
    setLoading(false)
    setValue('')
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          value={value}
          type="text"
          placeholder="Ask a question..."
          onChange={(event) => setValue(event.target.value)}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
          disabled={loading}
        />
        <button
          disabled={loading}
          className="bg-emerald-600 text-lg px-4 py-2.5 rounded-lg ml-4 text-white"
        >
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
      {answer && <p className="text-lg">{answer}</p>}
    </div>
  )
}

export default Question
