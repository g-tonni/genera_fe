import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdModeEdit } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md'

function CommentsPanel({ panel, setCommentsNavbar }) {
  const [comments, setComments] = useState(null)

  const [newComment, setNewComment] = useState({
    content: '',
  })

  const [postOrPatch, setPostOrPatch] = useState(false)
  const [commentId, setCommentId] = useState('')

  const params = useParams()

  const token = useSelector((currState) => {
    return currState.authReducer.token
  })

  const userId = useSelector((currState) => {
    return currState.authReducer.userId
  })

  const url = `http://localhost:3001/projects/${params.id}/comments`

  const getComments = function () {
    fetch(url, {
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
        setComments(data)
        setCommentsNavbar(data.length)
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  const postComments = function () {
    fetch(`${postOrPatch ? url + '/' + commentId : url}`, {
      method: `${postOrPatch ? 'PATCH' : 'POST'}`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => {
        if (res.ok) {
          getComments()
          setCommentId('')
          setNewComment({
            content: '',
          })
          setPostOrPatch(false)
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  const deleteComment = function (commentId) {
    fetch(url + '/' + commentId, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setCommentId('')
          getComments()
        } else {
          throw new Error('Errore nella response')
        }
      })
      .catch((err) => {
        console.log('ERRORE :', err)
      })
  }

  useEffect(() => {
    getComments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  return (
    <div
      className={`w-full sm:w-80 h-full inset-e-0 top-0 pt-22 pb-10 px-5 fixed z-10 bg-neutral-900 transition-all duration-300 flex flex-col text-gray-50/60
                   ${panel === 'comments' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="w-full overflow-y-auto grow">
        {comments &&
          comments.map((comment) => {
            return (
              <div key={comment.commentId}>
                <div className="w-full flex items-start p-2 transition-colors duration-220 cursor-pointer pb-6">
                  <div className="w-7 aspect-square rounded-full overflow-hidden mt-0.5 border border-gray-50/10">
                    <img
                      src={comment.user.profileImage}
                      alt="Profile image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full ps-3">
                    <div className="w-full flex justify-between items-center pb-2">
                      <Link to={`/profile/${comment.user.userId}`}>
                        <p className="text-sm font-semibold">
                          <span className="hover:text-gray-50">
                            {comment.user.username}
                          </span>
                          <span
                            className={`ps-2 font-thin text-xs ${comment.updated ? 'opacity-100' : 'opacity-0'}`}
                          >
                            Modified
                          </span>
                        </p>
                      </Link>
                      <div className="flex items-center">
                        <div
                          onClick={() => {
                            setPostOrPatch(true)
                            setNewComment({
                              content: comment.content,
                            })
                            setCommentId(comment.commentId)
                          }}
                        >
                          <MdModeEdit
                            className={`h-full w-4 ${comment.user.userId === userId ? 'flex' : 'hidden'} hover:text-gray-50 transition-colors duration-150 cursor-pointer`}
                          />
                        </div>
                        <div
                          onClick={() => {
                            deleteComment(comment.commentId)
                          }}
                        >
                          <MdDeleteForever
                            className={`h-full w-4 ${comment.user.userId === userId ? 'flex' : 'hidden'} hover:text-gray-50 transition-colors duration-150 cursor-pointer ms-2`}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-thin text-gray-50">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            postComments()
          }}
        >
          <input
            type="search"
            placeholder="Write your comment..."
            className="w-full text-gray-50 py-1 focus:outline-none border-b border-gray-50/30 text-sm"
            value={newComment.content}
            onChange={(e) => {
              setNewComment({
                content: e.target.value,
              })
            }}
          />
          <button
            type="submit"
            className={`bg-white border-3 border-white text-black font-semibold shadow-2xl hover:bg-black hover:text-gray-50 transition-colors duration-150 cursor-pointer text-sm px-5 py-1 mt-5`}
          >
            POST
          </button>
        </form>
      </div>
    </div>
  )
}

export default CommentsPanel
