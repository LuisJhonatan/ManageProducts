import { useEffect, useState } from "react";
import style from "./listProducts.module.css"
import { db } from "../../firebase/dataBase";
import { collection, getDocs } from "firebase/firestore";
import ViewProduct from "../viewProduct/ViewProduct";
import Loading from "../loading/Loading";

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(6);
    const [loading, setLoading] = useState(false);

    const getDatos = async () =>{
        try {
            setLoading(true);
            const query = await getDocs(collection(db, "productos"));
            setProducts(query.docs.map(prod => {
                return {...prod.data(), id: prod.id}
            }))
        } catch (error) {
            
        } finally{
            setLoading(false);
        }
    }
    const handleScroll = () => {
        const container = document.querySelector(`.${style.containerProducts}`);
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 20
    ) {
      // Cuando se llega al final de la página (considerando un margen de 20 píxeles)
     
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
      
    }
    };

    useEffect(() => {
        const container = document.querySelector(`.${style.containerProducts}`);
        container.addEventListener("scroll", handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        
        getDatos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <main className={`${style.containerProducts} ${!loading? style.containerGrid: ""}`}>
        {
            loading
            ? <Loading className={style.loading} />
            :<>
                <h2 className={style.productTitle} >Productos</h2>
                {   
                products.slice(0, visibleProducts).map(prod => {
                    return(
                        <ViewProduct key={prod.id} product={prod} />
                    )
                })
                }
            </>
        }
    </main>
  )
}
export default ListProducts