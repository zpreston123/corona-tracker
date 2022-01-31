import React, { useState, useEffect } from 'react';
import { Toolbar, Box, Divider, Typography, Fab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { KeyboardArrowUp } from '@mui/icons-material';

import { Cards, GlobalChart, UsaStateChart, CountryPicker, UsaStatePicker, UsaStatesTable, UsaStateVaccineTable, VaccineCandidatesTable, ScrollTop, Navbar, Footer } from './components';

import { defaults } from 'chart.js';

import { fetchCountryData, fetchUsaStateData, fetchMostConfirmedStates, fetchMostDeathStates, fetchUsaVaccineData, fetchVaccineCandidatesData } from './api';

import useStyles from './styles';

defaults.maintainAspectRatio = false;

const App = (props) => {
	const [countryData, setCountryData] = useState({});
	const [usaStateData, setUsaStateData] = useState({});
	const [mostConfirmedStateData, setMostConfirmedStateData] = useState({});
	const [mostDeathStateData, setMostDeathStateData] = useState({});
	const [usaVaccineData, setUsaVaccineData] = useState({});
	const [vaccineCandidatesData, setVaccineCandidatesData] = useState({});

	const [country, setCountry] = useState();
	const [usaState, setUsaState] = useState();

    const [darkTheme, setDarkTheme] = useState(false);
    const classes = useStyles();
    const theme = createTheme({
        palette: {
            mode: darkTheme ? 'dark' : 'light',
            background: {
                default: darkTheme ? '#303030' : '#fafafa'
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkTheme ? '#303030' : ''
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkTheme ? '#303030' : ''
                    }
                }
            },
            MuiTable: {
                styleOverrides: {
                    root: {
                        backgroundColor: darkTheme ? '#424242' : ''
                    }
                }
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: '#3f51b5'
                    }
                }
            },
            MuiFab: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#f50057',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#c51162'
                        }
                    }
                }
            }
        }
    });

	useEffect(() => {
		async function loadData() {
			const countryData = await fetchCountryData();
			setCountryData(countryData);

			const usaStateData = await fetchUsaStateData();
			setUsaStateData(usaStateData);

			const mostConfirmedStates = await fetchMostConfirmedStates();
			setMostConfirmedStateData(mostConfirmedStates);

			const mostDeathStates = await fetchMostDeathStates();
			setMostDeathStateData(mostDeathStates);

			const vaccineCandidatesData = await fetchVaccineCandidatesData();
			setVaccineCandidatesData(vaccineCandidatesData);
		}
		loadData();
	}, []);

	const handleCountryChange = async (country) => {
		const countryData = await fetchCountryData(country);

		window.scrollTo(0, 0);

		setCountryData(countryData);
		setCountry(country);
	};

	const handleUsaStateChange = async (state) => {
		const usaStateData = await fetchUsaStateData(state);
		const usaVaccineData = await fetchUsaVaccineData(state);

		setUsaStateData(usaStateData);
		setUsaVaccineData(usaVaccineData);
		setUsaState(state);
	};

	return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            <Toolbar id="back-to-top-anchor" />
            <div className={classes.container}>
                <Box paddingTop={6}>
                    <Typography variant="h3" pt={3} gutterBottom>{country}</Typography>
                </Box>
                {!countryData ? null : <Cards data={countryData} darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
                <CountryPicker handleCountryChange={handleCountryChange} />
                {!countryData ? null : <GlobalChart data={countryData} country={country} />}
                <Divider className={classes.divider} />
                <Box paddingTop={6}>
                    <Typography variant="h3" pt={3} gutterBottom>{!usaState ? '' : usaState}</Typography>
                </Box>
                <UsaStatePicker handleUsaStateChange={handleUsaStateChange} />
                {!usaStateData ? null : <UsaStateChart data={usaStateData} usaState={usaState} />}
                {!usaState || !usaVaccineData ? null : (
                    <React.Fragment>
                        <Typography gutterBottom variant="h5" component="h2">Vaccinations (as of {usaVaccineData.date})</Typography>
                        <UsaStateVaccineTable data={usaVaccineData} />
                    </React.Fragment>
                )}
                <Typography gutterBottom variant="h5" component="h2">Vaccine Candidates</Typography>
                {!vaccineCandidatesData ? null : <VaccineCandidatesTable data={vaccineCandidatesData} />}
                <Typography gutterBottom variant="h5" component="h2">Most Confirmed Cases</Typography>
                {!mostConfirmedStateData ? null : <UsaStatesTable data={mostConfirmedStateData} />}
                <Typography gutterBottom variant="h5" component="h2">Most Deaths</Typography>
                {!mostDeathStateData ? null : <UsaStatesTable data={mostDeathStateData} />}
            </div>
            <Footer />
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </ScrollTop>
        </ThemeProvider>
    );
};

export default App;
