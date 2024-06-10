import './App.css'
import { BrowserRouter as Router, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blogs  from './pages/Blogs';
import Blog  from './pages/Blog';
import Publish from './pages/Publish';
import AuthLayout from './component/AuthLayout';
import Profile from './pages/Profile';
import EditPost from './pages/EditPost';
import Home from "./pages/Home";
import { Toaster } from 'sonner'

function App() {

  return (
    <>
    
      <Router>
        <Routes>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/' element={<Home />}>
            </Route>
            <Route path='/blog' element={
                <AuthLayout>
                    <Blogs />
                </AuthLayout>}>
            </Route>
            <Route path='/blog/:id' element={
              <AuthLayout>
                    <Blog />
                </AuthLayout>}>
            </Route>
            <Route path='/publish' element={
                <AuthLayout>
                    <Publish />
                </AuthLayout>}>
            </Route>
            <Route path='/profile' element={
                <AuthLayout>
                    <Profile />
                </AuthLayout>}>
            </Route>
            <Route path='/edit/:id' element={
                <AuthLayout>
                    <EditPost />
                </AuthLayout>}>
            </Route>
        </Routes>
      </Router>
      <Toaster />
      <ToastContainer />
    </>
  )
}


export default App;