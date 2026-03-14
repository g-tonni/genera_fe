import { IoSearch } from 'react-icons/io5'
import UserCard from './UserCard'

function ProfileUsersSection() {
  return (
    <div className="w-full mx-auto px-12 md:px-20 xl:px-25 flex flex-col items-end text-gray-50">
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
          />
        </div>
      </div>

      {/* SEZIONE CARD */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  )
}

export default ProfileUsersSection
