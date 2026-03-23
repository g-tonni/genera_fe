import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import OutlineButton from './OutlineButton'

function EditProjectInfoPage() {
  const [project, setProject] = useState(null)

  const [loading, setLoading] = useState(true)

  const [editProject, setEditProject] = useState({
    title: '',
    description: '',
    howToInteract: '',
    category: '',
  })

  const params = useParams()

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

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const baseUrl = 'http://localhost:3001/projects/'

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
    formData.append('cover', file)

    fetch(baseUrl + `${params.id}/cover`, {
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
          getProject()
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

  const getProject = function () {
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
        setLoading(false)
        setEditProject({
          ...editProject,
          title: data.title,
          description: data.description ? data.description : '',
          howToInteract: data.howToInteract ? data.howToInteract : '',
          category: data.category.category,
        })
        setProject(data)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE :', err)
        navigate('/404')
      })
  }

  const editProjectInfo = function () {
    fetch(baseUrl + params.id + '/editInfo', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editProject),
    })
      .then(async (res) => {
        const data = await res.json()

        if (res.ok) {
          navigate(`/projects/${project.projectId}`)
        } else {
          const errorOrErrors = normalizeErrors(data)
          setErrors(errorOrErrors)
          throw data
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <>
      <div className="w-full min-h-screen bg-black text-gray-50 px-10 md:px-30 xl:px-50 2xl:px-80 py-30 flex justify-center items-center">
        <div className="w-full">
          <div className="w-full flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-between items-start">
              {loading ? (
                <div className="w-full aspect-square bg-neutral-900 animate-pulse"></div>
              ) : (
                <div
                  className="w-full aspect-square overflow-hidden relative"
                  onClick={handleClick}
                >
                  <img
                    src={project?.cover}
                    alt="Project cover"
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
            <div className="w-full lg:w-1/2 aspect-square lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between items-end">
              <div className="w-full h-full flex flex-col justify-between items-end">
                <form
                  className="w-full"
                  id="editForm"
                  onSubmit={(e) => {
                    e.preventDefault()
                    editProjectInfo()
                  }}
                  noValidate
                >
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    placeholder="New title..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editProject.title}
                    onChange={(e) => {
                      setEditProject({
                        ...editProject,
                        title: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'title').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'title').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="New description..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editProject.description}
                    onChange={(e) => {
                      setEditProject({
                        ...editProject,
                        description: e.target.value,
                      })
                    }}
                  />
                  {errors && getErrors(errors, 'description').length > 0 && (
                    <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                      {getErrors(errors, 'description').map((error) => {
                        return <p>{error}</p>
                      })}
                    </div>
                  )}
                  <label className="block font-semibold mt-10">
                    How to interact
                  </label>
                  <input
                    type="text"
                    placeholder="New how to interact..."
                    className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3"
                    value={editProject.howToInteract}
                    onChange={(e) => {
                      setEditProject({
                        ...editProject,
                        howToInteract: e.target.value,
                      })
                    }}
                  />
                  {errors &&
                    getErrors(errors, 'how to interact').length > 0 && (
                      <div className="border border-red-600/40 bg-red-600/5 p-3 mt-3 text-red-600/80 text-xs">
                        {getErrors(errors, 'how to interact').map((error) => {
                          return <p>{error}</p>
                        })}
                      </div>
                    )}
                  <label className="font-semibold block mt-10">Category</label>
                  <select
                    name="category"
                    className="w-full p-2 mt-3 focus:outline-none border border-gray-50/30"
                    onChange={(e) => {
                      setEditProject({
                        ...editProject,
                        category: e.target.value,
                      })
                    }}
                  >
                    <option value="Generative">Generative</option>
                    <option value="Interactive">Interactive</option>
                    <option value="Spatial">Spatial</option>
                    <option value="Patterns">Patterns</option>
                    <option value="Particles">Particles</option>
                  </select>
                </form>
                <button
                  type="submit"
                  form="editForm"
                  className="mt-10 px-6 bg-white border-3 border-white text-black font-bold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer py-2"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageModal && (
        <div className="w-full h-screen bg-black/70 absolute top-0 flex justify-center items-center z-2">
          <div className="w-full mx-12 md:mx-0 md:w-3/4 lg:w-2/3 xl:w-3/5 2xl:w-1/3 bg-black flex flex-col justify-between items-center p-10  border border-gray-50/10">
            <div className="w-full lg:w-1/2 aspect-square overflow-hidden mb-15">
              <img
                src={preview}
                alt="Cover upload"
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

export default EditProjectInfoPage
