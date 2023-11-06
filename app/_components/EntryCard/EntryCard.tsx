function EntryCard({ entry }) {
  const {createdAt, content, analysis} = entry;
  const {color, subject} = analysis;
  const event = new Date(createdAt)
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  } as const;
  return (
<div
className="cursor-pointer overflow-hidden rounded bg-white w-[230px] min-h-[300px] border flex flex-col"
>
<div className="grow w-full p-4 text-[5px]">
  <div className="bg-stone-300 mb-4 h-4 w-[40%] rounded-sm" />
  <div className="bg-stone-300 mb-2 h-2 w-[90%] rounded-sm" />
  <div className="bg-stone-300 mb-2 h-2 w-[85%] rounded-sm" />
  <div className="bg-stone-300 mb-4 h-2 w-[87%] rounded-sm" />
  <div className="bg-stone-300 mb-2 h-2 w-[89%] rounded-sm" />
  <div className="bg-stone-300 mb-2 h-2 w-[92%] rounded-sm" />
  <div className="bg-stone-300 mb-4 h-2 w-[56%] rounded-sm" />
  <div className="bg-stone-300 mb-2 h-2 w-[82%] rounded-sm" />
  <div className="bg-stone-300 mb-2 h-2 w-[90%] rounded-sm" />
  <div className="bg-stone-300 h-2 w-[35%] rounded-sm" />
</div>
<div className="p-4 pl-2.5 border-l-[6px] border-t w-full shrink-0 min-h-[75px] flex flex-col justify-center text-left" style={{borderLeftColor: color}}>
  <span className="text-lg font-semibold">{subject}</span>
  <span className="text-sm font-medium text-stone-600">{event.toLocaleDateString('en-US', options)}</span>
</div>
</div>
  )
}

export default EntryCard
