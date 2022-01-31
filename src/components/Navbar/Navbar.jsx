import React from 'react';
import { AppBar, Toolbar, Grid, Tooltip, IconButton } from '@mui/material';
import Brightness2 from '@mui/icons-material/Brightness2';
import Brightness5 from '@mui/icons-material/Brightness5';

import image from '../../images/image.png';

const Navbar = ({ darkTheme, setDarkTheme }) => {
    return (
        <AppBar position="sticky" color="inherit">
            <Toolbar>
                <Grid justifyContent="space-between" alignItems="center" container>
                    <Grid item>
                        <img style={{ maxWidth: '160px' }} src={image} alt="COVID-19" />
                    </Grid>
                    <Grid item>
                        <Tooltip title={darkTheme ? 'Toggle light theme' : 'Toggle dark theme'}>
                            <IconButton aria-label="delete" onClick={() => setDarkTheme(!darkTheme)} size="large">
                                {darkTheme ? <Brightness5 /> : <Brightness2 />}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
