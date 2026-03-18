import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function EditProjectInfoPage() {
  const [project, setProject] = useState(null)

  const [editProject, setEditProject] = useState({
    title: '',
    description: '',
    howToInteract: '',
    category: '',
  })

  const params = useParams()

  const navigate = useNavigate()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const baseUrl = 'http://localhost:3001/projects/'

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
        console.log(data)
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
        console.log('ERRORE :', err)
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
      .then((res) => {
        if (res.ok) {
          navigate(`/projects/${project.projectId}`)
        } else {
          throw new Error('Errore nella response')
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
    <div className="w-full min-h-screen bg-black text-gray-50 px-10 md:px-30 xl:px-50 2xl:px-80 py-30 lg:py-0 flex justify-center items-center">
      <div className="w-full">
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-between items-start">
            <div className="w-full aspect-square overflow-hidden">
              <img
                src={project?.cover}
                alt="Project cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 aspect-square lg:ps-10 pt-15 lg:pt-0 flex flex-col justify-between items-end">
            <div className="w-full h-full flex flex-col justify-between items-end">
              <form
                id="editForm"
                onSubmit={(e) => {
                  e.preventDefault()
                  editProjectInfo()
                }}
              >
                <label className="font-semibold">Title</label>
                <input
                  type="text"
                  placeholder="New title..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                  value={editProject.title}
                  onChange={(e) => {
                    setEditProject({
                      ...editProject,
                      title: e.target.value,
                    })
                  }}
                />
                <label className="font-semibold">Description</label>
                <input
                  type="text"
                  placeholder="New description..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                  value={editProject.description}
                  onChange={(e) => {
                    setEditProject({
                      ...editProject,
                      description: e.target.value,
                    })
                  }}
                />
                <label className="font-semibold">How to interact</label>
                <input
                  type="text"
                  placeholder="New how to interact..."
                  className="w-full text-gray-50 focus:outline-none border-b border-gray-50/30 pt-3 mb-10"
                  value={editProject.howToInteract}
                  onChange={(e) => {
                    setEditProject({
                      ...editProject,
                      howToInteract: e.target.value,
                    })
                  }}
                />
                <label className="font-semibold block">Category</label>
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
  )
}

export default EditProjectInfoPage
