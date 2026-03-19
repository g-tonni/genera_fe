import { useRef, useEffect, useState } from 'react'
import { CgTerminal } from 'react-icons/cg'

const P5IframeEditor = ({ p5Code }) => {
  const iframeRef = useRef(null)
  const [errors, setErrors] = useState([])

  const [terminal, setTerminal] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrors([])
  }, [p5Code])

  useEffect(() => {
    // Gestisce i messaggi in arrivo dall'iframe
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'P5_ERROR') {
        setErrors((prevErrors) => [...prevErrors, event.data.payload])
      }
    }

    window.addEventListener('message', handleMessage)

    // Rimuove listener quando il componente si smonta
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

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
      <script>
        // Cattura gli errori di sintassi e di runtime
        window.onerror = function(message, source, lineno, colno, error) {
          window.parent.postMessage({ 
            type: 'P5_ERROR', 
            payload: message + ' (Linea: ' + (lineno - 40) + ')'
          }, '*');
          return false;
        };

        // Cattura gli errori logici che p5.js invia alla console
        const originalConsoleError = console.error;
        console.error = function(...args) {
          window.parent.postMessage({ 
            type: 'P5_ERROR', 
            payload: args.join(' ') 
          }, '*');
          originalConsoleError.apply(console, args);
        };
      </script>
      </head>
        <body>
            <script>
            // Attiva la Strict Mode, per rilevare variabili mai dichiarate
            "use strict";
            ${p5Code || ''}
            </script>
        </body>
      </html>
      `

  return (
    <div className="w-full h-screen">
      {/* Container p5 canvas */}
      <div className="h-full relative">
        <iframe
          key={p5Code}
          ref={iframeRef}
          srcDoc={srcDoc}
          className="w-full h-full"
          sandbox="allow-scripts"
        />
        {/* Pulsante che apre il terminale */}
        <div
          className="w-10 h-10 m-4 fixed z-2 bottom-0 right-0"
          onClick={() => {
            setTerminal(!terminal)
          }}
        >
          <CgTerminal
            className={`h-full w-6 flex ${errors.length === 0 ? 'text-lime-500' : 'text-red-600'} `}
          />
        </div>
        {/* Terminale */}
        <div
          className={`h-48 w-full bg-neutral-900 text-red-400 p-4 font-mono text-sm absolute bottom-0 ${terminal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} transition-all duration-300`}
        >
          <p className="text-gray-400 mb-2"> Console Output:</p>
          {errors.length === 0 ? (
            <span className="text-green-500">&gt; Not errors.</span>
          ) : (
            errors.map((err, index) => (
              <div key={index} className="mb-1">
                &gt; {err}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default P5IframeEditor
