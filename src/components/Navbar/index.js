import React from 'react'
import { NavSignInUp, Nav, NavbarContainer,
NavbarMenu, NavItem, NavUserIcon, SignInUp } from './NavbarElements'
import { IoIosNotificationsOutline } from 'react-icons/io';
import { SiGooglemaps } from 'react-icons/si';
import { IoSettingsOutline } from 'react-icons/io5';

const Navbar = ({toggleModal}) => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavSignInUp onClick={toggleModal}>
                        <NavUserIcon />
                        <SignInUp to="/home/signin">Sign In | Sign Up</SignInUp>
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
