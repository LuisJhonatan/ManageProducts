import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/dataBase";

export default async function getDato(id) {
    try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.data()===undefined){
            return null;
        }
        return ({id: docSnap.id, ...docSnap.data()});
    } catch (error) {
        error("Ocurrio un error:", error);
    }
}