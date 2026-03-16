import Homepage from './components/Homepage'
import DiscoverPage from './components/DiscoverPage'
import AboutPage from './components/AboutPage'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import EditProfilePage from './components/EditProfilePage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:id/edit" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
