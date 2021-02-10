import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export const Colors = {
    lighterGray: '#f2f0f0',
    lightGray: ' #e3dcdc',
    mixGray: '#bababa',
    darkGray: '#5e5e5e',
    themeBlue: '#227de6',
}

export const Nav = styled.nav`
    background: #fcfcfc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1 rem;
    position: sticky;
    top: 0;
    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }

`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center:
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    border: 1px solid #f2f0f0;
`

export const NavSignInUp = styled(Link)`
    color: #e3dcdc;
    justify-self: flex-start;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
`

export const NavUserIcon = styled(FaUserCircle)`
    background-color: #e3dcdc; 
    color: white;
    font-size: 2.4rem;
    border-radius: 50% 50%;
`

export const SignInUp = styled.span`
    color: #227de6;
    font-size: 1.2rem;
    margin-left: 10px;
    text-wrap: nowrap;
`


export const NavbarMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`

export const NavItem = styled.span`
    color: #5e5e5e;
    padding: 10px;
    font-size: 1.5rem;
`

