import React, { createContext, useReducer } from 'react'
import SongAddForm from './components/SongAddForm'
import SongList from './components/SongList'

export const ContextSongList = createContext();

export const ACTIONS = {
    ADD_SONG: 'handleAdd',
    REMOVE_SONG: 'handleRemove',
    EDIT_SONG: 'handleEdit'
}

export default function App() {
    const initialList = [
        { artist: 'Metallica', song: 'Fuel', rating: 10, id: 1 },
        { artist: 'Moby', song: 'Natural Blues', rating: 10, id: 2 }
    ]

    const [state, dispatch] = useReducer(reducer, initialList)

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.ADD_SONG:
                return [...state, action.payload.newSong];
            case ACTIONS.REMOVE_SONG:
                return state.filter(song => song.id !== action.payload.id);
            case ACTIONS.EDIT_SONG:
                const newArr = [...state];
                const ind = newArr.findIndex(el => el.id === action.payload.id)
                newArr[ind] = action.payload.newSong;
                return newArr;
            default:
                return state;
        }
    }

    const handleAdd = (e, artist, song, rating, id) => {
        e.preventDefault();
        const newSong = { artist, song, rating, id }
        dispatch({ type: ACTIONS.ADD_SONG, payload: { newSong: newSong } })
    }

    const handleEdit = (e, artist, song, rating, id) => {
        e.preventDefault();
        const newSong = { artist, song, rating, id }
        dispatch({type: ACTIONS.EDIT_SONG, payload: { newSong: newSong, id: id }})
    }

    return (
        <ContextSongList.Provider value={{ state, handleAdd, handleEdit, dispatch }}>
            <SongAddForm />
            <SongList />
        </ContextSongList.Provider>
    )
}