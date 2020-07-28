import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import TweetActions from './TweetActions'
import styled from 'styled-components'
import { format } from 'date-fns'
import { repeat } from 'react-icons-kit/feather/'
import { Icon } from 'react-icons-kit'

const TweetDetails = () => {
    const [tweet, setTweet] = useState(null)
    const loc = useLocation().pathname;
    useEffect(() => {
        fetch(`/api${loc}`)
            .then(res => res.json())
            .then(data => setTweet(data.tweet))
            .catch(err => window.location.replace('/error'))
    }, [])

    if (tweet !== null) console.log(tweet)

    return (
        <>
        {tweet === null ? ''
        : <><Header onClick={() => window.history.back()} >{"<- Back"}</Header>
        <TweetWrapper>
            {tweet.retweetFrom 
                ? <Retweet><Icon icon={repeat} /> <>{tweet.retweetFrom.displayName} Remeowed</></Retweet>
                : ''}
            <UserInfo>
                <Avatar src={tweet.author.avatarSrc} />
                <NameWrapper>
                    <DisplayName to={`/${tweet.author.handle}`} >{tweet.author.displayName}</DisplayName>
                    <Handle>@{tweet.author.handle}</Handle>
                </NameWrapper>
            </UserInfo>
            <Status>{tweet.status}</Status>
            {(tweet.media.length > 0) ? <Media src={tweet.media[0].url} /> : <></>}
            <Timestamp>{format(new Date(tweet.timestamp), "H:mm aa - MMM Mo yyyy")} - Critter web app</Timestamp>
            <ActionWrapper>
                <TweetActions tweet={tweet} />
            </ActionWrapper>
        </TweetWrapper></>
        }
        </>
    )
}

const Avatar = styled.img`
    height: 40px;
    border-radius: 50%;
`

const DisplayName = styled(Link)`
    font-weight: bold;
    margin-right: 5px;
    text-decoration: none;
    color: black;

`

const Retweet = styled.div`
    color: gray;
    font-size: 14px;
    margin: 5px 25px 10px;
`

const ActionWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const Handle = styled.div`
    color: gray;
    font-size: 14px;
`

const Status = styled.p`
    margin: 10px 0px;
    font-size: 22px;
`

const Timestamp = styled.div`
    color: gray;
    font-size: 14px;
    padding-bottom: 10px;
    margin: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
`

const Media = styled.img`
    border-radius: 20px;
    width: 100%;
    height: auto;
`

const NameWrapper = styled.div`
    max-width: 700px;
    margin-left: 10px;
`

const UserInfo = styled.div`
    display: flex;
    align-items: center;
`

const TweetWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, .1);
    padding: 10px;
    color: black;
`
const Header = styled.button`
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding: 10px 20px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: transparent;
    width: 100%;
    text-align: left;
`


export default TweetDetails