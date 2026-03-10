import Homepage from './components/Homepage'
import DiscoverPage from './components/DiscoverPage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
