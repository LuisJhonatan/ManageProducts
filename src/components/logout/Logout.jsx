import { auth } from "../../firebase/authentication";
import { useNavigate } from 'react-router-dom'
import style from "./logout.module.css"

const Logout = () => {
    let navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await auth.signOut();
          console.log("Sesión cerrada exitosamente");
          navigate('/');
        } catch (error) {
          // Manejar errores en caso de que ocurran durante el cierre de sesión
          console.error("Error al cerrar sesión:", error.message);
        }
      };
    
      return (
        <button className={style.btn} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      );
}

export default Logout