// App.js
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import MainRouter from "./routes/MainRouters"
import { UserProvider } from "./routes/UserContext"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <UserProvider> 
      <Router>
        <MainRouter />
        <Toaster />
      </Router>
    </UserProvider>
  )
}

export default App
