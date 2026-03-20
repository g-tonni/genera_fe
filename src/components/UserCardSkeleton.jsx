function UserCardSkeleton() {
  return (
    <div className="w-full flex items-center animate-pulse">
      <div className="w-1/4 aspect-square rounded-full overflow-hidden">
        <div className="h-full w-full bg-neutral-900"></div>
      </div>
      <div className="flex flex-col ps-6">
        <div className="h-5 w-full bg-neutral-900 "></div>

        <div className="flex items-center h-4 mt-3">
          <div className="h-full w-15 bg-neutral-900 me-3"></div>
          <div className="h-full w-15 bg-neutral-900 "></div>
        </div>
      </div>
    </div>
  )
}

export default UserCardSkeleton
