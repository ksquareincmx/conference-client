import React from 'react'
import { Grid } from '@material-ui/core/';


function Header() {

  const styles = {
    header: {
      backgroundColor: '#DEE8F5',
      color: '#4A90E2',
      fontSize: 20,
      height: 50,
      fontFamily: 'roboto',
      fontWeight: 'bold',
      paddingTop: 20
    }
  };
  return (
    <header style={styles.header} >
      <Grid container justify='space-between'>
        <Grid item xs={5} container>
          <span style={{ color: 'black', paddingLeft: 50 }}>Appooiments made!</span>
        </Grid>
        <Grid item xs={6} container>
          <span style={{ color: 'black' }}>Conference Status</span>
        </Grid>
      </Grid>
    </header>
  )
}


export default Header