import React from 'react'
import styled from 'styled-components';
import { Colors } from '../Navbar/NavbarElements.js';
import {useSpring, animated} from 'react-spring';
import {useDispatch , useSelector } from 'react-redux';
import {projectDeleted, projectCompleted} from '../../features/projects/projectsSlice.js';
const PopupContainer = styled(animated.div)`
    padding: 2px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
    background-color: #fff;
    position: absolute;
    top: ${({yPos}) => yPos};
    left: ${({xPos}) => xPos};
    border-radius: 8px;
`

const PopupButtons = styled.button`
    background-color: #fff;
    color: ${Colors.darkGray};
    border: none;
    font-size: 1rem;
    padding: 8px 25px; 
    border-radius: 8px;
    outline: none;
    &:hover{
        background-color: ${Colors.lightGray};
    }
`

const ProjectPopup = ({isPopupOpen, xPos, yPos,selectedContextProject, toggleEditProject}) => {

    const animation = useSpring({
        config: {
            duration: 250,
        },
        transform: isPopupOpen ? 'scale(1)' : 'scale(0)'
     });


     const dispatch= useDispatch();
     

    return (
        isPopupOpen ? 
            <PopupContainer style={animation} xPos={xPos} yPos={yPos}>
                <PopupButtons onClick={toggleEditProject}>
                    Edit Project
                </PopupButtons>
                <PopupButtons onClick={() => {
                     if(!selectedContextProject) return;
                     dispatch(projectCompleted(selectedContextProject));
                }}>
                    Complete
                </PopupButtons>
                <PopupButtons onClick={() => {
                    if(!selectedContextProject) return;
                    dispatch(projectDeleted(selectedContextProject));
                }}>
                    Delete Project
                </PopupButtons>
            </PopupContainer>
        : null
    )
}

export default ProjectPopup;
