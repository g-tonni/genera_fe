import { BsArrowThroughHeart } from 'react-icons/bs'
import { BiComment } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ProjectCard({ project }) {
  const [comments, setComments] = useState(null)
  const [appreciations, setAppreciations] = useState(null)

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

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
        setComments(data)
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  const url = `http://localhost:3001/projects/${project.projectId}/appreciations`

  const getAppreciations = function () {
    fetch(url, {
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
        console.log('APPRECIATIONS ', data)
        setAppreciations(data)
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
    <Link to={`/projects/${project.projectId}`}>
      <div className="w-full hover:bg-gray-50/20 p-2 transition-colors duration-220 cursor-pointer">
        <div className="w-full aspect-square overflow-hidden">
          <img
            src={project.cover}
            alt="Basic profile"
            className="w-full h-full object-cover"
          />
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
                <p className="text-sm lg:text-base font-semibold pe-1 lg:pe-2">
                  {appreciations?.length}
                </p>
                <BsArrowThroughHeart className="h-full w-3 lg:w-4" />
              </div>
              <div className="flex items-center">
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
  )
}

export default ProjectCard
