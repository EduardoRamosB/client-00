import {createContext, useContext, useMemo} from "react"
import {useLocalStorage} from "./useLocalStorage.jsx"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user_id, setUserId] = useLocalStorage('user_id', null)
  const [jwt, setJwt] = useLocalStorage('jwt', null)
  const [access_token, setAccessToken] = useLocalStorage('access_token', null)
  const [refresh_token, setRefreshToken] = useLocalStorage('refresh_token', null)


  const login = async (data) => {
    console.log('data:', data)

    setJwt(data.tokens.access);
    setRefreshToken(data.tokens.refresh)
    setUserId(data.id)
  }

  const logout = () => {
    setUserId(null)
    setJwt(null)
    setRefreshToken(null)
  }

  const forceLogout = (error) => {
    if (error.response?.status === 401) {
      logout();
    }
  }

  const value = useMemo(() => ({
    user_id,
    jwt,
    refresh_token,
    login,
    logout,
    forceLogout
  }), [user_id, jwt])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}