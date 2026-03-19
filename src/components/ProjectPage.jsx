import NavbarEditor from './NavbarEditor'
import ProjectInfo from './ProjectInfo'
import P5Editor from './P5Editor'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import WhiteButton from './WhiteButton'
import P5IframeEditor from './P5IframeEditor'

function ProjectPage() {
  const [code, setCode] = useState(null)

  const [project, setProject] = useState(null)

  const [page, setPage] = useState('canva')

  const params = useParams()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const baseUrl = 'http://localhost:3001/projects/'

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
        console.log(data)
        setProject(data)
        setCode({
          code: data.script,
        })
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
              <div className="w-full h-full flex justify-center items-center">
                <P5IframeEditor p5Code={code.code} />
              </div>
            )}
            {page === 'code' && (
              <div className="w-full h-full relative">
                <P5Editor code={code.code} setCode={setCode} />
                <div
                  className="fixed bottom-0 right-0 -translate-x-10 -translate-y-10"
                  onClick={() => {
                    updateCode()
                  }}
                >
                  <WhiteButton text="SAVE" size="md" />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default ProjectPage
