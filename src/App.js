import React, { useState, useEffect } from 'react';
import {
	Cards, GlobalChart, UsaStateChart,
	CountryPicker, UsaStatePicker, StatesTable
} from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchUsaStateData, fetchTopConfirmedStates, fetchTopDeathStates } from './api';
import convertState from './api/convertState';
import { defaults } from 'react-chartjs-2';
import { AppBar, Box, Toolbar, Tooltip, Grid, IconButton, ThemeProvider, createMuiTheme, Divider, CssBaseline, Typography, Link } from '@material-ui/core';
import { Brightness2, Brightness5 } from '@material-ui/icons';
import image from './images/image.png';

defaults.global.maintainAspectRatio = false;

const App = () => {
	const [countryData, setCountryData] = useState({});
	const [usaStateData, setUsaStateData] = useState({});
	const [topConfirmedStateData, setTopConfirmedStateData] = useState({});
	const [topDeathStateData, setTopDeathStateData] = useState({});

	const [country, setCountry] = useState();
	const [usaState, setUsaState] = useState();

	const [darkMode, setDarkMode] = useState(false);
	const theme = createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light'
		}
	});

	useEffect(() => {
		async function loadData() {
			const countryData = await fetchCountryData();
			setCountryData(countryData);

			const usaStateData = await fetchUsaStateData();
			setUsaStateData(usaStateData);

			const topConfirmedStates = await fetchTopConfirmedStates();
			setTopConfirmedStateData(topConfirmedStates);

			const topDeathStates = await fetchTopDeathStates();
			setTopDeathStateData(topDeathStates);
		}
		loadData();
	}, []);

	const handleCountryChange = async (country) => {
		const countryData = await fetchCountryData(country);

		window.scrollTo(0, 0);

		setCountryData(countryData);
		setCountry(country);
	}

	const handleUsaStateChange = async (state) => {
		const usaStateData = await fetchUsaStateData(state);

		setUsaStateData(usaStateData);
		setUsaState(state);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<AppBar position="sticky" color="inherit">
				<Toolbar>
					<Grid justify="space-between" alignItems="center" container>
						<Grid item>
							<img className={styles.image} src={image} alt="COVID-19"/>
						</Grid>
						<Grid item>
							<Tooltip title={darkMode ? 'Toggle light theme' : 'Toggle dark theme'}>
								<IconButton aria-label="delete" onClick={() => setDarkMode(!darkMode)}>
									{darkMode ? <Brightness5/> : <Brightness2/>}
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<div className={styles.container}>
				<Box paddingTop={6}>
					<Typography variant="h3" pt={3} gutterBottom>{country}</Typography>
				</Box>
				{!countryData ? null : <Cards data={countryData}/>}
				<CountryPicker handleCountryChange={handleCountryChange}/>
				{!countryData ? null : <GlobalChart data={countryData} country={country}/>}
				<Divider className={styles.divider}/>
				<Box paddingTop={6}>
			        <Typography variant="h4" component="h2" gutterBottom>{!usaState ? '' : convertState(usaState)}</Typography>
				</Box>
				<UsaStatePicker handleUsaStateChange={handleUsaStateChange}/>
				{!usaStateData || !usaState ? null : <UsaStateChart data={usaStateData} usaState={usaState}/>}
				<br/>
				<Typography gutterBottom variant="h5" component="h2">Most Confirmed Cases</Typography>
				{!topConfirmedStateData ? null : <StatesTable data={topConfirmedStateData}/>}
		        <Typography gutterBottom variant="h5" component="h2">Most Deaths</Typography>
				{!topDeathStateData ? null : <StatesTable data={topDeathStateData}/>}
			</div>
			<div className={styles.footer}>
				<Typography variant="body1" component="h2">
					US data sourced from <Link href="https://covidtracking.com/">COVID Tracking Project</Link>.<br/>
					Global data sourced from <Link href="https://coronavirus.jhu.edu/">John Hopkins University CSSE</Link>.
				</Typography>
			</div>
		</ThemeProvider>
	);
}

export default App;
