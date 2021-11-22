import React, { useState, useEffect, useContext } from 'react'
import { ContextSongList } from '../App';

export default function SongEditForm({ editedSong }) {
    const { handleEdit } = useContext(ContextSongList)
    const [rating, setRating] = useState('');
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    useEffect(() => {
        setRating(editedSong.rating)
        setArtist(editedSong.artist)
        setSong(editedSong.song)
    }, [editedSong])
    const handlePlusRating = () => {
        if (rating < 10) {
            setRating(prev => prev + 1);
        }
    }
    const handleMinusRating = () => {
        if (rating > 0) {
            setRating(prev => prev - 1);
        }
    }
    return (
        <div className="form-edit-container">
            <form
                onSubmit={e => {
                    handleEdit(e, artist, song, rating, editedSong.id);
                    document.querySelector('.form-edit-container').classList.remove('show');
                }}
            >
                    <label htmlFor='artist'>Artist:</label>
                    <input
                        required
                        type='text'
                        id='artist'
                        value={artist || ''}
                        onChange={e => setArtist(e.target.value)}
                    />
                    <label htmlFor='song'>Song:</label>
                    <input
                        required
                        type='text'
                        id='song'
                        value={song || ''}
                        onChange={e => setSong(e.target.value)}
                    />
                <label className='rating-label'>Rating:</label>
                <div className='rating-container'>
                    <input
                        type='button'
                        value='-'
                        onClick={() => handleMinusRating()}
                    />
                    <span>{rating}</span>
                    <input
                        type='button'
                        value='+'
                        onClick={() => handlePlusRating()}
                    />
                </div>
                <input
                    type='submit'
                    value='Edit'
                />
            </form>
        </div>
    )
}
