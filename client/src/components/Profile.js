import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'date-fns'
import {  mapPin, calendar } from 'react-icons-kit/feather/'
import { Icon } from 'react-icons-kit'

import Feed from './HomeFeed'

const Profile = () => {
    const handle = useLocation().pathname
    const [profile, setProfile] = useState(null)
    const followers = []
    const following = []
    useEffect(() => {
        fetch(`/api${handle}/following`)
            .then(res => res.json())
            .then(data => {
                console.log('2', data.following)
                following.concat(data.following)
            })
        fetch(`/api${handle}/followers`)
            .then(res => res.json())
            .then(data => {
                console.log('3',data.followers)
                followers.concat(data.followers)
            })
        fetch(`/api${handle}/profile`)
            .then(res => res.json())
            .then(data => {
                console.log('1',data.profile)
                setProfile(data.profile)
            })
            .catch(err => window.location.replace('/error'))
    }, [handle])


    return (
        <>
        {profile === null ? ''
        :<ProfileWrapper>
            <Header>
                <Banner style={{backgroundImage: `url(${profile.bannerSrc})`}} />
                <Avatar src={profile.avatarSrc} />
            </Header>
            <UserInfo>
                <DisplayName>{profile.displayName}</DisplayName>
                <Handle>
                    @{profile.handle}
                    <FollowsYou style={profile.isFollowingYou ? {} : {visibility: 'hidden'}} >Follows you</FollowsYou>
                </Handle>
                <Bio>{profile.bio}</Bio>
                <Location style={profile.location ? {} : {display: 'none'}} >
                    <Icon icon={mapPin} /> {profile.location}
                </Location>
                <JoinDate>
                    <Icon icon={calendar} /> Joined {format(new Date(profile.joined), "MMMM yyyy")}
                </JoinDate>
                <Stats>
                    <Stat>{profile.numFollowing}</Stat> Following <Stat>{profile.numFollowers}</Stat> Followers
                </Stats>
            </UserInfo>
            <Feed handle={handle} />
    </ProfileWrapper>}
        </>
    )
}

const UserInfo = styled.div`
display: block;
font-size: 14px;
margin: 10px;
`

const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    color: black;
    border: 1px solid rgba(0, 0, 0, .1);
`
const FollowsYou = styled.span`
    background: lightgray;
    color: black;
    font-size: 0.9em;
    padding: 3px;
    border-radius: 3px;
    margin-left: 4px;
    opacity: 0.8;
    user-select: none;
`

const Stats = styled.div`
    color: darkslategray;
    margin: 10px 0;
`
const Stat = styled.span`
    color: black;
    font-weight: bold;
    &:last-child {
        margin-left: 20px;
    }
`

const Location = styled.span`
    color: darkslategray;
    font-size: 14px;
    margin-right: 20px;
`

const JoinDate = styled(Location)`

`

const Bio = styled.p`

`

const Header = styled.div`
    width: auto;
    white-space: nowrap;
`

const Banner = styled.div`
display: block;
    background-size: cover;
    height: 200px;
    width: 100%;
    margin: -10px 0 60px;
    left: 0;
`

const Avatar = styled.img`
    border-radius: 50%;
    position: absolute;
    height: 120px;
    left: 230px;
    top: 130px;
    border: 4px solid white;
    
`

const DisplayName = styled.div`
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-decoration: none;
    color: black;

`
const Handle = styled.div`
    color: darkslategray;
    margin-top: 1px;
`


export default Profile