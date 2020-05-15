import React from 'react';
import { Cards, GlobalChart, USChart, CountryPicker, StatePicker } from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchStateData } from './api';
import { defaults } from 'react-chartjs-2';
import { CircularProgress } from '@material-ui/core';
import image from './images/image.png';

defaults.global.maintainAspectRatio = false;

class App extends React.Component {
	state = {
		countryData: {},
		stateData: {},
		country: '',
		state: '',
		countryDataLoaded: false,
		stateDataLoaded: false
	}

	async componentDidMount() {
		const fetchedCountryData = await fetchCountryData();

		this.setState({ countryData: fetchedCountryData, countryDataLoaded: true });

		const fetchedStateData = await fetchStateData();

		this.setState({ stateData: fetchedStateData, stateDataLoaded: true });
	}

	handleCountryChange = async (country) => {
		this.setState({ countryDataLoaded: false });

		const fetchedCountryData = await fetchCountryData(country);

		window.scrollTo(0, 0);

		this.setState({ countryData: fetchedCountryData, country: country, countryDataLoaded: true });
	}

	handleStateChange = async (state) => {
		this.setState({ stateDataLoaded: false });

		const fetchedStateData = await fetchStateData(state);

		this.setState({ stateData: fetchedStateData, state: state, stateDataLoaded: true });
	}

	render() {
		const { countryData, stateData, country, state, countryDataLoaded, stateDataLoaded } = this.state;

		return (
			<div className={styles.container}>
				<img className={styles.image} src={image} alt="COVID-19"/>
				<h1>{!country ? 'Global' : country}</h1>
				<Cards data={countryData}/>
				<CountryPicker handleCountryChange={this.handleCountryChange}/>
				{countryDataLoaded ? <GlobalChart data={countryData} country={country}/> : <CircularProgress/>}
				<h1>{!state ? 'US States / Territories' : state}</h1>
				<StatePicker handleStateChange={this.handleStateChange}/>
				{stateDataLoaded ? <USChart data={stateData} state={state}/> : <CircularProgress/>}
			</div>
		)
	}
}

export default App;
