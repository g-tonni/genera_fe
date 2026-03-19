import { useSelector } from 'react-redux'
import OutlineButton from './OutlineButton'
import { Link } from 'react-router-dom'

function ProjectInfo({ project }) {
  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  return (
    <div className="w-full min-h-screen bg-black text-gray-50 px-10 py-40 flex justify-center items-center">
      <div className="w-full sm:w-3/4">
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
          <div className="w-full lg:w-1/2 lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between">
            <div className="w-full h-full flex flex-col justify-between">
              <div className="flex flex-col justify-center h-full">
                <div>
                  <p className="text-5xl font-bold">{project.title}</p>
                  <p className="text-2xl font-thin pt-4 italic pb-10">
                    by{' '}
                    <span className="text-2xl font-medium">
                      {project.author.username}
                    </span>
                  </p>
                </div>
                {project.description && project.description !== '' && (
                  <p className="text-sm font-thin pb-10">
                    {project.description}
                  </p>
                )}
                <div>
                  {project.howToInteract && project.howToInteract !== '' && (
                    <div>
                      <p className="text-sm font-semibold">How to interact</p>
                      <p className="text-sm font-thin pb-8">
                        {project.howToInteract}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold">Published</p>
                    <p className="text-sm font-thin pb-8">
                      {project.published}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Last updated</p>
                    <p className="text-sm font-thin pb-8">
                      {project.lastUpdated}
                    </p>
                  </div>
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
