import { useDispatch } from 'react-redux'
// import UpdateDatos from '../updateDatos/UpdateDatos';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase/authentication';
import { assignUser } from '../../redux/slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import Header from '../header/Header';
import { db } from "../../firebase/dataBase"
import { collection, getDocs } from 'firebase/firestore';
import style from "./home.module.css";
import MainContent from '../mainContent/MainContent';
import MenuUser from '../menuUser/MenuUser';
import Loading from '../loading/Loading';
import { existCar } from '../../redux/slices/carContentSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const resp = localStorage.getItem('car');
    if(resp){
        const carrito = JSON.parse(resp);
        dispatch(existCar(carrito))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const getDatos = async () => {
      let coll=null;
      try {
        coll = await getDocs(collection(db, "trabajadores"));
        
        setData(coll.docs.map((doc) => {
          return {...doc.data(), id: doc.id}
        }));
        
      } catch (error) {
        console.log("Error");
      } finally{
        setLoading(false);
      }
    }
    getDatos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUser = async (user) => {
      let infoUser = (data.filter(el => el.idCorreo === user.uid))[0];
      return infoUser;
    }
    onAuthStateChanged(auth, async (user) => {
      if (user && data.length!==0) {
        let usuario = await getUser(user)
        const userInfo = {
          name: usuario.nombre,
          email: usuario.correo,
          phone: usuario.telefono,
          idEmail: usuario.idCorreo,
          employment: usuario.cargo
        }
        dispatch(assignUser(userInfo));
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <section className={style.content}>
      <Header />
      <section className={`container ${style.contentHome}`}>
      {
        !loading?
        <>
          <MenuUser />
          <MainContent />
        </>
        :<Loading className={style.loading} />
      }
      </section>
    </section>
  )
}

export default Home