import { createSlice, createSelector,  createEntityAdapter, current} from '@reduxjs/toolkit';
import { selectProjects } from '../projects/projectsSlice.js';
// const initialState = {
//     status: 'idle',
//     entities: {
//         1: {id: 1, text: 'Finish Homework' , project: 'Databases', completed: false,
//             dueDate: new Date().toISOString(), workingOn: false, priority: 1,
//             pomodoros: 4 },
//         2: {id: 2, text: 'Finish Project' , project: 'Theory Of Computation', completed: false,
//         dueDate: new Date().toISOString(), workingOn: false, priority: 2,
//         pomodoros: 3 }
//     },
//     error: false
// };

// can pass ordering function that takes each of the objects
// The state is of the form { id: [], entities: []}
const todosAdapter = createEntityAdapter();
const initialState = todosAdapter.getInitialState({
    status: 'idle',
    error: false
})

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: {
            reducer(state, action){
                const todo = action.payload;
                todosAdapter.addOne(state, todo);
            },
            prepare(id , text, project , completed = false, 
                dueDate = new Date(), workingOn = false, priority = 1, pomodoros = 0, type = 'Today'){
                    return {
                        payload: {id, text,  project , completed, dueDate,
                        workingOn, priority, pomodoros,type}
                    };
                }
        },
        todoToggled(state, action){
        const id = action.payload;
        const todo = current(state).entities[id];
        if(state.entities[id])
            state.entities[id].completed = !todo.completed;
        },
        projectSelected(state, action){
            const { id , project} = action.payload;
            if(state.entities[id])
                state.entities[id].project = project;
        },
        todoDeleted(state, action){
            todosAdapter.removeOne(state, action.payload);
        },
        todoSetDate(state, action){
            const {id ,date} = action.payload;
            if(state.entities[id])
                state.entities[id].dueDate = date;
        }
    }
});


export const  { todoAdded, 
                todoToggled, 
                projectSelected,
                todoDeleted, 
                todoSetDate, 
                todosLoading} = todosSlice.actions;
    
export const {
    selectAll: selectTodos,
    selectById: selectTodoById,
    selectTotal: selectTotalTodos,
    selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => state.todos);

export const nextId = createSelector(
    state => state.todos,
    todos => {
        const todoArr = Object.values(todos.entities);

        return (todoArr.length === 0 ? 0 : todoArr.reduce(
        (max,todo) => {
            return todo.id > max ? todo.id : max;
        }
        ,-1))}
        
)

export const selectTasksOnType = (type, completed) => {
    return createSelector(
        [selectTodos, selectProjects],
        (todos,projects) => {
            const isProject = (type !== 'Today' && type !== 'Tomorrow' && type !== 'Upcoming');

            if(isProject){
                const projectId = Object.values(projects).find(project => project.text === type)?.id;
                return todos.filter(todo => todo.project === projectId && todo.completed === completed);
            }

            return todos.filter(todo => todo.type === type && todo.completed === completed);
        }
    )
}

export default todosSlice.reducer;