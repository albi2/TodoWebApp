import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    entities: {

    },
    error: false
};

const sessionSlice = createSlice({
    name: 'sessions', 
    initialState,
    reducers: {
        sessionAdded: {
            reducer(state, action){
                const session = action.payload;
                state.entities[session.id] = session;
            },
            prepare(id, subject, coordinates, studyPlace, ){
                return {
                    payload: {id, subject, coordinates , studyPlace}
                }
            }
        },
        sessionDeleted(state, action){
            delete state.entities[action.payload];
        }
    }
});

export const { sessionAdded, sessionDeleted} = sessionSlice.actions;

export default sessionSlice.reducer;