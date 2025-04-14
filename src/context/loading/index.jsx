import { createContext, useContext, useState } from 'react'
import Loading from './loading'

const LoadingContext = createContext()
export const useLoading = () => useContext(LoadingContext)

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const value = {
    isLoading,
    setIsLoading
  }
  return (
    <LoadingContext.Provider value={value}>
      {children}
      <Loading loading={isLoading} />
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
