import React, { createContext } from 'react'

export const authDataContext = createContext()

const AuthContext = ({children}) => {
    let serverUrl = "https://shop-motto.vercel.app"

    let value = {
        serverUrl
    }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
