import React from 'react';
import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    entities: {
        1: {id: 1, text: 'Finish Homework' , project: 'Databases', completed: false,
            dueDate: new Date().toISOString(), workingOn: false, priority: 1,
            pomodoros: 4 },
        2: {id: 2, text: 'Finish Project' , project: 'Theory Of Computation', completed: false,
        dueDate: new Date().toISOString(), workingOn: false, priority: 2,
        pomodoros: 3 }
    },
    error: false
};


// The reducer
// export function todoReducer(state = initialState, action){
//     switch(action.type){
//         case ActionTypes.TODO_ADDED:
//             return {
//                 ...state,
//                 entities: [
//                     ...state.entities,
//                     action.payload
//                 ]
//             }   
//         case ActionTypes.TODO_TOGGLED:
//             ...
//         default:
//             return state;
//     }
// }

// Async logic manually
// What is returned from here is returned as a promise whenever we dispatch
// the function through the thunk
// We can wait for it outside
//     export async function fetchTodos(useSate, dispatch) {
//         const response = await fetch()...
//         //Dispatch some action that loads your response
//          dispatch(...action for loading with the response as baggage)
//          Return the response as  promise so that we can actually write
//          Async function outside who can wait for the process to happen
//          Whatever this function returns is what the thunk returns
//          return response:
//     }


// Since when dispatching this function we get a promise
// We can write async/await logic to await the dispatch to finish
// if we need to
// export function saveTodo(text){
//     return new async function(dispatch, getState){
//         const response = await POST logic;
//         dispatch(actionSavingNewState);
//         return response:
//     }
// }


// Async logic with createAsyncThunk
// createAsyncThunk creates a thunk function for us which we can dispatch, and it automatically
// dispatches the action creators for us
// It takes as parameters a string(the name of the action type) and also a callback function,
// which produces the response.This function must return a promise and that is why usually its
// an async await function.This function is called with the dispatch
// Read more in the redux toolkit API to understand how to access useState and dispatch
// inside this function
// return an error in the case the API call fails
// the action creator are three
// loadTodos.pending/fulfilled/rejected
// Can also pass arguments to the async function, which are passed to the action creator when called
// Reducer "subscribes" to the promise returned by the async callback
// You can await these thunk functions after they are dispatched
// Also you can catch their errors since they can return errors in case of failure
// export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
//     const response = await APICall;
//     // What we return will become the payload
//     return response;
// });

// export const saveTodo = ('todos/saveTodo', async initialTodo => {
//     const response = postApi(initialTodo);
//     return response/error;
// });


const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded: {
            reducer(state, action){
                const todo = action.payload;
                state.entities[todo.id] = todo;
            },
            prepare(id , text, project , completed = false, 
                dueDate = new Date(), workingOn = false, priority = 1, pomodoros = 0){
                    return {
                        payload: {id, text, project ,completed, dueDate,
                        workingOn, priority, pomodoros}
                    };
                }
        },
             todoToggled(state, action){
            const id = action.payload;
            state.entities[id].completed = !state[id].completed;
        },
        projectSelected(state, action){
            const { id , project} = action.payload;
            state.entities[id].project = project;
        },
        todoDelted(state, action){
            delete state.entities[action.payload];
        },
        todoSetDate(state, action){
            const {id ,date} = action.payload;
            state.entities[id].dueDate = date;
        }
    }
    // ,
    // extraReducers: builder =>
    // builder.addCase(loadTodos.pending, (state, aciton) => {
    //     state[status] = 'loading';
    // })
    // .addCase(loadTodos.fulfilled, (state, action) => {
    //     action.payload.forEach(todo => {
    //         state[todo.id]  = todo;
    //     });
    // })
    // .addCase(loadTodos.rejected, (state, action) => {
    //     state.status = 'idle';
    //     state.error = action.payload;
    // })
        // .addCase(saveTodo.fulfilled, (state, action) {
        //     Add the saved stuff to the state
        // })
});

export const  {todoAdded, 
    todoToggled, 
    projectSelected,
     todoDeleted, 
     todoSetDate, 
     todosLoading} = todosSlice.actions;

export default todosSlice.reducer;