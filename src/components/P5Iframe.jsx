import { useRef, useEffect } from 'react'

const P5Iframe = ({ p5Code }) => {
  const iframeRef = useRef(null)

  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>P5 Sketch</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
      <style>
        body, html { margin: 0; padding: 0; overflow: hidden; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <script>
        try {
          ${p5Code}
        } catch(e) {
          document.body.innerHTML = '<pre style="color:red;">' + e + '</pre>';
        }
      </script>
    </body>
    </html>
  `

  useEffect(() => {}, [p5Code])

  return (
    <iframe
      ref={iframeRef}
      srcDoc={srcDoc}
      className="w-full h-full"
      sandbox="allow-scripts"
    />
  )
}

export default P5Iframe
