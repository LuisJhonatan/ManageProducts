import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/authentication'
import { signInWithEmailAndPassword } from 'firebase/auth'
import style from './formLogin.module.css'
import Loading from '../loading/Loading'
import { useDispatch } from 'react-redux'
import { updateState } from '../../redux/slices/firstLoginSlice'


const FormLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validUser, setValidUser] = useState(true);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Inicia la carga

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setValidUser(true);
            
            if(userCredential.user.displayName===null && userCredential.user.phoneNumber===null &&  userCredential.user.photoURL===null){
                dispatch(updateState(true));
            }
            navigate('/home');
        } catch (error) {
            console.log(error)
            setValidUser(false);
        } finally {
            setLoading(false); // Finaliza la carga, ya sea que tenga éxito o falle
        }

        setEmail("");
        setPassword("");
    }

  return (
    <>
        <form className={style.formLogin} onSubmit={handleSubmit}>
            <label htmlFor="user">Usuario:</label>
            <input id='user' type="email" placeholder='Ingresa tu usuario...' onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" />
            <br />
            <label htmlFor="password">Contraseña:</label>
            <input id='password' type="password" placeholder='Ingresa tu contraseña...' onChange={(e) => setPassword(e.target.value)} value={password}  />
            <br />
            <input type="submit" value="Ingresar" />
        </form>
        <div>
            {loading && <Loading />}
        </div>
        <div>
            {
                !validUser && "Correo y/ó contraseña inválida."
            }
        </div>
    </>
  )
}

export default FormLogin