import P5Editor from './P5Editor'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import WhiteButton from './WhiteButton'
import P5IframeEditor from './P5IframeEditor'
import NavbarEditProfileCover from './NavbarEditProfileCover'

function EditProfileCoverPage() {
  const [code, setCode] = useState(null)

  const [page, setPage] = useState('canva')

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const params = useParams()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const baseUrl = 'http://localhost:3001/users/'

  const getCoverSketch = function () {
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
        setCode({
          code: data.profileCoverSketch,
        })
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERRORE: ', err)
      })
  }

  const updateCode = function () {
    fetch(baseUrl + 'me/profileCover', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(code),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/profile/${params.id}`)
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  useEffect(() => {
    getCoverSketch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NavbarEditProfileCover setPage={setPage} />

      <div className="w-full h-screen bg-black">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-1/3 aspect-square bg-neutral-900 animate-pulse"></div>
          </div>
        )}
        {page === 'canva' && (
          <div className="w-full h-full flex justify-center items-center">
            <P5IframeEditor p5Code={code?.code} />
          </div>
        )}
        {page === 'code' && (
          <div className="w-full h-full relative">
            <P5Editor code={code?.code} setCode={setCode} />
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
  )
}

export default EditProfileCoverPage
