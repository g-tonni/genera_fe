import { IoSearch } from 'react-icons/io5'
import UserCard from './UserCard'
import UserCardSkeleton from './UserCardSkeleton'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IoArrowBackOutline } from 'react-icons/io5'
import { IoArrowForward } from 'react-icons/io5'

function ProfileUsersSection({ section }) {
  const [users, setUsers] = useState(null)

  const [partialName, setPartialName] = useState('')

  const [loading, setLoading] = useState(true)
  const numberSkeleton = Array.from({ length: 10 })

  const params = useParams()

  const [page, setPage] = useState(0)

  const baseUrl = 'http://localhost:3001/users/' + params.id + '/' + section

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })
  const getUsers = function () {
    fetch(baseUrl + '?partialName=' + partialName + '&size=15&page=' + page, {
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
        // console.log('USERS', data)
        setLoading(false)
        setUsers(data)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, partialName, params.id, page])

  return (
    <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col items-end text-gray-50 min-h-screen">
      {/*  BARRA RICERCA */}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex py-15">
        <div className="relative w-full h-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <IoSearch />
          </span>

          <input
            type="search"
            placeholder="Search users..."
            className="w-full bg-neutral-900 text-gray-50 ps-10 pe-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            value={partialName}
            onChange={(e) => {
              setPartialName(e.target.value)
            }}
          />
        </div>
      </div>

      {/* SEZIONE CARD */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        {loading &&
          numberSkeleton.map((_, i) => {
            return <UserCardSkeleton key={i} />
          })}
        {users &&
          section === 'connections' &&
          users.content.map((user) => {
            return <UserCard user={user.followed} key={user.followed.userId} />
          })}
        {users &&
          section === 'supporters' &&
          users.content.map((user) => {
            return <UserCard user={user.follower} key={user.follower.userId} />
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
              {users?.totalPages}
            </p>
          </div>
          <div className="w-6 h-6 ms-6">
            <div
              className={`${page === users?.totalPages - 1 ? 'hidden' : 'flex'}`}
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

export default ProfileUsersSection
