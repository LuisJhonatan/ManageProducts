import { useSelector } from 'react-redux'
import style from "./welcome.module.css"

const Welcome = () => {
    const user = useSelector(state => state.user)
  return (
    <h1 className={style.title}>Bienvenido {user.name}</h1>
  )
}

export default Welcome