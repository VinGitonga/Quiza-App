import { useState, useEffect } from "react";
import { getUser } from "../services/auth";

export default function useAuth() {
    const [user, setUser] = useState(null)

    const fetchUser = () => {
        if(sessionStorage.getItem('userDataInfo')){
            let authUser = getUser(JSON.parse(sessionStorage.getItem('userDataInfo')))
            setUser(authUser)
        }
    }

    useEffect(() => fetchUser(), [user]);

    return { user }

}
