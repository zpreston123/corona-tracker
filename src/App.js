import React, { useState, useEffect } from 'react';
import { Cards, GlobalChart, USChart, CountryPicker, StatePicker } from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchStateData } from './api';
import { defaults } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
import image from './images/image.png';

defaults.global.maintainAspectRatio = false;

const App = () => {
	const [countryData, setCountryData] = useState({});
	const [stateData, setStateData] = useState({});
	const [country, setCountry] = useState();
	const [state, setState] = useState();
	const [countryDataLoaded, setCountryDataLoaded] = useState(false);
	const [stateDataLoaded, setStateDataLoaded] = useState(false);

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

	return (
		<div className={styles.container}>
			<img className={styles.image} src={image} alt="COVID-19"/>
			<h1>{!country ? 'Global' : country}</h1>
			<Cards data={countryData}/>
			<CountryPicker handleCountryChange={handleCountryChange}/>
			{countryDataLoaded ? <GlobalChart data={countryData} country={country}/> : <CircularProgress/>}
			<h1>{!state ? 'US States / Territories' : state}</h1>
			<StatePicker handleStateChange={handleStateChange}/>
			{stateDataLoaded ? <USChart data={stateData} state={state}/> : <CircularProgress/>}
		</div>
	);
}

export default App;
