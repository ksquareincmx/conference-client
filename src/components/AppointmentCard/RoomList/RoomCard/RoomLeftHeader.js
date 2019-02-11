import React from 'react'

function RoomLeftHeader(props) {
    const styles = {
        div: {
            fontSize: 15,
            fontWeight: 'bold',
            color: props.colorStatus

        }
    }

    return (
        <div style={styles.div}> {props.roomName} </div>
    );
}

RoomLeftHeader.componentName = 'RoomLeftHeader';

export default RoomLeftHeader;