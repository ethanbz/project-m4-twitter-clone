import React from 'react'
import { loader } from 'react-icons-kit/feather/'
import { Icon } from 'react-icons-kit'
import styled, { keyframes } from 'styled-components'

const Spinner = ({ type }) => {
    const style = type === 'submit' ? {marginTop: '0px', color: 'white'} : {marginTop: '100px'}
    const size = type ==='submit' ? 18 : 30
    return (
        <Wrapper>
        <Loader style={style} size={size} icon={loader}/>
        </Wrapper>
    )
}
const loading = keyframes`
    100% { transform: rotate(360deg)}
`
const Loader = styled(Icon)`
    color: gray;
    animation-name: ${loading};
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
`



export default Spinner