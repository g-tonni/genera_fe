import { IoSearch } from 'react-icons/io5'
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import WhiteButton from './WhiteButton'
import { useSelector } from 'react-redux'
import { IoArrowBackOutline } from 'react-icons/io5'
import { IoArrowForward } from 'react-icons/io5'

function ProfileProjectsSection({ section, getMyProjects }) {
  const [projects, setProjects] = useState(null)

  const [partialTitle, setPartialTitle] = useState('')

  const [page, setPage] = useState(0)

  const [loading, setLoading] = useState(true)
  const numberSkeleton = Array.from({ length: 12 })

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
    fetch(
      baseUrl +
        section +
        '?partialTitle=' +
        partialTitle +
        '&size=12&page=' +
        page,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .then((data) => {
        console.log('PROFILE PROJECT SECTION', data)
        setLoading(false)
        setProjects(data)
        getMyProjects()
      })
      .catch((err) => {
        setLoading(false)
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
          setLoading(false)
          getProjects()
          getMyProjects()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, partialTitle, params.id, page])

  return (
    <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col items-end text-gray-50 pb-30 min-h-screen">
      {/*  BARRA RICERCA */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div
          className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex pb-15 sm:pe-5 md:pe-0 sm:py-15 order-2 sm:order-1"
          onClick={() => {
            setLoading(true)
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
                setLoading(true)
                setPartialTitle(e.target.value)
              }}
            />
          </div>
        </div>
      </div>

      {/* SEZIONE CARD */}
      <div className="w-full min-h-210 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pb-20">
        {loading &&
          numberSkeleton.map((_, i) => {
            return <ProjectCardSkeleton key={i} />
          })}
        {section === 'projects' &&
          projects?.content.map((project) => {
            return (
              <ProjectCard
                key={project.projectId}
                project={project}
                getProjects={getProjects}
              />
            )
          })}
        {section === 'appreciations' &&
          projects?.content.map((appreciation) => {
            return (
              <ProjectCard
                key={appreciation.project.projectId}
                project={appreciation.project}
                getProjects={getProjects}
              />
            )
          })}
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="flex justify-between items-center">
          <div className="w-6 h-6 me-6">
            <div
              className={`${page === 0 ? 'hidden' : 'flex'}`}
              onClick={() => {
                setPage(page - 1)
              }}
            >
              <IoArrowBackOutline className="h-full w-6 flex hover:text-gray-50 text-gray-50/60 transition-colors duration-150 cursor-pointer" />
            </div>
          </div>
          <div>
            <p className="text-lg text-gray-50/60 font-semibold">
              <span className="text-gray-50">{page + 1}</span> of{' '}
              {projects?.totalPages}
            </p>
          </div>
          <div className="w-6 h-6 ms-6">
            <div
              className={`${page === projects?.totalPages - 1 ? 'hidden' : 'flex'}`}
              onClick={() => {
                setPage(page + 1)
              }}
            >
              <IoArrowForward className="h-full w-6 flex hover:text-gray-50 text-gray-50/60 transition-colors duration-150 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileProjectsSection
