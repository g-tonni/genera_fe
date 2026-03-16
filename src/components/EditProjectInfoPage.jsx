function EditProjectInfoPage() {
  return (
    <div className="w-full min-h-screen bg-black text-gray-50 px-10 md:px-30 xl:px-50 2xl:px-80 py-30 lg:py-0 flex justify-center items-center">
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-between items-start">
            <div className="w-full aspect-square overflow-hidden">
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1772897894/immagini_default-20_wqtzqb.png"
                alt="Basic profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 aspect-square lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between items-end">
            <div className="w-full h-full flex flex-col justify-between items-end">
              <form id="editForm">
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="New title..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">Description</label>
                <input
                  type="text"
                  placeholder="New description..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold">How to interact</label>
                <input
                  type="text"
                  placeholder="New how to interact..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                />
                <label className="font-semibold block">Category</label>
                <select name="category" className="w-full p-2 mt-3 focus:outline-none border border-gray-50/30">
                  <option value="Generative">Generative</option>
                  <option value="Interactive">Interactive</option>
                  <option value="Spatials">Spatials</option>
                  <option value="Patterns">Patterns</option>
                  <option value="Particles">Particles</option>
                </select>
              </form>
              <button
                type="submit"
                form="editForm"
                className="mt-10 px-6 bg-white border-3 border-white text-black font-bold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer py-2"
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProjectInfoPage;
