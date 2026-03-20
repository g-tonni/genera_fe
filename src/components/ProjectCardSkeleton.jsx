function ProjectCardSkeleton() {
  return (
    <div className="w-full p-2 animate-pulse">
      <div className="w-full aspect-square bg-neutral-900" />

      <div className="flex flex-col">
        <div className="h-6 bg-neutral-900 my-4 w-full" />

        <div className="flex items-center py-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-neutral-800" />
            <div className="h-4 bg-neutral-900 w-16 " />
          </div>
          <div className="flex gap-3">
            <div className="h-4 bg-neutral-900 w-16 " />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCardSkeleton
