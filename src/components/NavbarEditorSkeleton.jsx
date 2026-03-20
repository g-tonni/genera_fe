function NavbarEditorSkeleton() {
  return (
    <div className="fixed z-10 w-full h-16 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black flex justify-between items-center animate-pulse">
      <div className="flex items-center w-full lg:w-1/3">
        <div className="h-6 w-5 bg-neutral-900" />
        <div className="flex items-center ps-4 space-x-3">
          <div className="h-5 w-32 bg-neutral-900" />
          <div className="h-3 w-20 bg-neutral-900 hidden sm:block" />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex justify-center space-x-4 lg:space-x-6">
        <div className="h-6 w-6 bg-neutral-900 rounded-full" />
        <div className="h-6 w-6 bg-neutral-900 rounded-full" />
        <div className="h-6 w-6 bg-neutral-900 rounded-full" />
      </div>

      <div className="w-full lg:w-1/3 flex justify-end items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-neutral-900" />
          <div className="h-5 w-5 bg-neutral-900 rounded-full" />
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-neutral-900" />
          <div className="h-5 w-5 bg-neutral-900 rounded-full" />
        </div>
        <div className="h-7 w-7 bg-neutral-900 rounded-full" />
      </div>
    </div>
  )
}

export default NavbarEditorSkeleton
