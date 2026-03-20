import { useRef, useEffect, useState } from 'react'

const P5Iframe = ({ p5Code }) => {
  const iframeRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

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
    <div className="w-full h-full bg-black overflow-hidden">
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-neutral-900 animate-pulse"></div>
      )}

      <iframe
        key={p5Code}
        ref={iframeRef}
        srcDoc={srcDoc}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        sandbox="allow-scripts"
      />
    </div>
  )
}

export default P5Iframe
