import { VscAccount } from 'react-icons/vsc'
import { IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DesktopProfilePanel from './DesktopProfilePanel'
import { useSelector } from 'react-redux'

function NavbarDesktop({ light }) {
  const [panel, setPanel] = useState('')

  const [partialSearch, setPartialSearch] = useState('')

  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const baseUrl = 'http://localhost:3001/'

  const getUsers = function () {
    fetch(baseUrl + 'users?partialName=' + partialSearch, {
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
        console.log('USERS', data)
        setUsers(data.content)
      })
      .catch((err) => {
        console.log('ERROR', err)
      })
  }

  const getProjects = function () {
    fetch(baseUrl + 'projects?partialTitle=' + partialSearch, {
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
        console.log('PROJECTS', data)
        setProjects(data.content)
      })
      .catch((err) => {
        console.log('ERROR', err)
      })
  }

  useEffect(() => {
    if (partialSearch.length >= 3) {
      getUsers()
      getProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partialSearch])

  return (
    <>
      <DesktopProfilePanel panel={panel} log={token} />

      <div className="fixed z-10 w-full h-16 mx-auto px-12 md:px-20 xl:px-25 py-6 bg-black hidden lg:flex justify-between items-center ">
        <div className="flex items-center w-1/3">
          <div className="h-full w-5">
            <Link to={'/'}>
              <img
                src="https://res.cloudinary.com/cloudgiada/image/upload/v1773138526/logo_kjqc47.png"
                alt="logo"
              />
            </Link>
          </div>
          <Link to={'/'}>
            <p
              className={`${light === 'Home' ? 'text-gray-50' : 'text-gray-50/60'} text-sm xl:text-base ps-5 xl:ps-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            >
              Home
            </p>
          </Link>
          <Link to={'/discover'}>
            <p
              className={`${light === 'Discover' ? 'text-gray-50' : 'text-gray-50/60'} text-sm xl:text-base ps-5 xl:ps-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            >
              Discover
            </p>
          </Link>
          <Link to={'/about'}>
            <p
              className={`${light === 'About' ? 'text-gray-50' : 'text-gray-50/60'} text-sm xl:text-base ps-5 xl:ps-8 hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
            >
              About
            </p>
          </Link>
        </div>

        <div className="w-1/3 flex justify-center">
          <div className="relative w-full 2xl:w-2/3 max-w-md h-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              <IoSearch />
            </span>

            <input
              type="search"
              placeholder="Search projects, users..."
              className="w-full bg-neutral-900 text-gray-50 ps-10 pe-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={partialSearch}
              onChange={(e) => {
                setPartialSearch(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="w-1/3 flex justify-end">
          <div
            className={`${light === 'Profile' ? 'text-gray-50' : 'text-gray-50/60'} hover:text-gray-50 transition-colors duration-150 cursor-pointer h-full w-1/10 xl:w-1/20 flex justify-end`}
            onClick={() => {
              if (panel === 'profile') {
                setPanel('')
              } else {
                setPanel('profile')
              }
            }}
          >
            <VscAccount
              className={`h-full w-6 flex ${panel === 'profile' ? 'text-gray-50' : 'text-gray-50/60'} `}
            />
          </div>
        </div>
      </div>

      {partialSearch.length >= 3 && (
        <div className="w-1/3 z-2 fixed left-1/2 -translate-x-1/2 translate-y-20 lg:px-6 xl:px-8 text-gray-50/50 text-sm hidden lg:flex justify-center">
          <div className="w-full 2xl:w-2/3 bg-neutral-900 p-5">
            <div className="w-full pb-6">
              <p className="font-semibold pb-3">
                Projects (<span>{projects.length}</span>)
              </p>
              {projects.length === 0 ? (
                <div className="w-full border text-center py-3">
                  No projects found for your search
                </div>
              ) : (
                projects.map((projects) => {
                  return (
                    <Link
                      key={projects.projectId}
                      to={`/projects/${projects.projectId}`}
                    >
                      <div className="w-full flex items-center hover:bg-gray-50/20 text-gray-50 p-2 transition-colors duration-220 cursor-pointer">
                        <div className="w-6 aspect-square overflow-hidden">
                          <img
                            src={projects.cover}
                            alt="Cover project"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <p className="ps-3 text-gray-50/80 font-semibold">
                          {projects.title}{' '}
                          <span className="font-thin text-xs">
                            by{' '}
                            <span className="italic">
                              {projects.author.username}
                            </span>
                          </span>
                        </p>
                      </div>
                    </Link>
                  )
                })
              )}
            </div>
            <p className="font-semibold pb-3">
              Users (<span>{users.length}</span>)
            </p>
            {users.length === 0 ? (
              <div className="w-full border text-center py-3">
                No users found for your search
              </div>
            ) : (
              users.map((user) => {
                return (
                  <Link key={user.userId} to={`/profile/${user.userId}`}>
                    <div className="w-full flex items-center hover:bg-gray-50/20 text-gray-50 p-2 transition-colors duration-220 cursor-pointer">
                      <div className="w-6 aspect-square rounded-full overflow-hidden">
                        <img
                          src={user.profileImage}
                          alt="Profile image"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <p className="ps-3 text-gray-50/80">{user.username}</p>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default NavbarDesktop
