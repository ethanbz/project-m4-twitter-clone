import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { CurrentUserContext } from './CurrentUserContext'
import { COLORS } from '../constants'
import Spinner from './Spinner'

const Meow = ({ refetch, setRefetch }) => {
    const { currentUser, status } = useContext(CurrentUserContext);
    const [meow, setMeow] = useState('')
    const [meowing, setMeowing] = useState(false)
    let style = {};
    const disabled = {
        opacity: 0.3,
        pointerEvents: 'none'
    }
    if (meow.length > 280 || meow.length === 0 || meowing) style = disabled

    let color = 'lightgray';
    if (meow.length > 280 ) {
        color = 'firebrick'
    } else if (meow.length > 224) color='goldenrod'

    const handleSetMeow = event => {
        setMeow(event.target.value)
        console.log(meow)
    }

    const handleSubmit = () => {
        setMeowing(true)
        fetch('/api/tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "status": `${meow}` })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMeow('')
            setRefetch(!refetch)
            setMeowing(false)
        })
        .catch(err => {
            setMeowing(false)
            window.alert('Sorry, meow failed to submit. Try again!')
        })
    }

    
    console.log(currentUser)
    return (
        <MeowWrapper>
            <Avatar src={currentUser !== null ? currentUser.avatarSrc : ''} />
            <Input placeholder="What's happening?" value={meow} onChange={(ev) => handleSetMeow(ev)} />
            <Submit style={style} onClick={handleSubmit} >{meowing ? <Spinner type={'submit'} /> : 'Meow'}</Submit>
    <Remaining style={{color: color}} >{280 - meow.length}</Remaining>
        </MeowWrapper>
    )
}

const MeowWrapper = styled.div`
    height: 190px;
    white-space: nowrap;
    padding: 20px 10px 20px 0px;
    position: relative;
    border-left: 1px solid rgba(0, 0, 0, .1);
    border-right: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 10px solid rgba(0, 0, 0, .1);
`

const Input = styled.textarea`
    box-sizing: border-box;
    height: calc(100% - 30px);
    width: calc(100% - 60px);
    outline: none;
    resize: none;
    padding: 18px 70px 18px 0;
    font-size: 18px;
    margin-left: 60px;
    font-family: sans-serif;
    border: none;
`
const Remaining = styled.span`
    position: absolute;
    bottom: 22px;
    right: 85px;
    font-size: 13px;
`

const Submit = styled.button`
    display: block;
    background: ${COLORS.primary};
    border: none;
    color: white;
    height: 30px;
    width: 60px;
    border-radius: 20px;
    font-weight: bold;
    position: absolute;
    right: 10px;

`

const Avatar = styled.img`
    height: 40px;
    border-radius: 50%;
    margin: 10px 0px;
    position: absolute;
    left: 10px;
`

export default Meow