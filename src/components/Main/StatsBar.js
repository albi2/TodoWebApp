import React from 'react'
import styled from 'styled-components';
import { Colors } from '../Navbar/NavbarElements.js';

const Bar = styled.div`
    width: 100%;
    font-color: ${Colors.mixGray};
    display: flex;
    padding: 4px 13%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${Colors.lighterGray};
    background-color: #fff;
    border-radius: 5px;
`

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Estimator = styled.span`
    color: #227de6;
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 4px;
`

const ItemDesc = styled.span`
    font-size: 1rem;
    color: ${Colors.mixGray};
`

const StatsBar = ({}) => {
    // Receives the todos of the currently chosen menu and makes calculations
    return (
        <Bar>
            <ItemBox>
                <Estimator>0</Estimator>
                <ItemDesc>Estimated Time(h)</ItemDesc>
            </ItemBox>
            <ItemBox>
                <Estimator>6</Estimator>
                <ItemDesc>Tasks To Be Completed</ItemDesc>
            </ItemBox>
            <ItemBox>
                <Estimator>0</Estimator>
                <ItemDesc>Elapsed Time(h)</ItemDesc>
            </ItemBox>
            <ItemBox>
                <Estimator>0</Estimator>
                <ItemDesc>Completed Tasks</ItemDesc>
            </ItemBox>
        </Bar>
    )
}

export default StatsBar;
