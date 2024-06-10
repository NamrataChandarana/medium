import { Link } from "react-router-dom";
import Appbar from "../component/Appbar";
import img from './assets/home.svg'

const Home = () => {
  return (
    <>
      <div className="min-h-screen overflow-hidden">
        <Appbar />
        <div className="flex flex-col items-center justify-center md:mt-32 sm:mt-20 my-10">
          <div className="text-center ">
            <span className="bg-gray-100 py-1 px-3 rounded-lg text-black">welcome to DevTales</span>
            <h1 className="font-bold md:text-4xl sm:text-3xl text-xl mt-2 font-inter tracking-tighter">Craft the future of tech together</h1>
            <p className="text-gray-500 sm:text-xl text-lg text-wrap mt-1 mx-2 md:w-[40rem] sm:w-[30rem]">A place where code ignites narratives, and developers collaborate to shape the future of technology.</p>
          </div>
          <img src={img} alt="home" className="sm:max-w-[50%] max-w-[70%] ml-10 mt-10 sm:ml-24" />
        </div>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6">
          <nav className="md:flex hidden space-x-5">
            <button>
              Privacy Policy
            </button>
            <button>
              Terms & Conditions
            </button>
          </nav>
          <div className="ml-auto space-x-4">
            <button className="font-medium bg-blue-50 hover:bg-blue-100 hover:text-[#00C4FF] text-[#00C4FF] rounded-lg text-sm p-3">
              <Link to="https://github.com/NamrataChandarana">
                Twitter
              </Link>
            </button>
            <button className="font-medium bg-blue-50 hover:bg-blue-100 hover:text-[#0B66C2] text-[#0B66C2] rounded-lg text-sm p-3">
              <Link to="https://www.linkedin.com/in/namratachandarana/">
                Linkedln
              </Link>
            </button>
            <button className="font-medium bg-gray-200 hover:bg-gray-300 hover:text-gray-900 text-gray-900 rounded-lg text-sm p-3">
              <Link to="https://x.com/Namrata20_">
                Github
              </Link>
            </button>
          </div>
        </footer>
      </div>
    </>

  );
};

export default Home;