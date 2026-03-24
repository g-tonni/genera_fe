import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import ProjectCard from './ProjectCard'
import { useEffect, useState } from 'react'
import ProjectCardSkeleton from './ProjectCardSkeleton'
import { IoArrowBackOutline } from 'react-icons/io5'
import { IoArrowForward } from 'react-icons/io5'

function DiscoverPage() {
  const [section, setSection] = useState('Generative')

  const numberSkeleton = Array.from({ length: 18 })

  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)

  const [projects, setProjects] = useState(null)

  const baseUrl = 'http://localhost:3001/projects'

  const getProjects = function () {
    fetch(baseUrl + '?category=' + section + '&size=18&page=' + page)
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
        setProjects(data)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, page])

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="w-full pb-15 bg-black pt-30 xl:pt-40 overflow-x-hidden">
        {/*  BOTTONI SEZIONI */}
        {/* BOX PER LINEA */}
        <div className="border-b-2 border-gray-50/20">
          {/* BOX PER SCROLL */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* BOX PER BOTTONI */}
            <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex text-gray-50">
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'Generative' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('Generative')
                  setPage(0)
                  setLoading(true)
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Generative
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'Interactive' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('Interactive')
                  setPage(0)
                  setLoading(true)
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Interactive
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'Spatial' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('Spatial')
                  setPage(0)
                  setLoading(true)
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Spatials
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'Patterns' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('Patterns')
                  setPage(0)
                  setLoading(true)
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Patterns
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'Particles' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('Particles')
                  setPage(0)
                  setLoading(true)
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  Particles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEZIONI */}
      </div>
      <div className="w-full mx-auto px-12 md:px-20 xl:px-25 bg-black text-gray-50 pb-30 min-h-screen">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
          {loading &&
            numberSkeleton.map((_, i) => {
              return <ProjectCardSkeleton key={i} />
            })}
          {projects &&
            projects.content.map((project) => {
              return <ProjectCard project={project} key={project.projectId} />
            })}
        </div>
        <div className="w-full flex justify-center items-center pt-20">
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
              <p
                className={`text-lg text-gray-50/60 font-semibold ${projects?.totalPages === 0 ? 'hidden' : 'block'}`}
              >
                <span className="text-gray-50">{page + 1}</span> of{' '}
                {projects?.totalPages}
              </p>
            </div>
            <div className="w-6 h-6 ms-6">
              <div
                className={`${page === projects?.totalPages - 1 || projects?.totalPages === 0 ? 'hidden' : 'flex'}`}
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
    </>
  )
}

export default DiscoverPage
