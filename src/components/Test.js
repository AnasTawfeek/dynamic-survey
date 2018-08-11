import React from 'react';

export default ({text, add}) => (
    <div>
        Text: {text}
        <button onClick={() => add()}>Add</button>
    </div>
)
