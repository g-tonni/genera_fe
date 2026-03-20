import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserCard({ user }) {
  const navigate = useNavigate()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const [supporters, setSupporters] = useState(null)
  const [projects, setProjects] = useState(null)

  const baseUrl = `http://localhost:3001/users/${user.userId}`

  const getUserSupporters = function () {
    fetch(baseUrl + '/supporters', {
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
        console.log('SUPPORTERS', data)
        setSupporters(data.content.length)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  const getUserProjects = function () {
    fetch(baseUrl + '/projects', {
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
        setProjects(data.content.length)
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getUserProjects()
    getUserSupporters()
  })

  return (
    <div
      className="w-full flex items-center hover:bg-gray-50/20 p-2 transition-colors duration-220 cursor-pointer"
      onClick={() => {
        navigate(`/profile/${user.userId}`)
      }}
    >
      <div className="w-1/4 aspect-square rounded-full overflow-hidden">
        <img
          src="https://res.cloudinary.com/cloudgiada/image/upload/v1772903135/ggfstlipbuzzh1hu1nmw.png"
          alt="Image profile"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col ps-6">
        <p className="text-lg font-semibold">{user.username}</p>
        <p className="font-thin text-sm whitespace-nowrap">
          <span className="font-medium">{projects}</span> projects,{' '}
          <span className="font-medium">{supporters}</span> supporters
        </p>
      </div>
    </div>
  )
}

export default UserCard
