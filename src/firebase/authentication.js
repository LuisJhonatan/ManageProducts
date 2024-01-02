import { firebase } from "./config";
import { getAuth } from "firebase/auth";

export const auth = getAuth(firebase);