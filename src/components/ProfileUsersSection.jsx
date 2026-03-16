import { IoSearch } from 'react-icons/io5'
import UserCard from './UserCard'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProfileUsersSection({section}) {

  const [users, setUsers] = useState(null)

  const [partialName, setPartialName] = useState("")

  const params = useParams()

   const baseUrl = 'http://localhost:3001/users/' + params.id + '/' + section

   const token = localStorage.getItem("token");

   const getUsers = function(){
    fetch(baseUrl + "?partialName=" + partialName, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nella response");
        }
    })
    .then((data) => {
        console.log(data);
        setUsers(data)
      })
      .catch((err) => {
        console.log("ERRORE: ", err);
      });
   }


   useEffect(() => {
    getUsers()
   }, [section, partialName, params.id])


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
       {
        users && (
          users.content.map((user) => {
            return(

              <UserCard user={user}/>
            )
          })
        )
       }
      </div>
    </div>
  )
}

export default ProfileUsersSection
