import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import ProjectCard from './ProjectCard'
import { useEffect, useState } from 'react'
import ProjectCardSkeleton from './ProjectCardSkeleton'

function DiscoverPage() {
  const [section, setSection] = useState('Generative')

  const numberSkeleton = Array.from({ length: 18 })

  const [loading, setLoading] = useState(true)

  const [projects, setProjects] = useState(null)

  const baseUrl = 'http://localhost:3001/projects'

  const token = localStorage.getItem('token')

  const getProjects = function () {
    fetch(baseUrl + '?category=' + section + '&size=18', {
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
        //console.log(data)
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
  }, [section])

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
      </div>
    </>
  )
}

export default DiscoverPage
