function UserCard() {
  return (
    <div className="w-full flex items-center hover:bg-gray-50/20 p-2 transition-colors duration-220 cursor-pointer">
      <div className="w-1/4 aspect-square rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/cloudgiada/image/upload/v1772903135/ggfstlipbuzzh1hu1nmw.png"
          alt="Image profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col ps-6">
        <p className="text-lg font-semibold">Artist name</p>
        <p className="font-thin text-sm whitespace-nowrap">
          <span className="font-medium">27</span> projects,{' '}
          <span className="font-medium">30</span> supporters
        </p>
      </div>
    </div>
  )
}

export default UserCard
