import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'

const P5Editor = ({ code, setCode }) => {
  const editor = useRef(null)
  const view = useRef(null)

  useEffect(() => {
    if (!editor.current) return

    view.current = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        javascript(),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newCode = update.state.doc.toString()
            setCode(newCode)
          }
        }),
      ],
      parent: editor.current,
    })

    return () => view.current.destroy()
  }, [])

  return (
    <div
      ref={editor}
      style={{
        height: '400px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    />
  )
}

export default P5Editor
