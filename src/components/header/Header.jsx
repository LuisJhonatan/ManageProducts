import React, {  useState } from 'react'
import style from "./header.module.css"
import img from "../../assets/logo.png"
import Logout from "../logout/Logout"
import ShowData from '../showData/ShowData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const [active, setActive] = useState(false);
    const car = useSelector(state => state.car);

    const handleClick = () => {
        setActive(!active);
    }
    
  return (
    <>
    <header className={style.header}>
        <div className={`container ${style.containerHeader}`}>
        <Link to="/home" className={style.containerLogo}>
            <img src={img} alt="logo" />
        </Link>
        <div className={style.containerCar}>
            <Link className={style.agregar} to="/home/carrito">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
            </svg>
            </Link>
            {car.product.length}
            <button onClick={handleClick} className={style.btnMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
            </button>
        </div>
        <div className={`${style.menu} ${active?style.active:""}`}>
            <ShowData />
            <Logout />
        </div>
        </div>
    </header>
    </>      
  )
}

export default Header