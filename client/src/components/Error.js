import React from 'react'
import styled from 'styled-components'

export const Error = () => {
    return (<>
        <Bat>ERROR</Bat>
        <Rat>PRESS BACK TO TRY AGAIN</Rat>
    </>)
}

const Bat = styled.div`
    width: 100%;
    text-align: center;
    color: black;
    margin-top: 150px;
    font-size: 30px;
    font-weight: bold;
`
const Rat = styled(Bat)`
    margin-top: 0px;
    font-size: 20px;
`