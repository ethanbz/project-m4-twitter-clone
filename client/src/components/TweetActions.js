import React, { useState } from 'react'
import { share, repeat, messageCircle, heart } from 'react-icons-kit/feather/'
import { Icon } from 'react-icons-kit'
import styled from 'styled-components'

const TweetActions = ({ tweet }) => {
    const [likes, setLikes] = useState(tweet.numLikes)
    const [retweets, setRetweets] = useState(tweet.numRetweets)

    const handleLike = (event) => {
        event.stopPropagation()
        document.activeElement.blur()
        tweet.isLiked ? setLikes(likes-1) : setLikes(likes+1)
        fetch(`/api/tweet/${tweet.id}/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"like": !tweet.isLiked })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        tweet.isLiked = !tweet.isLiked
    }

    const handleRetweet = (event) => {
        event.stopPropagation()
        document.activeElement.blur()
        tweet.isRetweeted ? setRetweets(retweets-1) : setRetweets(retweets+1)
        fetch(`/api/tweet/${tweet.id}/retweet`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"retweet": !tweet.isRetweeted })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        tweet.isRetweeted = !tweet.isRetweeted
    }
    
    const handleClick = (event) => {
        document.activeElement.blur()
        event.stopPropagation()
    }

    const activeStyle = {
        background: 'hsl(258deg, 100%, 50%, 0.2)',
        fill: 'red'
    }

    return (
        <ActionBar>
            <IconWrapper onClick={(e) => handleClick(e)}>
                <Icon icon={messageCircle} />
            </IconWrapper>
            <IconWrapper style={tweet.isRetweeted ? activeStyle : {}} onClick={(e) => handleRetweet(e)}>
                <Icon icon={repeat} />
                <Stat>{retweets > 0 ? retweets : <></>}</Stat>
            </IconWrapper>
            <IconWrapper  style={tweet.isLiked ? activeStyle : {}} onClick={(e) => handleLike(e)}>
                <Icon icon={heart} />
                <Stat>{likes > 0 ? likes : <></>}</Stat>
            </IconWrapper>
            <IconWrapper onClick={(e) => handleClick(e)}>
                <Icon icon={share} />
            </IconWrapper>
        </ActionBar>
    )
}

const IconWrapper = styled.button`
    margin: 0;
    height: 30px;
    width: 30px;
    padding: 5px;
    border-radius: 50%;
    border: none;
    background: transparent;
    cursor: pointer;
    outline: none;
    position: relative;


    &:hover,
    &:focus {
        background: hsl(258deg, 100%, 50%, 0.1);
    }
`

const Stat = styled.span`
    position: absolute;
    left: 40px;
`

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0;
    width: 500px;
`

export default TweetActions