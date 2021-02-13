import React from 'react'
import { NavSignInUp, Nav, NavbarContainer,
NavbarMenu, NavItem, NavUserIcon, SignInUp } from './NavbarElements'
import { IoIosNotificationsOutline } from 'react-icons/io';
import { SiGooglemaps } from 'react-icons/si';
import { IoSettingsOutline } from 'react-icons/io5';
import {useRouteMatch} from 'react-router-dom';

const Navbar = ({toggleModal}) => {
    const {path, url} = useRouteMatch();
    console.log(url);
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavSignInUp to={`${url}/signin`} onClick={toggleModal}>
                        <NavUserIcon />
                        <SignInUp >Sign In | Sign Up</SignInUp>
                    </NavSignInUp>
                    <NavbarMenu>
                        <NavItem>
                            <SiGooglemaps />
                        </NavItem>
                        <NavItem>
                            <IoIosNotificationsOutline />
                        </NavItem>
                        <NavItem>
                            <IoSettingsOutline />
                        </NavItem>
                    </NavbarMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;
