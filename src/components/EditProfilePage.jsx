import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import OutlineButton from './OutlineButton'

function EditProfilePage() {
  const params = useParams()

  const baseUrl = 'http://localhost:3001/users/'

  const [loading, setLoading] = useState(true)

  const [editBody, setEditBody] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    email: '',
    password: '',
  })

  const [profileImage, setProfileImage] = useState('')

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const navigate = useNavigate()

  const [errors, setErrors] = useState(null)

  const getErrors = function (errorsList, keyword) {
    return errorsList.filter((error) => {
      return error.toLowerCase().includes(keyword.toLowerCase())
    })
  }

  const normalizeErrors = (data) => {
    if (data.errorsList && Array.isArray(data.errorsList)) {
      return data.errorsList
    }

    if (data.error) {
      return [data.error]
    }

    return ['An unexpected error occurred.']
  }

  const [file, setFile] = useState(null)
  const [imageModal, setImageModal] = useState(false)
  const [preview, setPreview] = useState(null)

  const fileInputRef = useRef()

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return
    setFile(e.target.files[0])
    setImageModal(true)
    setPreview(URL.createObjectURL(selectedFile))
  }

  const uploadImage = function () {
    if (!file) return

    const formData = new FormData()
    formData.append('profile_image', file)

    fetch(baseUrl + 'me/profileImage', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setFile(null)
          setImageModal(false)
          setPreview(null)
          getUser()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  const cancelUploadImage = function () {
    setFile(null)
    setImageModal(false)
    setPreview(null)
  }

  const editUser = function (body) {
    fetch(baseUrl + 'me/edit', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const data = await res.json()

        if (res.ok) {
          navigate(`/profile/${userId}`)
        } else {
          const errorOrErrors = normalizeErrors(data)
          setErrors(errorOrErrors)
          throw data
        }
      })
      .catch((err) => {
        console.log('ERRORE: ', err)
      })
  }

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
        // console.log('USER', data)
        setLoading(false)
        setEditBody({
          ...editBody,
          bio: data.bio,
          name: data.username,
          email: data.email,
          location: data.location,
          website: data.website,
        })
        setProfileImage(data.profileImage)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE: ', err)
      })
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="w-full min-h-screen bg-black text-gray-50 px-10 md:px-30 xl:px-60 2xl:px-100 py-30 flex justify-center items-center relative">
        <div className="w-full">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/3 h-full flex flex-col justify-between items-start">
              {loading ? (
                <div className="w-full aspect-square rounded-full bg-neutral-900 animate-pulse"></div>
              ) : (
                <div
                  className="w-full aspect-square rounded-full overflow-hidden relative"
                  onClick={handleClick}
                >
                  <img
                    src={profileImage}
                    alt="Basic profile"
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <div className="w-full h-full absolute top-0 left-0 hover:bg-black/60 z-1 transition-colors duration-220 cursor-pointer"></div>
                </div>
              )}
            </div>
            <div className="w-full lg:w-2/3 lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between items-end">
              <div className="w-full">
                <form
                  id="editForm"
                  onSubmit={(e) => {
                    e.preventDefault()
                    editUser(editBody)
                  }}
                  noValidate
                >
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    placeholder="New name..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editBody.name}
                    onChange={(e) => {
                      setEditBody({
                        ...editBody,
                        name: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'name').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'name').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">Bio</label>
                  <input
                    type="text"
                    placeholder="New bio..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editBody.bio}
                    onChange={(e) => {
                      setEditBody({
                        ...editBody,
                        bio: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'bio').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'bio').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">Location</label>
                  <input
                    type="text"
                    placeholder="New location..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editBody.location}
                    onChange={(e) => {
                      setEditBody({
                        ...editBody,
                        location: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'location').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'location').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">Website</label>
                  <input
                    type="text"
                    placeholder="New website..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editBody.website}
                    onChange={(e) => {
                      setEditBody({
                        ...editBody,
                        website: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'website').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'website').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">Email</label>
                  <input
                    type="email"
                    placeholder="New email..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editBody.email}
                    onChange={(e) => {
                      setEditBody({
                        ...editBody,
                        email: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'email').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'email').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">Password</label>
                  <input
                    type="password"
                    placeholder="New password..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editBody.password}
                    onChange={(e) => {
                      setEditBody({
                        ...editBody,
                        password: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'password').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'password').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between pt-15">
            <button className="font-semibold text-red-700 border-3 border-red-700 hover:bg-red-700 hover:text-black transition-colors duration-150 cursor-pointer py-2 px-6">
              DELETE PROFILE
            </button>
            <button
              type="submit"
              form="editForm"
              className="px-6 bg-white border-3 border-white text-black font-bold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer py-2"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>

      {imageModal && (
        <div className="w-full h-screen bg-black/70 absolute top-0 flex justify-center items-center z-2">
          <div className="w-full mx-12 md:mx-0 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-1/3 bg-black flex flex-col justify-between items-center p-10  border border-gray-50/10">
            <div className="w-full lg:w-1/2 aspect-square rounded-full overflow-hidden mb-15">
              <img
                src={preview}
                alt="Image upload"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full flex justify-between">
              <button
                className="font-semibold text-red-700 border-3 border-red-700 hover:bg-red-700 hover:text-black transition-colors duration-150 cursor-pointer py-2 px-6"
                onClick={() => {
                  cancelUploadImage()
                }}
              >
                CANCEL
              </button>
              <div
                onClick={() => {
                  uploadImage()
                }}
              >
                <OutlineButton text="SAVE" size="md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditProfilePage
