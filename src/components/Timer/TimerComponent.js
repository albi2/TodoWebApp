import React,{useRef} from 'react'
import { TimerContainer, Minimize, ButtonDiv, ButtonContainer,TimeContainer,
SmallTimerContainer, SmallTimeContainer, SmallButtonContainer,
SmallButtonDiv, SmallTextDiv, TodoItem,container,smallContainerAnim,
remDisplayAnimation} from './TimerElements.js';
import { useTimer } from 'react-timer-hook';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import './style.css';
import RadialSeparators from './RadialSeparators.js';
import { IoStopCircleOutline,IoCaretForwardCircleOutline,IoPauseCircleOutline } from 'react-icons/io5';
import {selectTodoById, todoToggled} from '../../features/todos/todoSlice.js';
import {useSelector, useDispatch} from 'react-redux';
import { DateInfo, ItemText ,Play, TickDiv, Button,ButtonDiv as BDiv,
    ButtonTextDiv,formatDate} from '../Main/TodosComponent.js';
import { AiOutlineCheck } from 'react-icons/ai';
import {motion} from 'framer-motion';
import { BsFullscreen} from 'react-icons/bs';


const TimerComponent = ({expiryTimestamp, isMinimized, setMinimization,setRunningProject,currentRunningTodo}) => {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart
        } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

      const findSeconds = function(min ,sec){
          const minSecs = (50-min-1) * 60;
          const secs = 60 -sec;
          return secs + minSecs;
      }

      
    const currentTodo = useSelector(state => selectTodoById(state,currentRunningTodo));
    const dispatch = useDispatch();
  

    return (
      <TimerContainer 
        initial={false}
        animate={isMinimized ? "minimized" : "maximized"}
        variants={container}
        >
            <Minimize onClick={() =>setMinimization(!isMinimized)}
            variants={remDisplayAnimation}>
                <BsFullscreen />
            </Minimize>
            <TodoItem variants={remDisplayAnimation}>
                <ButtonTextDiv>
                    <BDiv>
                        <Button onClick={() => {
                        dispatch(todoToggled(currentTodo.id));
                        setRunningProject(0);
                        }}/>
                        <TickDiv onClick={() => {
                            dispatch(todoToggled(currentTodo.id))}} >
                            <AiOutlineCheck />
                        </TickDiv>
                    </BDiv>
                   
                    <ItemText>
                        {currentTodo.text}
                    </ItemText>
                </ButtonTextDiv>
                <DateInfo>
                    {currentTodo.dueDate ?  formatDate(new Date(currentTodo.dueDate)) : null}
                </DateInfo>
            </TodoItem>
            <motion.div variants={remDisplayAnimation}>
                <CircularProgressbarWithChildren  value={(findSeconds(minutes,seconds)/(50.0*60))}
                    maxValue={1}
                    strokeWidth={5}
                    className="bigProgressBar">
                    <RadialSeparators
                    count={12}
                    style={{
                    background: "#fff",
                    width: "1px",
                    height: `${5}%`
                    }} />
                    <TimeContainer>
                        {Intl.NumberFormat(navigator.language,{
                            style: 'decimal',
                            minimumIntegerDigits: 2
                        }).format(minutes)
                        +":"
                        +Intl.NumberFormat(navigator.language,{
                            style: 'decimal',
                            minimumIntegerDigits: 2
                        }).format(seconds)}
                    </TimeContainer>
                </CircularProgressbarWithChildren>
            </motion.div>
            {isRunning ?
            <ButtonDiv variants={remDisplayAnimation}>
                <ButtonContainer onClick={pause}>
                    <IoPauseCircleOutline />
                </ButtonContainer>
            </ButtonDiv> :
            <ButtonDiv variants={remDisplayAnimation}>
                <ButtonContainer onClick={resume}>
                    <IoCaretForwardCircleOutline />
                </ButtonContainer>
                <ButtonContainer onClick={() => {
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + 50*60);
                    restart(time);
                    pause();
                    }}>
                    <IoStopCircleOutline />
                </ButtonContainer>
            </ButtonDiv> 
            }

    <SmallTimerContainer onDoubleClick={() => setMinimization(false)}
      variants={smallContainerAnim} >
       <CircularProgressbarWithChildren
           className="smallBar"
           value={(findSeconds(minutes,seconds)/(50.0*60))}
           maxValue={1}
           strokeWidth={7}>
           <SmallTimeContainer>
               {Intl.NumberFormat(navigator.language,{
                   style: 'decimal',
                   minimumIntegerDigits: 2
               }).format(minutes)}
           </SmallTimeContainer>
       </CircularProgressbarWithChildren>
       <SmallTextDiv>
           {currentTodo?.text}
       </SmallTextDiv>
       {isRunning ?
               <SmallButtonContainer onClick={pause}>
                   <IoPauseCircleOutline />
               </SmallButtonContainer>
                :
           <SmallButtonDiv>
               <SmallButtonContainer onClick={resume}>
                   <IoCaretForwardCircleOutline />
               </SmallButtonContainer>
               <SmallButtonContainer onClick={() => {
                   const time = new Date();
                   time.setSeconds(time.getSeconds() + 50*60);
                   restart(time);
                   pause();
                   }}>
                   <IoStopCircleOutline />
               </SmallButtonContainer>
           </SmallButtonDiv> 
           }
      </SmallTimerContainer>
      </TimerContainer>
  
    )
}

export default TimerComponent;

