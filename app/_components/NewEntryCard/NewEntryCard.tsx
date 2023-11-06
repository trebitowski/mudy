'use client'

import { createNewEntry } from '@/utils/api'
import { LucidePlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

function NewEntryCard() {
  const router = useRouter()
  async function handleClick() {
    const data = await createNewEntry()
    router.push(`/journal/${data.id}`)
  }

  const event = new Date();
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  } as const;

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer overflow-hidden rounded bg-white w-[230px] h-[300px] border flex flex-col"
    >
      <div className="grow w-full flex items-center justify-center text-stone-300">
        <LucidePlusCircle size={80} />
      </div>
      <div className="p-4 border-t w-full shrink-0 min-h-[75px] flex flex-col justify-center text-left">
        <span className="text-lg font-semibold">Create entry</span>
        <span className="text-sm font-medium text-stone-600">{event.toLocaleDateString('en-US', options)}</span>
      </div>
    </button>
  )
}

export default NewEntryCard
