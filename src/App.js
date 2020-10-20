import React, { useState, useEffect } from 'react';
import {
	Cards, GlobalChart, StateChart, CountyChart,
	CountryPicker, StatePicker, CountyPicker,
	MostConfirmedStatesTable, MostDeathStatesTable
} from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchStateData, fetchCountyData, fetchTopConfirmedStates, fetchTopDeathStates } from './api';
import { defaults } from 'react-chartjs-2';
import {
	CircularProgress, Switch, ThemeProvider, createMuiTheme, Divider,
	CssBaseline, FormControl, FormGroup, FormControlLabel, Grid, Typography, Link
} from '@material-ui/core';
import image from './images/image.png';

defaults.global.maintainAspectRatio = false;

const App = () => {
	const [countryData, setCountryData] = useState({});
	const [stateData, setStateData] = useState({});
	const [countyData, setCountyData] = useState({});
	const [topConfirmedStateData, setTopConfirmedStateData] = useState({});
	const [topDeathStateData, setTopDeathStateData] = useState({});

	const [country, setCountry] = useState();
	const [state, setState] = useState();
	const [county, setCounty] = useState();

	const [countryDataLoaded, setCountryDataLoaded] = useState(false);
	const [stateDataLoaded, setStateDataLoaded] = useState(false);
	const [topConfirmedStateDataLoaded, setTopConfirmedStateDataLoaded] = useState(false);
	const [topDeathStateDataLoaded, setTopDeathStateDataLoaded] = useState(false);
	const [countyDataLoaded, setCountyDataLoaded] = useState(false);

	const [darkMode, setDarkMode] = useState(false);
	const theme = createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light'
		}
	});

	useEffect(() => {
		async function loadData() {
			const countryData = await fetchCountryData();
			setCountryDataLoaded(true);
			setCountryData(countryData);

			const stateData = await fetchStateData();
			setStateDataLoaded(true);
			setStateData(stateData);

			const topConfirmedStates = await fetchTopConfirmedStates();
			setTopConfirmedStateDataLoaded(true);
			setTopConfirmedStateData(topConfirmedStates);

			const topDeathStates = await fetchTopDeathStates();
			setTopDeathStateDataLoaded(true);
			setTopDeathStateData(topDeathStates);
		}
		loadData();
	}, []);

	const handleCountryChange = async (country) => {
		setCountryDataLoaded(false);

		const countryData = await fetchCountryData(country);

		window.scrollTo(0, 0);

		setCountryDataLoaded(true);
		setCountryData(countryData);
		setCountry(country);
	}

	const handleStateChange = async (state) => {
		setStateDataLoaded(false);

		const stateData = await fetchStateData(state);

		setStateDataLoaded(true);
		setStateData(stateData);
		setState(state);
	}

	const handleCountyChange = async (county, state) => {
		setCountyDataLoaded(false);

		const countyData = await fetchCountyData(county, state);

		setCountyDataLoaded(true);
		setCountyData(countyData);
		setCounty(county);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<div className={styles.container}>
				<Grid container alignItems="flex-start" justify="flex-end" direction="row">
					<FormControl component="fieldset">
						<FormGroup>
							<FormControlLabel
								control={<Switch onChange={() => setDarkMode(!darkMode)}/>}
								label="Dark"
								labelPlacement="start"
							/>
						</FormGroup>
					</FormControl>
				</Grid>
				<img className={styles.image} src={image} alt="COVID-19"/>
				{!country ? null : <Typography variant="h3" gutterBottom>{country}</Typography>}
				{!countryDataLoaded
					? <CircularProgress/>
					: <Cards data={countryData}/>
				}
				<CountryPicker handleCountryChange={handleCountryChange}/>
				{!countryDataLoaded
					? <CircularProgress/>
					: <GlobalChart data={countryData} country={country}/>
				}
				<Divider className={styles.divider}/><br/>
		        <Typography gutterBottom variant="h4" component="h2">{!state ? 'US States / Territories' : state}</Typography>
				<StatePicker handleStateChange={handleStateChange}/>
				{!stateDataLoaded || !state
					? null
					: <CountyPicker state={state} handleCountyChange={handleCountyChange}/>
				}
				{!stateDataLoaded || !state
					? null
					: <StateChart data={stateData} state={state}/>
				}
				{!countyDataLoaded || !stateDataLoaded || !county
					? null
					: <CountyChart data={countyData} county={county}/>
				}<br/>
		        <Typography gutterBottom variant="h5" component="h2">States with Most Confirmed Cases</Typography>
				{!topConfirmedStateDataLoaded
					? <CircularProgress/>
					: <MostConfirmedStatesTable data={topConfirmedStateData}/>}
		        <Typography gutterBottom variant="h5" component="h2">States with Most Deaths</Typography>
				{!topDeathStateDataLoaded
					? <CircularProgress/>
					: <MostDeathStatesTable data={topDeathStateData}/>}
			</div>
			<div className={styles.footer}>
				<Typography variant="body1" component="h2">
					Daily US data sourced from <Link href="https://covidtracking.com/">COVID Tracking Project</Link> via JSON API.<br/>
					Global and state data sourced from <Link href="https://coronavirus.jhu.edu/">John Hopkins University CSSE</Link> via JSON API.
				</Typography>
			</div>
		</ThemeProvider>
	);
}

export default App;
