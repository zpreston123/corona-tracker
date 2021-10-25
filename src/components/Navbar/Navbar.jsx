import React from 'react';
import { AppBar, Toolbar, Grid, Tooltip, IconButton } from '@material-ui/core';
import { Brightness2, Brightness5 } from '@material-ui/icons';

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
                            <IconButton aria-label="delete" onClick={() => setDarkTheme(!darkTheme)}>
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
