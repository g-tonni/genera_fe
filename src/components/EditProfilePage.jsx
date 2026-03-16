function EditProfilePage() {
  return (
    <div className="w-full min-h-screen bg-black text-gray-50 px-10 md:px-30 xl:px-60 2xl:px-100 py-30 lg:py-0 flex justify-center items-center">
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-full flex flex-col justify-between items-start">
            <div className="w-full aspect-square rounded-full overflow-hidden">
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1772903135/ggfstlipbuzzh1hu1nmw.png"
                alt="Basic profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-2/3 lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between items-end">
            <div className="w-full">
              <form id="editForm">
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="New name..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">Bio</label>
                <input
                  type="text"
                  placeholder="New bio..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">Location</label>
                <input
                  type="text"
                  placeholder="New location..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">Website</label>
                <input
                  type="text"
                  placeholder="New website..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="New email..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="New password..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
              </form>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between pt-15">
          <button className="font-semibold text-red-700 border-3 border-red-700 hover:bg-red-700 hover:text-black transition-colors duration-150 cursor-pointer py-2 px-6">
            DELETE PROFILE
          </button>
          <button
            type="submit"
            form="editForm"
            className="px-6 bg-white border-3 border-white text-black font-bold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer py-2"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
