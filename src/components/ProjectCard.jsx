import { BsArrowThroughHeart } from 'react-icons/bs'
import { BiComment } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdDeleteForever } from 'react-icons/md'
import OutlineButton from './OutlineButton'

function ProjectCard({ project, getProjects }) {
  const [comments, setComments] = useState(null)
  const [appreciations, setAppreciations] = useState(null)

  const [deleteProjectModal, setDeleteProjectModal] = useState(false)

  const [loading, setLoading] = useState(true)

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const location = useLocation()

  const commentsUrl = `http://localhost:3001/projects/${project.projectId}/comments`

  const getComments = function () {
    fetch(commentsUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .then((data) => {
        // console.log(data)
        setLoading(false)
        setComments(data)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE :', err)
      })
  }

  const appreciationsUrl = `http://localhost:3001/projects/${project.projectId}/appreciations`

  const getAppreciations = function () {
    fetch(appreciationsUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .then((data) => {
        // console.log('APPRECIATIONS ', data)
        setAppreciations(data)
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  const deleteProjectUrl = `http://localhost:3001/projects/${project.projectId}`

  const deleteProject = function () {
    fetch(deleteProjectUrl, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setDeleteProjectModal(false)
          getProjects()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  useEffect(() => {
    getComments()
    getAppreciations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Link to={token ? `/projects/${project.projectId}` : '/register'}>
        <div className="w-full hover:bg-gray-50/20 p-2 transition-colors duration-220 cursor-pointer">
          <div className="w-full aspect-square overflow-hidden relative">
            <img
              src={project.cover}
              alt="Basic profile"
              className="w-full h-full object-cover"
            />
            <div
              className={`bg-red-600/60 ${location.pathname === `/profile/${userId}` && project.author.userId === userId ? 'flex' : 'hidden'} hover:bg-red-600 absolute top-0 right-0 m-3 text-gray-50 p-1`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setDeleteProjectModal(true)
              }}
            >
              <MdDeleteForever
                className={`h-full w-5 transition-colors duration-150 cursor-pointer`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-bold border-b border-gray-50/30 py-4">
              {project.title}
            </p>
            <div className="flex items-center py-4 justify-between text-gray-50/70">
              <div className="flex items-center">
                <div className="w-5 aspect-square rounded-full overflow-hidden border border-gray-50/10">
                  <img
                    src={project.author.profileImage}
                    alt="Profile image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs lg:text-sm ps-2 whitespace-nowrap">
                  {project.author.username}
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center pe-3">
                  {loading && (
                    <div className="h-5 w-5 bg-neutral-900 animate-pulse"></div>
                  )}
                  <p className="text-sm lg:text-base font-semibold pe-1 lg:pe-2">
                    {appreciations?.length}
                  </p>
                  <BsArrowThroughHeart className="h-full w-3 lg:w-4" />
                </div>
                <div className="flex items-center">
                  {loading && (
                    <div className="h-5 w-5 bg-neutral-900 animate-pulse"></div>
                  )}
                  <p className="text-sm lg:text-base font-semibold pe-1 lg:pe-2">
                    {comments?.length}
                  </p>
                  <BiComment className="h-full w-3 lg:w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {deleteProjectModal && (
        <div className="w-screen h-screen -translate-x-12 md:-translate-x-20 xl:-translate-x-25 bg-black/70 fixed top-0 flex justify-center items-center z-2">
          <div className="w-full mx-12 md:mx-0 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-1/3 bg-black flex flex-col justify-between items-center p-10  border border-gray-50/10">
            <div className="w-full flex">
              <p className="font-thin w-full lg:w-1/2 text-lg pe-3">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-xl">{project.title}</span>{' '}
                project?
              </p>
              <div className="w-full lg:w-1/2 aspect-square overflow-hidden mb-15">
                <img
                  src={project.cover}
                  alt="Image upload"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div
                onClick={() => {
                  setDeleteProjectModal(false)
                }}
              >
                <OutlineButton text="CANCEL" size="md" />
              </div>
              <button
                className="font-semibold text-red-700 border-3 border-red-700 hover:bg-red-700 hover:text-black transition-colors duration-150 cursor-pointer py-2 px-6"
                onClick={() => {
                  deleteProject()
                }}
              >
                DELETE PROJECT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectCard
