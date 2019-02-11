import React from 'react'

function RoomRightHeader(props) {
    const styles = {
        div: {
            fontSize: 15,
            color: props.colorStatus
        }
    }

    return (
        <span style={styles.div}> (Status) </span>
    );
}

RoomRightHeader.componentName = 'RoomRightHeader'

export default RoomRightHeader;