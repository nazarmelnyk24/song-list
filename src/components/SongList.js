import React, { useContext, useState } from 'react'
import { ContextSongList } from '../App';
import { ACTIONS } from '../App'
import SongEditForm from './SongEditForm';

export default function SongList() {
    const { state, dispatch } = useContext(ContextSongList)
    const [editedSong, setEditedSong] = useState('')
    return (
        <div className='song-list-container'>
            <h2 className='song-list-title'>Song List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Song</th>
                        <th>Rating</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {state.map(song => {
                        return (
                            <tr key={song.id}>
                                <td>{song.artist}</td>
                                <td>{song.song}</td>
                                <td>{song.rating}</td>
                                <td>
                                    <button
                                        className='btn-edit'
                                        onClick={() => {
                                            setEditedSong({ artist: song.artist, song: song.song, rating: song.rating, id: song.id });
                                            document.querySelector('.form-edit-container').classList.add('show')
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className='btn-delete'
                                        onClick={() => dispatch({ type: ACTIONS.REMOVE_SONG, payload: { id: song.id } })}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <SongEditForm editedSong={editedSong} />
        </div>
    )
}
