import React, { useContext } from 'react'
import { UserContext } from './UserContext'

const useAppContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  return context
}

export default useAppContext