import React, { useContext, useState } from 'react'
import { ContextSongList } from '../App';
import { v4 as uuidv4 } from 'uuid'

export default function SongAddForm() {
    const { handleAdd } = useContext(ContextSongList);
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [rating, setRating] = useState(5);
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
        <form
            onSubmit={e => {
                handleAdd(e, artist, song, rating, uuidv4());
                e.target.reset();
            }}
        >
            <label htmlFor='artist'>Artist:</label>
            <input
                required
                type='text'
                id='artist'
                onChange={e => setArtist(e.target.value)} />
            <label htmlFor='song'>Song:</label>
            <input
                required
                type='text'
                id='song'
                onChange={e => setSong(e.target.value)} />
            <label>Rating:</label>
            <div className='rating-container'>
                <input
                    type='button'
                    value='-'
                    onClick={() => handleMinusRating()} />
                <span>{rating}</span>
                <input
                    type='button'
                    value='+'
                    onClick={() => handlePlusRating()} />
            </div>
            <input
                type='submit'
                value='Add'
            />
        </form>
    )
}
