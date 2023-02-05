import { createContext, useState } from "react";


let UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [mailid, setmailid] = useState();
    const [longurl, setlongurl] = useState([]);
    const [shorturl, setshorturl] = useState([]);
    const [forgotUser, setforgotUser] = useState({});

    return (
        <UserContext.Provider value={{ shorturl, setshorturl, longurl, setlongurl, mailid, setmailid, forgotUser, setforgotUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;