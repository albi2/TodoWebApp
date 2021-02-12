import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Colors } from '../Navbar/NavbarElements.js';
import { selectTasksOnType} from '../../features/todos/todoSlice.js';

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

const StatsBar = ({chosenMenu}) => {
    // Receives the todos of the currently chosen menu and makes calculations
    const uncompletedTodos = useSelector(selectTasksOnType(chosenMenu, false));
    const countCompleted = Object.values(useSelector(selectTasksOnType(chosenMenu, true))).length;
    const countUncompleted = Object.values(uncompletedTodos).length;

    const estimatedTime = uncompletedTodos.reduce((sum, todo) => {
        sum += todo.pomodoros;
        return sum;
    },0) * 25 / 60.0;
    
    return (
        <Bar>
            <ItemBox>
                <Estimator>{estimatedTime.toFixed(1)}</Estimator>
                <ItemDesc>Estimated Time(h)</ItemDesc>
            </ItemBox>
            <ItemBox>
                <Estimator>{countUncompleted}</Estimator>
                <ItemDesc>Tasks To Be Completed</ItemDesc>
            </ItemBox>
            <ItemBox>
                <Estimator>0.0</Estimator>
                <ItemDesc>Elapsed Time(h)</ItemDesc>
            </ItemBox>
            <ItemBox>
                <Estimator>{countCompleted}</Estimator>
                <ItemDesc>Completed Tasks</ItemDesc>
            </ItemBox>
        </Bar>
    )
}

export default StatsBar;
