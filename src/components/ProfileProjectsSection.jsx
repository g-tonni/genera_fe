import { IoSearch } from 'react-icons/io5'
import ProjectCard from './ProjectCard'
import OutlineButton from './OutlineButton'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import WhiteButton from './WhiteButton'
import { useSelector } from 'react-redux'

function ProfileProjectsSection({ section }) {
  const [projects, setProjects] = useState(null)

  const [partialTitle, setPartialTitle] = useState('')

  const params = useParams()

  const baseUrl = 'http://localhost:3001/users/' + params.id + '/'

  const newProjectUrl = 'http://localhost:3001/projects'

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const getProjects = function () {
    fetch(baseUrl + section + '?partialTitle=' + partialTitle, {
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
        console.log(data)
        setProjects(data)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const createNewProject = function () {
    fetch(newProjectUrl, {
      method: 'POST',
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
        console.log(data)
        getProjects()
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, partialTitle, params.id])

  return (
    <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col items-end text-gray-50 min-h-screen">
      {/*  BARRA RICERCA */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div
          className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex pb-15 sm:pe-5 md:pe-0 sm:py-15 order-2 sm:order-1"
          onClick={() => {
            createNewProject()
          }}
        >
          <div
            className={`w-full ${section !== 'projects' || params.id !== userId ? 'hidden' : 'flex'}`}
          >
            <WhiteButton text="CREATE SKECTH" size="sm" />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex sm:ps-5 md:ps-0 py-15 order-1 sm:order-2">
          <div className="relative w-full h-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <IoSearch />
            </span>

            <input
              type="search"
              placeholder="Search projects..."
              className="w-full bg-neutral-900 text-gray-50 ps-10 pe-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={partialTitle}
              onChange={(e) => {
                setPartialTitle(e.target.value)
              }}
            />
          </div>
        </div>
      </div>

      {/* SEZIONE CARD */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
        {projects &&
          projects.content.map((project) => {
            return <ProjectCard project={project} getProjects={getProjects} />
          })}
      </div>
    </div>
  )
}

export default ProfileProjectsSection
