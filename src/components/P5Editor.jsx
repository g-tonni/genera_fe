import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'

const blackTheme = EditorView.theme({
  '.cm-editor': {
    backgroundColor: '#000',
  },
  '.cm-scroller': {
    backgroundColor: '#000',
  },
  '.cm-gutters': {
    backgroundColor: '#000',
  },
})

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
        vscodeDark,
        blackTheme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newCode = update.state.doc.toString()
            setCode({
              code: newCode,
            })
          }
        }),
      ],
      parent: editor.current,
    })

    return () => view.current.destroy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={editor} className="bg-black w-full min-h-full py-16 text-white" />
  )
}

export default P5Editor
