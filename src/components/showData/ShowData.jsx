import { useSelector } from "react-redux"
import style from "./showData.module.css"

const ShowData = () => {
    const user = useSelector((state) => state.user);
  return (
    <article className={style.containerData}>
      <div className={style.containerInfo}>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email} </p>
      <p>Cargo: {user.employment}</p>
      <p>Teléfono: {user.phone}</p>
      </div>
    </article>
  )
}

export default ShowData