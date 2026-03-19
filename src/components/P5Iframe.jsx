import { useRef, useEffect } from 'react'

const P5Iframe = ({ p5Code }) => {
  const iframeRef = useRef(null)

  const srcDoc = `
      <!DOCTYPE html>
      <html>
      <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
      <style>
      html, body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      canvas {
        display: block;
      }
      </style>
      </head>
      <body>
      <script>
      ${p5Code || ''}
      </script>
      </body>
      </html>
      `

  useEffect(() => {}, [p5Code])

  return (
    <iframe
      key={p5Code}
      ref={iframeRef}
      srcDoc={srcDoc}
      className="w-full h-full"
      sandbox="allow-scripts"
    />
  )
}

export default P5Iframe
