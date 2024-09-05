import {Navigate, Outlet} from "react-router-dom"
import {useAuth} from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { user_id } = useAuth()

  return (
    user_id ?
      <Outlet /> :
      <Navigate to='/users/sign_in?msg=You need to sign in or sign up before continuing.' />
  )
}

export default ProtectedRoutes