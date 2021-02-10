import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';

// const initialState = {
//     status: 'idle',
//     entities: {
//         1: {id: 1, text: 'Databases', color: Colors.navyBlue, isCompleted: false},
//         2: {id: 2, text: 'Theory Of Computation', color: Colors.lightdarkpurple, isCompleted: false}
//     },
//     error: false
// };

const projectsAdapter = createEntityAdapter();

const initialState = projectsAdapter.getInitialState({
    status: 'idle',
    error: false
});

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        projectAdded : {
            reducer(state ,action){
                const project = action.payload;
                projectsAdapter.addOne(state, project)
            },
            
            prepare(id, text, color, isCompleted = false){
                return {
                    payload: {id, text, color, isCompleted}
                };
            }
        },
        projectDeleted(state ,action){
            const id = action.payload;
            projectsAdapter.removeOne(state, id);
        },
        changeColor : {
            reducer(state, action){
                const {projectId, color} = action.payload;
                if(state.entities[projectId])
                    state.entities[projectId].color = color;
            },
            prepare(projectId, color){
                return {
                    payload: {projectId, color}
                };
            }
        },
        changeName: {
            reducer(state, action){
                const {projectId, name} = action.payload;
                state.entities[projectId].text = name;
            },
            prepare(projectId, name){
                return{
                    payload: {projectId, name}
                };
            }
        },
        projectCompleted(state, action){
            if(state.entities[action.payload])
                state.entities[action.payload].isCompleted = true;
        }
    }
});


export const {projectAdded, projectDeleted, changeColor , projectCompleted, changeName} = projectSlice.actions;

export const {
    selectAll: selectProjects,
    selectById: selectProjectById,
    selectTotal: selectTotalProjects,
    selectIds: selectProjectIds
} = projectsAdapter.getSelectors(state => state.projects);

export default projectSlice.reducer;


export const Colors = {
    gray : '#dbdbdb',
    navyBlue: '#203d69',
    skyblue: '#37c8f0',
    lightorange: '#f0a843',
    darkpurple: '#4f0961',
    purple: '#c22f58',
    yellow: '#e6cc29',
    forestgreen: '#77ad4b',
    blush: '#c76d7b',
    lightdarkpurple: '#765ca1',
    lightmarine: '#89f5d8',
    darkmarine: '#58d1b1',
    strongpurple: '#6f319e',
    lightnavyblue: '#3d6ddb',
    pink: '#ed53d9',
    sunsetorange: '#f06343',
    gloomygray: '#9c9998',
    lightbrown: '#a1847a',
    darkaquamarine: '#2d8a70',
    nuancedblack: '#414242'
};