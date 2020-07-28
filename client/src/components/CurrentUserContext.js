import React, { createContext, useState, useEffect } from 'react'

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [status, setStatus] = useState('loading')
        
    useEffect(() => {
        fetch("/api/me/profile")
            .then(res => res.json())
            .then(data => {
                console.log(data.profile)
                setCurrentUser(data.profile)
                setStatus('idle')
            })
            .catch(err => window.location.replace('/error'))
    }, [])

    

    return (
        <CurrentUserContext.Provider value={{currentUser, status }}>
            {children}
        </CurrentUserContext.Provider>
    )
}