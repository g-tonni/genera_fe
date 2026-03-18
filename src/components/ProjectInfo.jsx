import { useSelector } from 'react-redux'
import OutlineButton from './OutlineButton'
import { Link } from 'react-router-dom'

function ProjectInfo({ project }) {
  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  return (
    <div className="w-full min-h-screen bg-black text-gray-50 px-10 md:px-30 xl:px-50 2xl:px-80 py-30 lg:py-0 flex justify-center items-center">
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-between items-start">
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={project.cover}
                alt="Project cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 aspect-square lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between">
            <div className="w-full h-full flex flex-col justify-between">
              <div>
                <div>
                  <p>{project.title}</p>
                  <p>
                    by <span>{project.author.username}</span>
                  </p>
                </div>
                {project.description && project.description !== '' && (
                  <p>{project.description}</p>
                )}
                <div>
                  {project.howToInteract &&
                    project.howToInteract !==
                      '' &&(
                        <div>
                          <p>How to interact</p>
                          <p>{project.howToInteract}</p>
                        </div>,
                      )}
                </div>
              </div>
              {project.author.userId === userId && (
                <Link to={`/projects/${project.projectId}/edit`}>
                  <div className="w-full flex justify-end">
                    <OutlineButton text="EDIT" size="md" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectInfo
