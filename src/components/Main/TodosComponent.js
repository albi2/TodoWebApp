import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { selectTodos,selectTasksOnType, todoToggled } from '../../features/todos/todoSlice.js';
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

const ButtonTextDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5px;
    position: relative;
`

const Button = styled.button`
    border: 1px solid ${Colors.mixGray};
    border-radius: 50%;
    background-color: #fff;
    width: 20px;
    height: 20px;
`

const TickDiv = styled.div`
    font-size: 0.9rem;
    color: ${Colors.mixGray};
    display: ${({isDisplayed}) => isDisplayed ? 'block' : 'none'};
    position: absolute;
    left: 25%;
    top: 13%;
    cursor: pointer;
`

const Play = styled(BsPlay)`
    color: ${Colors.mixGray};
    font-size: 1.3rem;
    position: absolute;
    left: 19.8%;
`

const ItemText = styled.span`
    margin-left: 16px;
    color: ${Colors.darkGray};
    font-size: 1.1rem;
`

const DateInfo = styled.span`
    color: ${Colors.themeBlue};
    font-size: 0.9rem;
`

const ShowCompletedBtn = styled.button`
    margin: 20px 0;
    border: none;
    color: #fff;
    background-color: ${Colors.mixGray};
    padding:2px 64px;
    font-size: 0.8rem;
    border-radius: 3px;
`

const formatDate = function(date, locale = 'en-US'){
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

const DisplayTodos = function({todos, displayTick, completed}){
    const dispatch = useDispatch();
    return(
        todos.map((todo,i) => {
            return (todo.completed === completed? 
            <TodoItem key={i+1}>
                <ButtonTextDiv>
                    <ButtonDiv>
                        <Button onClick={() => {
                            dispatch(todoToggled(todo.id));
                        }}/>
                        <TickDiv onClick={() => {
                            dispatch(todoToggled(todo.id))}} isDisplayed={displayTick} >
                            <AiOutlineCheck />
                        </TickDiv>
                    </ButtonDiv>
                    <ButtonDiv>
                        <Button />
                        <Play />
                    </ButtonDiv>
                    <ItemText>
                        {todo.text}
                    </ItemText>
                </ButtonTextDiv>
                <DateInfo>
                    {formatDate(new Date(todo.dueDate))}
                </DateInfo>
            </TodoItem> : null)
        })
    )
}

const TodosComponent = ({chosenMenu}) => {
    const todos = useSelector(selectTodos);
    console.log(todos);
    const [showCompletedTasks, setShowCompleted] = useState(false);

    const completedTodos = useSelector(selectTasksOnType(chosenMenu,true));
    const uncompletedTodos = useSelector(selectTasksOnType(chosenMenu, false));

    return (
        <TodosBox>
            <DisplayTodos todos={uncompletedTodos}  displayTick={false} completed={false}/>
            <ShowCompletedBtn onClick={() => setShowCompleted(!showCompletedTasks)}>
                {
                    showCompletedTasks ? 'Hide Completed Tasks' : 'Show Completed Tasks'
                }
            </ShowCompletedBtn>
            {
                showCompletedTasks ?
                <DisplayTodos todos={completedTodos} displayTick={true} completed={true}/> : null
            }
        </TodosBox>
    )
}

export default TodosComponent;
