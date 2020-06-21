import React, { useState, useEffect } from 'react';
import {
	Cards, GlobalChart, StateChart, CountyChart,
	CountryPicker, StatePicker, CountyPicker
} from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchStateData, fetchCountyData } from './api';
import { defaults } from 'react-chartjs-2';
import {
	CircularProgress, Switch, ThemeProvider, createMuiTheme, Divider,
	CssBaseline, FormControl, FormGroup, FormControlLabel, Grid
} from '@material-ui/core';
import image from './images/image.png';

defaults.global.maintainAspectRatio = false;

const App = () => {
	const [countryData, setCountryData] = useState({});
	const [stateData, setStateData] = useState({});
	const [countyData, setCountyData] = useState({});

	const [country, setCountry] = useState();
	const [state, setState] = useState();
	const [county, setCounty] = useState();

	const [countryDataLoaded, setCountryDataLoaded] = useState(false);
	const [stateDataLoaded, setStateDataLoaded] = useState(false);
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
				<h1>{!country ? 'Global' : country}</h1>
				{!countryDataLoaded
					? <CircularProgress/>
					: <Cards data={countryData}/>
				}
				<CountryPicker handleCountryChange={handleCountryChange}/>
				{!countryDataLoaded
					? <CircularProgress/>
					: <GlobalChart data={countryData} country={country}/>
				}
				<Divider className={styles.divider}/>
				<h1>{!state ? 'US States / Territories' : state}</h1>
				<StatePicker handleStateChange={handleStateChange}/>
				{!stateDataLoaded || !state
					? null
					: <CountyPicker state={state} handleCountyChange={handleCountyChange}/>
				}
				{!stateDataLoaded
					? <CircularProgress/>
					: <StateChart data={stateData} state={state}/>
				}
				{!countyDataLoaded || !stateDataLoaded || !county
					? null
					: <CountyChart data={countyData} county={county}/>
				}
				<p className={styles.footer}>
					Data sourced from John Hopkins University<br/>
					CSSE via JSON API<br/><br/>
					coronavirus.jhu.edu/map.html
				</p>
			</div>
		</ThemeProvider>
	);
}

export default App;
