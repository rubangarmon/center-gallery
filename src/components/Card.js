import React from 'react'

function Card(props) {
    return (
        <div style={{
            ...styles.card, 
            backgroundColor: props.color,
            left: `${props.x}px`,
            top: `${props.y}px`,
            zIndex: props.zIndex,
            transform: `translate(-50%, -50%) scale(${props.scale})`
        }}>
            
        </div>
    )
}

const styles = {
    card: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '200px',
        width: '300px',
        border: '2px solid black',
        boxSizing: 'border-box',
        backgroundColor: 'red'
    }
}

export default Card
