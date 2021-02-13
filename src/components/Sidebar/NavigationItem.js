import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from '../Navbar/NavbarElements.js';
import { useRouteMatch, useParams } from 'react-router-dom';

// const ItemBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 30px 5px 30px 15px;
//     border-bottom
// ` 

const ItemBox = styled(Link)`
    display: flex;
    flex-direction: row;
    padding: 7px 5px;
    justify-content: space-between;
    width: 100%;
    text-decoration: none;
    margin-top: 10px;
    background-color: ${({active}) => active ? Colors.lightGray : '#fff'};
    border-radius: 7px;
`

const IconDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const IconDesc = styled.span`
    color: ${Colors.darkGray};
    margin-left: 12px;
    font-size: 1.21rem;
    display: block;
    text-wrap: nowrap;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 40px;
`

const InfoItem = styled.span`
    color: ${Colors.mixGray};
    text-wrap: nowrap;
`

const NavigationItem = ({icon, itemName, hours, noItems, togglePopup,id, currentMenu, setCurrentMenu}) => {
    const { path,url} = useRouteMatch();


    return (
        <ItemBox to={`${url}/${itemName}`} 
         onContextMenu={togglePopup} id={id}
         onClick={() => setCurrentMenu(itemName)}
         active={currentMenu === itemName}>
            <IconDiv>
                {icon}
                <IconDesc>
                    {itemName}
                </IconDesc>
            </IconDiv>
            <InfoDiv>
                <InfoItem>
                    {hours}h
                </InfoItem>
                <InfoItem>
                    {noItems}
                </InfoItem>
            </InfoDiv>
        </ItemBox>
    )
}

export default NavigationItem;
