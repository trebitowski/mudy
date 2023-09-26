'use client'

import React from 'react'

function Question() {
  const [value, setValue] = React.useState('')

  function handleSubmit(event) {
    event?.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          type="text"
          placeholder="Ask a question..."
          onChange={(event) => setValue(event.target.value)}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button className="bg-emerald-600 text-lg px-4 py-2.5 rounded-lg">
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
