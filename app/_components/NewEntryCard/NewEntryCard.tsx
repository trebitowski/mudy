'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

function NewEntryCard() {
  const router = useRouter()
  async function handleClick() {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer overflow-hidden rounded-l bg-white shadow"
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New entry</span>
      </div>
    </button>
  )
}

export default NewEntryCard
