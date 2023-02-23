import React, { useState, createContext } from 'react'
export const ConnectionContext = createContext()

export default function ConnectionContextProvider(props) {
    //const [userLogged, setUserLogged] = useState(null)
    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])
    return (
        <ConnectionContext.Provider value={{ users, setUsers, requests, setRequests }}>
            {props.children}
        </ConnectionContext.Provider>
    )
}