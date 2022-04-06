import {createContext} from "react";


const Context = createContext({auth: null, userData: {name: '', email: '', roles: ['']} });
export default Context;