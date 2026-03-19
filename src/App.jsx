import Homepage from './components/Homepage'
import DiscoverPage from './components/DiscoverPage'
import AboutPage from './components/AboutPage'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import EditProfilePage from './components/EditProfilePage'
import EditProjectInfoPage from './components/EditProjectInfoPage'
import ProjectPage from './components/ProjectPage'
import EditProfileCoverPage from './components/EditProfileCoverPage'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id/edit" element={<EditProfilePage />} />
            <Route
              path="/projects/:id/edit"
              element={<EditProjectInfoPage />}
            />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route
              path="/profile/:id/cover"
              element={<EditProfileCoverPage />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
