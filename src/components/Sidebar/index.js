import React from 'react'
import { Link } from 'react-router-dom';
import { Colors } from '../Navbar/NavbarElements.js';
import { BiSun } from 'react-icons/bi';
import { WiSunset } from 'react-icons/wi';
import { RiCalendarCheckLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { SidebarContainer, ChronoNav, ItemIcon, ProjectsNav, Circle,
ProjectButton, ButtonDesc} from './SidebarElements';
import NavigationItem from './NavigationItem';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../features/projects/projectsSlice.js';

const Projects = ({projects, togglePopup, toggleProjectModal}) => {

            return(projects.length !== 0 ?<ProjectsNav>
                {
                    projects.map(project => 
                        !project.isCompleted ? <NavigationItem 
                            togglePopup={togglePopup}
                            icon={
                            <Circle color={project.color} />
                           }      
                            key={project.id} 
                            id={project.id}
                            itemName={project.text}    
                            hours={0}
                            noItems={0}
                        /> : null
                    )
                }
                <ProjectButton onClick={toggleProjectModal}>
                    <AiOutlinePlus />
                    <ButtonDesc>
                        Add Project
                    </ButtonDesc>
                </ProjectButton>

            </ProjectsNav> : null)
}

export const Sidebar = ({togglePopup, toggleProjectModal}) => {
    const projects = useSelector(selectProjects);
    // Hours and number of todos have to be calculated dynamically
    // Add it later after making sure everything is in place
    return (
        <SidebarContainer>
            <ChronoNav>
                <NavigationItem icon={
                    <ItemIcon color="#44a336">
                        {<BiSun />}
                    </ItemIcon>
                } itemName="Today" hours={2} noItems={1}/>
                 <NavigationItem icon={
                    <ItemIcon color="#e0881b">
                        {<WiSunset />}
                    </ItemIcon>
                } itemName="Tomorrow" hours={0} noItems={0}/>
                 <NavigationItem icon={
                    <ItemIcon color={Colors.themeBlue}>
                        {<RiCalendarCheckLine />}
                    </ItemIcon>
                } itemName="Upcoming" hours={0} noItems={0}/>
            </ChronoNav>
            <Projects projects={projects} togglePopup={togglePopup} 
            toggleProjectModal={toggleProjectModal}/>
        </SidebarContainer>
    )
}

export default Sidebar;
