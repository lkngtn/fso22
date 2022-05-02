import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'

import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import LoginForm from './LoginForm'
import AddBlogModal from './AddBlogModal'

const Navigation = ({ user }) => {
  const dispatch = useDispatch()

  const addBlog = (blog) => {
    dispatch(createBlog(blog))
    dispatch(
      setNotification(`Successfully added '${blog.title}'`, 'success', 5)
    )
  }
  return (
    <nav
      className="relative w-full flex flex-wrap items-center
  justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700
  focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light"
    >
      <div className="absolute ml-[50%] -translate-x-1/2">
        <h1 className="text-2xl bold">BlogList</h1>
      </div>
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="navbar-toggler text-gray-500 border-0
      hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div
          className="collapse navbar-collapse flex-grow items-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <Link
                className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                to="/"
              >
                Blogs
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link
                className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0"
                to="/users"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center relative">
          {!user && <LoginForm />}
          {user && <AddBlogModal addBlog={addBlog} />}
          {user && (
            <div className="dropdown relative">
              <a
                className="dropdown-toggle flex items-center hidden-arrow"
                href="#"
                id="dropdownMenuButton2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                  className="rounded-full"
                  style={{ height: '35px', width: '35px' }}
                  alt=""
                  loading="lazy"
                />
              </a>
              <ul
                className="
    dropdown-menu
    min-w-max
    absolute
    hidden
    bg-white
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  "
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <a
                    className="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
                    href="#"
                    onClick={() => dispatch(logoutUser())}
                  >
                    <HiLogout className="inline" /> logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
