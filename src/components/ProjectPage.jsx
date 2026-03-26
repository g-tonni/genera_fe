import NavbarEditor from './NavbarEditor'
import ProjectInfo from './ProjectInfo'
import P5Editor from './P5Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import WhiteButton from './WhiteButton'
import P5IframeEditor from './P5IframeEditor'
import NavbarEditorSkeleton from './NavbarEditorSkeleton'

function ProjectPage() {
  const [code, setCode] = useState(null)

  const [project, setProject] = useState(null)

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState('canva')
  const [refreshKey, setRefreshKey] = useState(0)

  const params = useParams()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const API_URL = import.meta.env.VITE_API_BASE_URL

  const baseUrl = `${API_URL}/projects/`

  const updateCode = function () {
    fetch(baseUrl + params.id + '/sketch', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(code),
    })
      .then((res) => {
        if (res.ok) {
          getProject()
          setPage('canva')
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
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
        setProject(data)
        setCode({
          code: data.script,
        })
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE :', err)
        navigate('/404')
      })
  }

  useEffect(() => {
    getProject()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <>
      {loading && (
        <div className="h-screen max-h-screen w-full bg-black flex flex-col">
          <NavbarEditorSkeleton />
          <div className="w-full grow flex justify-center items-center">
            <div className="w-1/3 aspect-square bg-neutral-900 animate-pulse"></div>
          </div>
        </div>
      )}
      {project && (
        <>
          <NavbarEditor project={project} setPage={setPage} setRefreshKey={setRefreshKey} />

          <div className="w-full h-screen bg-black">
            {page === 'info' && <ProjectInfo project={project} />}
            {page === 'canva' && (
              <div className="w-full h-full flex justify-center items-center">
                <P5IframeEditor p5Code={code.code} refreshKey={refreshKey} />
              </div>
            )}
            {page === 'code' && (
              <div className="w-full h-full relative">
                <P5Editor code={code.code} setCode={setCode} />
                {project.author.userId === userId && (
                  <div
                    className="fixed bottom-0 right-0 -translate-x-10 -translate-y-10"
                    onClick={() => {
                      updateCode()
                    }}
                  >
                    <WhiteButton text="SAVE" size="md" />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ProjectPage
