import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Tweet from './Tweet'
import styled from 'styled-components'
import Spinner from './Spinner'

const Feed = ({ handle, refetch }) => {
    const [feed, setFeed] = useState(null)
    const url = useLocation().pathname === '/' ? '/api/me/home-feed' : `/api${handle}/feed`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setFeed(data.tweetIds.map(key => 
                    Object.values(data.tweetsById).find(tweet => {
                    if (key === tweet.id) return tweet
                })))
            })
            .catch(err => window.location.replace('/error'))
    }, [refetch])

    console.log(feed)

    return (
        <>
        {feed !== null 
        ? <FeedWrapper> 
            {feed.map(tweet => <Tweet key={tweet.id} tweet={tweet} />) }
        </FeedWrapper>
        : <><Spinner type={'main'} /></>}
        </>
    )
}

const FeedWrapper = styled.div`
    display: flex;
    flex-direction: column;

    &:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
`


export default Feed