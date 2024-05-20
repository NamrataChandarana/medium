import './App.css'
import { BrowserRouter as Router, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blogs  from './pages/Blogs';
import Blog  from './pages/Blog';
import Publish from './pages/Publish';


function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
      <Router>
        <Routes>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/' element={<Blogs />}></Route>
            <Route path='/blog/:id' element={<Blog />}></Route>
            <Route path='/publish' element={<Publish />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
