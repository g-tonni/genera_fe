import NavbarDesktop from './NavbarDesktop'
import NavbarMobile from './NavbarMobile'
import FooterDesktop from './FooterDesktop'
import OutlineButton from './OutlineButton'
import WhiteButton from './WhiteButton'
import P5Iframe from './P5Iframe'
import { TiLocation } from 'react-icons/ti'
import { FaLink } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import ProfileProjectsSection from './ProfileProjectsSection'
import ProfileUsersSection from './ProfileUsersSection'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiImageEditFill } from 'react-icons/ri'

function ProfilePage() {
  const params = useParams()

  const navigate = useNavigate()

  const baseUrl = 'http://localhost:3001/users/'

  const [loading, setLoading] = useState(true)

  const [followed, setFollowed] = useState(null)

  const [connections, setConnections] = useState(null)
  const [supporters, setSupporters] = useState(null)
  const [appreciations, setAppreciations] = useState(null)
  const [projects, setProjects] = useState(null)

  const [section, setSection] = useState('projects')

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const [user, setUser] = useState({
    bio: '',
    name: '',
    email: '',
    location: '',
    profileImage: '',
    profileCoverSketch: null,
    userId: '',
    website: '',
    createdAt: '',
  })

  const getUser = function () {
    fetch(baseUrl + params.id, {
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
        setUser({
          bio: data.bio,
          name: data.username,
          email: data.email,
          location: data.location,
          profileImage: data.profileImage,
          profileCoverSketch: data.profileCoverSketch,
          userId: data.userId,
          website: data.website,
          createdAt: data.createdAt,
        })
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log('Errore nel caricamento profilo:', err)
        navigate('/404', { replace: true })
      })
  }

  const addConnection = function () {
    fetch(baseUrl + params.id + '/connections', {
      method: followed ? 'DELETE' : 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setFollowed(!followed)
          getUser()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const getMyConnections = function () {
    fetch(baseUrl + params.id + '/connections', {
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
        // console.log('CONNECTIONS', data)
        setConnections(data.totalElements)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const getMySupporters = function () {
    fetch(baseUrl + params.id + '/supporters', {
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
        // console.log('SUPPORTERS', data)
        const isFollowed = data.content.some(
          (user) => user.follower.userId === userId,
        )

        setFollowed(isFollowed)
        setSupporters(data.totalElements)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const getMyProjects = function () {
    fetch(baseUrl + params.id + '/projects', {
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
        setProjects(data.totalElements)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const getMyAppreciations = function () {
    fetch(baseUrl + params.id + '/appreciations', {
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
        setAppreciations(data.totalElements)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getUser()
    getMyConnections()
    getMySupporters()
    getMyProjects()
    getMyAppreciations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, followed])

  return (
    <>
      <NavbarDesktop light="Home" />
      <NavbarMobile light="Home" />
      <FooterDesktop />

      <div className="w-full h-screen text-gray-50 bg-black">
        <div className="w-full h-5/6 relative">
          {loading && (
            <div className="h-full w-full bg-neutral-900 animate-pulse"></div>
          )}
          <P5Iframe p5Code={user.profileCoverSketch} />
          {params.id === userId && (
            <Link to={`/profile/${userId}/cover`}>
              <button className="bg-white py-2 px-4 absolute top-0 left-0 translate-y-12 lg:translate-y-26 translate-x-12 flex items-center text-black font-semibold hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer z-2">
                <RiImageEditFill className="h-full w-5 me-3" />
                Edit cover
              </button>
            </Link>
          )}

          {/* DIV IMMAGINE E NOME */}
          <div className="w-full mx-auto px-12 md:px-20 xl:px-25 absolute bottom-0 flex items-center translate-y-1/2">
            <div className="w-1/3 md:w-1/4 2xl:w-1/6 aspect-square rounded-full overflow-hidden border-6 lg:border-8 border-black">
              {loading && (
                <>
                  <div className="h-full w-full bg-black relative">
                    <div className="h-full w-full absolute top-0 left-0 bg-neutral-900 animate-pulse"></div>
                  </div>
                </>
              )}
              <img
                src={user.profileImage}
                alt="Basic profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-2/3 md:w-3/4 2xl:w-5/6 ps-5 md:ps-10 2xl:ps-20 flex flex-row pb-12 sm:pb-20 xl:pb-25 2xl:pb-35">
              {loading && (
                <div className="h-6 md:h-12 lg:h-15 xl:h-20 w-full bg-neutral-900 animate-pulse"></div>
              )}
              <p className="w-full font-extrabold text-3xl sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl truncate">
                {user.name.toUpperCase()}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full pb-40">
          {/* DIV INFO */}
          <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex md:justify-end pt-30 sm:pt-35 md:pt-10">
            <div className="w-full md:w-3/4 2xl:w-5/6 flex flex-col lg:flex-row md:ps-10 2xl:ps-20 lg:justify-between">
              <div className="flex flex-col">
                {loading && (
                  <div className="h-6 w-50 bg-neutral-900 animate-pulse"></div>
                )}
                <p className="text-base lg:text-lg pb-10">{user.bio}</p>
                <div className="w-full flex items-center">
                  <div
                    className={`pe-5 flex items-center ${user.website ? 'border-e border-gray-50/40' : ''}`}
                  >
                    {loading && (
                      <div className="h-5 w-10 bg-neutral-900 animate-pulse"></div>
                    )}
                    {user.location && (
                      <>
                        <TiLocation className="h-full w-5" />
                        <p className="ps-2 text-sm md:text-base">
                          {user.location}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="ps-5 flex items-center">
                    {loading && (
                      <div className="h-5 w-10 bg-neutral-900 animate-pulse"></div>
                    )}
                    {user.website && (
                      <>
                        <FaLink className="h-full w-5" />
                        <p className="ps-2 text-sm md:text-base">
                          {user.website}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* DIV SUPPORT */}
              <div className="w-full lg:w-1/2 flex items-end justify-end pt-10">
                {params.id !== userId && !followed && (
                  <div
                    className="z-1"
                    onClick={() => {
                      addConnection()
                    }}
                  >
                    <OutlineButton text="SUPPORT" size="md" />
                  </div>
                )}
                {params.id !== userId && followed && (
                  <div
                    className="z-1"
                    onClick={() => {
                      addConnection()
                    }}
                  >
                    <WhiteButton text="SUPPORTED YET" size="md" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  FINE HEADER */}

      {/* INIZIO SEZIONI */}

      <div className="w-full pb-15 bg-black pt-60 md:pt-40 lg:pt-30 xl:pt-20 overflow-x-hidden">
        {/*  BOTTONI SEZIONI */}
        {/* BOX PER LINEA */}
        <div className="border-b-2 border-gray-50/20">
          {/* BOX PER SCROLL */}
          <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* BOX PER BOTTONI */}
            <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex text-gray-50">
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'projects' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('projects')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">
                    {projects}
                  </span>{' '}
                  Projects
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'appreciations' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('appreciations')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">
                    {appreciations}
                  </span>{' '}
                  Appreciations
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'connections' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('connections')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">
                    {connections}
                  </span>{' '}
                  Connections
                </p>
              </div>
              <div
                className={`px-5 py-2 hover:bg-gray-50/40 hover:border-b-2 border-gray-50 ${section === 'supporters' ? 'bg-gray-50/20 border-b-2 ' : 'bg-transparent'} transition-colors duration-150 cursor-pointer`}
                onClick={() => {
                  setSection('supporters')
                }}
              >
                <p className="text-base lg:text-lg font-thin whitespace-nowrap">
                  <span className="text-base lg:text-lg font-bold">
                    {supporters}
                  </span>{' '}
                  Supporters
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEZIONI */}
        {section === 'projects' && (
          <ProfileProjectsSection
            section="projects"
            getMyProjects={getMyProjects}
          />
        )}
        {section === 'appreciations' && (
          <ProfileProjectsSection
            section="appreciations"
            getMyProjects={getMyProjects}
          />
        )}
        {section === 'connections' && (
          <ProfileUsersSection section="connections" />
        )}
        {section === 'supporters' && (
          <ProfileUsersSection section="supporters" />
        )}
      </div>
    </>
  )
}

export default ProfilePage
