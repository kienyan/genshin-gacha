import React from 'react'


export default function CharacterList({ character }) {
    return (
        <div>
            {character.map(c => (
                <div key={c}>{c}</div>
            ))}
        </div>
    )
}
