import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Feed from './HomeFeed'
import Meow from './Meow'
import { CurrentUserContext } from './CurrentUserContext'
import Spinner from './Spinner'

const Home = () => {
const [refetch, setRefetch] = useState(false)
const { currentUser, status } = useContext(CurrentUserContext);

    return (
        <>
        {status === 'loading' 
        ? <><Spinner type={'main'}/></>
        :<> <Header>Home</Header>
        <Meow refetch={refetch} setRefetch={setRefetch} />
        
        <Feed refetch={refetch} setRefetch={setRefetch} />
    </>}
        </>
    )
}


const Header = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, .1);
`
export default Home