import React, { useState, createContext } from 'react'
export const ConnectionContext = createContext()

export default function ConnectionContextProvider(props) {
    const [userLogged, setUserLogged] = useState(null)

    return (
        <ConnectionContext.Provider value={{ userLogged, setUserLogged }}>
            {props.children}
        </ConnectionContext.Provider>
    )
}