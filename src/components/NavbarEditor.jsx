import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { VscAccount } from 'react-icons/vsc'
import { TbCodeCircle } from 'react-icons/tb'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { FiPlusCircle } from 'react-icons/fi'
import { FaMinusCircle } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { BiComment } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import DesktopProfilePanel from './DesktopProfilePanel'
import CommentsPanel from './CommentsPanel'
import MobileProfilePanel from './MobileProfilePanel'

function NavbarEditor({ project, setPage }) {
  const [panel, setPanel] = useState('canva')

  const params = useParams()

  const [followed, setFollowed] = useState(null)

  const [loading, setLoading] = useState(true)

  const [appreciations, setAppreciations] = useState(null)
  const [appreciated, setAppreciated] = useState(false)

  const [commentsNavbar, setCommentsNavbar] = useState(0)

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const appreciationsUrl = `${API_URL}/projects/${params.id}/appreciations`
  const connectionsBaseUrl = `${API_URL}/users/`

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
        setLoading(false)
        setAppreciations(data)
        const isAppreciated = data.some((app) => app.user.userId === userId)

        setAppreciated(isAppreciated)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE :', err)
      })
  }

  const addOrRemoveAppreciation = function () {
    fetch(appreciationsUrl, {
      method: appreciated ? 'DELETE' : 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          getAppreciations()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  const addOrRemoveConnection = function () {
    fetch(connectionsBaseUrl + project.author.userId + '/connections', {
      method: followed ? 'DELETE' : 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setFollowed(!followed)
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const getMyConnections = function () {
    fetch(connectionsBaseUrl + 'me/connections', {
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
        // console.log('CONNECTIONS 2', data)
        setLoading(false)
        const isFollowed = data.some(
          (user) => user.userId === project.author.userId,
        )
        // console.log('IS FOLLOWED', isFollowed)
        setFollowed(isFollowed)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getAppreciations()
    getMyConnections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, followed])

  return (
    <>
      <DesktopProfilePanel panel={panel} log={token} />
      <CommentsPanel panel={panel} setCommentsNavbar={setCommentsNavbar} />
      <MobileProfilePanel panel={panel} log={token} />

      <div className="fixed z-10 w-full h-16 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black flex justify-between items-center ">
        <div className="flex items-center w-full lg:w-1/3">
          <div className="h-full w-5">
            <Link to={'/'}>
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1773138526/logo_kjqc47.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex text-gray-50/60 items-center">
            <p className="ps-4 font-semibold lg:text-lg text-gray-50/80">
              {project.title}{' '}
              <Link to={`/profile/${project.author.userId}`}>
                <span className="font-thin text-xs lg:text-sm text-gray-50/60 hover:text-gray-50/80 hidden sm:inline-block">
                  by {project.author.username}
                </span>
              </Link>
            </p>
            {project.author.userId !== userId && (
              <div className="ms-3">
                {params.id !== userId && !followed && (
                  <div
                    onClick={() => {
                      addOrRemoveConnection()
                    }}
                  >
                    <FiPlusCircle className="mt-1 h-full w-4 flex text-gray-50/60 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
                  </div>
                )}
                {params.id !== userId && followed && (
                  <div
                    onClick={() => {
                      addOrRemoveConnection()
                    }}
                  >
                    <FaMinusCircle className="mt-0.5 h-full w-4 flex text-gray-50/60 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex justify-center text-gray-50/60">
          <div
            className="pe-2 lg:pe-4"
            onClick={() => {
              setPage('info')
              if (panel === 'info') {
                setPanel('')
              } else {
                setPanel('info')
              }
            }}
          >
            <HiOutlineInformationCircle
              className={`h-full w-4 lg:w-6 flex ${panel === 'info' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
          <div
            className="pe-2 lg:pe-4"
            onClick={() => {
              setPage('canva')
              if (panel === 'canva') {
                setPanel('')
              } else {
                setPanel('canva')
              }
            }}
          >
            <FaPlay
              className={`h-full w-4 lg:w-6 flex ${panel === 'canva' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
          <div
            onClick={() => {
              setPage('code')
              if (panel === 'code') {
                setPanel('')
              } else {
                setPanel('code')
              }
            }}
          >
            <TbCodeCircle
              className={`h-full w-4 lg:w-6 flex ${panel === 'code' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex justify-end items-center text-gray-50/60">
          <div className="flex items-center">
            {loading && <div className="h-4 w-4 bg-neutral-900 me-2" />}
            <p className="text-base font-semibold pe-1 lg:pe-2">
              {appreciations?.length}
            </p>
            {appreciated ? (
              <div
                onClick={() => {
                  addOrRemoveAppreciation()
                }}
              >
                <FaHeart className="h-full w-4 lg:w-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
              </div>
            ) : (
              <div
                onClick={() => {
                  addOrRemoveAppreciation()
                }}
              >
                <FaRegHeart className="h-full w-4 lg:w-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
              </div>
            )}
          </div>
          <div className="flex items-center ps-4">
            {loading ? (
              <div className="h-4 w-4 bg-neutral-900 me-2" />
            ) : (
              <p className="text-base font-semibold pe-1 lg:pe-2">
                {commentsNavbar}
              </p>
            )}
            <div
              onClick={() => {
                if (panel === 'comments') {
                  setPanel('')
                } else {
                  setPanel('comments')
                }
              }}
            >
              <BiComment className="h-full w-4 lg:w-5 hover:text-gray-50 transition-colors duration-150 cursor-pointer" />
            </div>
          </div>
          <div
            className={`${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer h-full w-5 xl:w-1/20 flex justify-end ms-4`}
            onClick={() => {
              if (panel === 'profile') {
                setPanel('')
              } else {
                setPanel('profile')
              }
            }}
          >
            <VscAccount
              className={`h-full w-6 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'}`}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarEditor
