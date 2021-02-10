import styled from 'styled-components';
import { FaCircle } from 'react-icons/fa';
import { Colors } from '../Navbar/NavbarElements.js';

export const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    border: 1px solid ${Colors.lighterGray};
    border-top: none;
    position: relative;
`

export const ChronoNav = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 15px 5px 30px 15px;
    position: relative;

    &:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 10%;
        width: 80%;
        height: 1px;
        background-color: ${Colors.lighterGray};
    }
`

export const ItemIcon = styled.div`
    font-size: 1.7rem;
    color: ${({color}) => color};
    display: flex;
    align-items: center;
`

export const Circle = styled(FaCircle)`
    font-size: 0.8rem;
    color: ${({color}) => color};
    text-align: center;
`

export const ProjectsNav = styled.div`
    width: 100%;
    padding: 30px 5px 30px 15px;
    display: flex;
    flex-direction: column;
`

export const ProjectButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 5px;
    border: none;
    border-top: 1px solid ${Colors.lightGray};
    color: ${Colors.themeBlue};
    position:absolute;
    bottom: 0;
    left: 0;
    font-size: 1.3rem;
    background-color: #fff;
    width: 100%;
    cursor: pointer;
    
    &:focus{
        outline: none;
    }
`

export const ButtonDesc = styled.span`
    margin-left: 10px;
    text-wrap: nowrap;
    
`