import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as CritterLogo } from '../assets/logo.svg'
import { Icon } from 'react-icons-kit'
import { home, bookmark, bell, user } from 'react-icons-kit/feather/'
import { COLORS } from '../constants'
import { CurrentUserContext } from './CurrentUserContext'

const Sidebar = () => {
    const { currentUser, status } = useContext(CurrentUserContext)
    const userHandle = currentUser === null ? '' : currentUser.handle

    console.log(currentUser)

    const loading = {
        color: COLORS.primary,
        opacity: 0.5,
        pointerEvents: 'none',
    }

    return (
        <SidebarWrapper>
            <CritterLogo height={55} />
            <StyledLink exact to='/' >
                <Icon size={35} icon={home} />
                <LinkText>Home</LinkText>
            </StyledLink>
            <StyledLink to={userHandle} style={status === 'loading' ? loading : {}}>
                <Icon size={35} icon={user} />
                <LinkText >Profile</LinkText>
            </StyledLink>
            <StyledLink to='/notifications'>
                <Icon size={35} icon={bell} />
                <LinkText>Notifications</LinkText>
            </StyledLink>
            <StyledLink to='/bookmarks'>
                <Icon size={35} icon={bookmark} />
                <LinkText>Bookmarks</LinkText>
            </StyledLink>
        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: flex-start;
    width: 200px;
`

const StyledLink = styled(NavLink)`
    display: flex;
    margin: 10px 0 0 20px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 25px;
    padding: 7px 10px;
    align-items: center;
    &:visited {
        color: black;
    }
    &:hover {
        background: hsl(258deg, 100%, 50%, 0.2);
        text-decoration: none;
        color: ${COLORS.primary};
    }

    &.active {
        color: ${COLORS.primary}
    }
`

const LinkText = styled.span`
    margin-left: 20px;
`

export default Sidebar