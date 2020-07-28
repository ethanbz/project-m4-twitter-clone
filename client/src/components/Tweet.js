import React from 'react'
import TweetActions from './TweetActions'
import styled from 'styled-components'
import { repeat } from 'react-icons-kit/feather/'
import { Icon } from 'react-icons-kit'
import { format } from 'date-fns'
import { useHistory } from "react-router-dom";



const Tweet = ({tweet}) => {
    const { handle, displayName, avatarSrc,  } = tweet.author
    const { timestamp, status, media, id } = tweet
    let history = useHistory();

    const tweetView = () => {
        history.push(`/tweet/${id}`)
    }

    const profileView = (event) => {
        event.stopPropagation();
        history.push(`/${handle}`)
    }

    return (
        <TweetWrapperS tabIndex='0' aria-label='View tweet' onClick={tweetView} >
            {tweet.retweetFrom 
                ? <Retweet><Icon icon={repeat} /> <>{tweet.retweetFrom.displayName} Remeowed</></Retweet>
                : ''}
        <TweetWrapper>
            
            <Avatar src={avatarSrc} />
            <TweetContents>
                
                <DisplayName tabIndex='0' aria-label='View profile' onClick={(e) => profileView(e)}>{displayName}</DisplayName>
                <Handle>@{handle} - {format(new Date(timestamp), "MMM Mo")}</Handle>
                <Status>{status}</Status>
                {(media.length > 0) ? <Media src={media[0].url} /> : <></>}
                <TweetActions tweet={tweet}/>
            </TweetContents>
        </TweetWrapper>
        </TweetWrapperS>
    )
}

const Avatar = styled.img`
    height: 40px;
    border-radius: 50%;
    margin: 10px;
`

const DisplayName = styled.div`
    display: inline-block;
    font-weight: bold;
    margin-right: 5px;
    cursor: pointer;
`

const Handle = styled.div`
    display: inline-block;
    color: gray;
    font-size: 14px;
`

const Retweet = styled.div`
    color: gray;
    font-size: 14px;
    margin: 10px 40px 0;
`

const Status = styled.p`
    margin: 5px 0px;
`

const Media = styled.img`
    border-radius: 20px;
    max-width: 100%;
    height: auto;
`

const TweetContents = styled.div`
    color: black;
    margin: 10px 10px 0 0;
    max-width: 700px;
`

const TweetWrapper = styled.div`
    display: flex;
    
`

const TweetWrapperS = styled.div`
    margin-bottom: -1px;
    border: 1px solid rgba(0, 0, 0, .1);
    border-bottom: none;
    padding-bottom: 5px;
    position: relative;
`

export default Tweet