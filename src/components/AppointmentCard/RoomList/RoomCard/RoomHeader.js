import React from 'react'
import { Grid } from '@material-ui/core/'

function RoomHeader(props) {

    const leftSide = props.children.find(child => child.type.componentName === 'RoomLeftHeader')
    const rightSide = props.children.find(child => child.type.componentName === 'RoomRightHeader')

    return (
        <Grid container justify='space-between' alignItems='center' style={{ height: 50, padding: 25 }}>
            {leftSide}
            {rightSide}
        </Grid>
    );
}

RoomHeader.componentName = 'RoomHeader'

export default RoomHeader;