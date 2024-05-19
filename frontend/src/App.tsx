import './App.css'
import { BrowserRouter as Router, Route, Routes } from '../node_modules/react-router-dom/dist/index'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Blogs} from './pages/Blogs';

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
      <Router>
        <Routes>
            <Route path='/signin' element={<Signin />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/blogs' element={<Blogs />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
