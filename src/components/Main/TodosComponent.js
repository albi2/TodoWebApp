import React,{ useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, selectTasksOnType, todoToggled } from '../../features/todos/todoSlice.js';
import styled from 'styled-components';
import { Colors } from '../Navbar/NavbarElements.js';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsPlay } from 'react-icons/bs';

const TodosBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const TodoItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    margin-top: 8px;
`

export const ButtonTextDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: relative;
`

export const Button = styled.button`
    border: 1px solid ${Colors.mixGray};
    border-radius: 50%;
    background-color: #fff;
    width: 20px;
    height: 20px;
    cursor: pointer;
`

export const TickDiv = styled.div`
    font-size: 0.9rem;
    color: ${Colors.mixGray};
    display: ${({isDisplayed}) => isDisplayed ? 'block' : 'none'};
    position: absolute;
    left: 25%;
    top: 13%;
    cursor: pointer;
`

export const Play = styled(BsPlay)`
    color: ${Colors.mixGray};
    font-size: 1.3rem;
    position: absolute;
    left: 19.8%;
`

export const ItemText = styled.span`
    margin-left: 16px;
    color: ${Colors.darkGray};
    font-size: 1.1rem;
`

export const DateInfo = styled.span`
    color: ${Colors.themeBlue};
    font-size: 0.9rem;
`

export const ShowCompletedBtn = styled.button`
    margin: 20px 0;
    border: none;
    color: #fff;
    background-color: ${Colors.mixGray};
    padding:2px 64px;
    font-size: 0.8rem;
    border-radius: 3px;
`

export const formatDate = function(date, locale = 'en-US'){
    const calcDaysPassed = (date1, date2) => {
        // Kthehet ne ms
        return Math.floor((date1-date2) / (24 * 60 * 60 * 1000));
    }

    const daysPassed = calcDaysPassed(new Date(), date);

    if(daysPassed === -1) return 'Tomorrow';
    if(daysPassed === 0 ) return 'Today';
    if(daysPassed === 1) return 'Yesterday';
    if(daysPassed <= 7 && daysPassed > 0) return `${daysPassed} days ago`;

    return Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: 'long'
    }).format(date);
}

const DisplayTodos = function({todos, displayTick,setRunningProject, setMinimization}){
    const dispatch = useDispatch();
    return(
        todos.map((todo,i) => {
            return (
            <TodoItem key={i+1}>
                <ButtonTextDiv>
                    <ButtonDiv>
                        <Button onClick={() => {
                            dispatch(todoToggled(todo.id));
                            setRunningProject(0);
                        }}/>
                        <TickDiv onClick={() => {
                            dispatch(todoToggled(todo.id))}} isDisplayed={displayTick} >
                            <AiOutlineCheck />
                        </TickDiv>
                    </ButtonDiv>
                    <ButtonDiv>
                        <Button />
                        <Play onClick={() => {
                            setRunningProject(todo.id);
                            setMinimization(false);
                        }}/>
                    </ButtonDiv>
                    <ItemText>
                        {todo.text}
                    </ItemText>
                </ButtonTextDiv>
                <DateInfo>
                   {todo.dueDate ?  formatDate(new Date(todo.dueDate)) : null}
                </DateInfo>
            </TodoItem>)
        })
    )
}

const TodosComponent = ({chosenMenu, setRunningProject, setMinimization}) => {
    const todos = useSelector(selectTodos);
    console.log(todos);
    const [showCompletedTasks, setShowCompleted] = useState(false);

    const completedTodos = useSelector(selectTasksOnType(chosenMenu,true));
    const uncompletedTodos = useSelector(selectTasksOnType(chosenMenu, false));

    return (
        <TodosBox>
            <DisplayTodos todos={uncompletedTodos}  displayTick={false} 
            setRunningProject={setRunningProject} 
            setMinimization={setMinimization}/>
            <ShowCompletedBtn onClick={() => setShowCompleted(!showCompletedTasks)}>
                {
                    showCompletedTasks ? 'Hide Completed Tasks' : 'Show Completed Tasks'
                }
            </ShowCompletedBtn>
            {
                showCompletedTasks ?
                <DisplayTodos todos={completedTodos} displayTick={true} /> : null
            }
        </TodosBox>
    )
}

export default TodosComponent;
