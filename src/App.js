import { useState, useEffect } from 'react';

import { Cards, GlobalChart, UsaStateChart, CountryPicker, UsaStatePicker, UsaStatesTable, ScrollTop, Navbar } from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchUsaStateData, fetchMostConfirmedStates, fetchMostDeathStates } from './api';
import { defaults } from 'react-chartjs-2';
import { Box, Toolbar, ThemeProvider, createTheme, Divider, CssBaseline, Typography, Link, Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

defaults.maintainAspectRatio = false;

const App = (props) => {
	const [countryData, setCountryData] = useState({});
	const [usaStateData, setUsaStateData] = useState({});
	const [mostConfirmedStateData, setMostConfirmedStateData] = useState({});
	const [mostDeathStateData, setMostDeathStateData] = useState({});

	const [country, setCountry] = useState();
	const [usaState, setUsaState] = useState();

	const [darkTheme, setDarkTheme] = useState(false);
	const theme = createTheme({
		palette: {
			type: darkTheme ? 'dark' : 'light'
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

		setUsaStateData(usaStateData);
		setUsaState(state);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
			<Toolbar id="back-to-top-anchor" />
			<div className={styles.container}>
				<Box paddingTop={6}>
					<Typography variant="h3" pt={3} gutterBottom>{country}</Typography>
				</Box>
				{!countryData ? null : <Cards data={countryData}/>}
				<CountryPicker handleCountryChange={handleCountryChange} />
				{!countryData ? null : <GlobalChart data={countryData} country={country} />}
				<Divider className={styles.divider} />
				<Box paddingTop={6}>
			        <Typography variant="h3" pt={3} gutterBottom>{!usaState ? '' : usaState}</Typography>
				</Box>
				<UsaStatePicker handleUsaStateChange={handleUsaStateChange} />
				{!usaStateData ? null : <UsaStateChart data={usaStateData} usaState={usaState} />}
				<br/>
				<Typography gutterBottom variant="h5" component="h2">Most Confirmed Cases</Typography>
				{!mostConfirmedStateData ? null : <UsaStatesTable data={mostConfirmedStateData} />}
		        <Typography gutterBottom variant="h5" component="h2">Most Deaths</Typography>
				{!mostDeathStateData ? null : <UsaStatesTable data={mostDeathStateData} />}
			</div>
			<div className={styles.footer}>
				<Typography variant="body1" component="h2">
					US data sourced from <Link href="https://www.nytimes.com/interactive/2021/us/covid-cases.html">New York Times</Link> and <Link href="https://www.worldometers.info/coronavirus/">Worldometer</Link>.<br/>
					Global data sourced from <Link href="https://coronavirus.jhu.edu/">John Hopkins University CSSE</Link> and <Link href="https://www.worldometers.info/coronavirus/">Worldometer</Link>.
				</Typography>
			</div>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUp />
				</Fab>
			</ScrollTop>
		</ThemeProvider>
	);
};

export default App;
