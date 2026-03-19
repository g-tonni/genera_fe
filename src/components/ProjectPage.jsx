import NavbarEditor from './NavbarEditor'
import ProjectInfo from './ProjectInfo'
import P5Editor from './P5Editor'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function ProjectPage() {
  const [code, setCode] = useState('')

  const [project, setProject] = useState(null)

  const [page, setPage] = useState('canva')

  const params = useParams()

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
        setProject(data)
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
      {project && (
        <>
          <NavbarEditor project={project} setPage={setPage} />

          <div className="w-full h-screen bg-black">
            {page === 'info' && <ProjectInfo project={project} />}
            {page === 'canva' && (
              <p className="text-3xl pt-50 text-green-600">ciaoo</p>
            )}
            {page === 'code' && <P5Editor code="" setCode={setCode} />}
          </div>
        </>
      )}
    </>
  )
}

export default ProjectPage
