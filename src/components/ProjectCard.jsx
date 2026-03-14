import { BsArrowThroughHeart } from 'react-icons/bs'
import { BiComment } from 'react-icons/bi'

function ProjectCard() {
  return (
    <div className="w-full hover:bg-gray-50/20 p-2 transition-colors duration-220 cursor-pointer">
      <div className="w-full aspect-square overflow-hidden">
        <img
          src="https://res.cloudinary.com/cloudgiada/image/upload/v1772897894/immagini_default-20_wqtzqb.png"
          alt="Basic profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="font-bold border-b border-gray-50/30 py-4">
          Project name
        </p>
        <div className="flex items-center py-4 justify-between text-gray-50/70">
          <div className="flex items-center">
            <div className="w-5 aspect-square rounded-full overflow-hidden">
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1772903135/ggfstlipbuzzh1hu1nmw.png"
                alt="Basic profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs lg:text-sm ps-2 whitespace-nowrap hover:text-gray-50 transition-colors duration-150 cursor-pointer">
              Giada Tonni
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center pe-3">
              <p className="text-sm lg:text-base font-semibold pe-1 lg:pe-2">
                10
              </p>
              <BsArrowThroughHeart className="h-full w-3 lg:w-4" />
            </div>
            <div className="flex items-center">
              <p className="text-sm lg:text-base font-semibold pe-1 lg:pe-2">
                3
              </p>
              <BiComment className="h-full w-3 lg:w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
