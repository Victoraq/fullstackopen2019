import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, messageColor }) => {

  const notificationStyle = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageColor, setMessageColor] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('wrong username or password')
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')

    setUser(null)
    setUsername('')
    setPassword('')

  }

  const addBlog = (event) => {
    event.preventDefault()
    try {
      blogService.setToken(user.token)
      blogService.create(newBlog)
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setMessageColor('green')
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    } catch (error) {
      setMessage(error)
      setMessageColor('red')
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={message} messageColor={messageColor} />


        <form onSubmit={handleLogin}>
          <div>
            username
          <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
          <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>

      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} messageColor={messageColor} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App