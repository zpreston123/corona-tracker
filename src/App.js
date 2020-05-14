import React from 'react';

import { Cards, GlobalChart, USChart, CountryPicker, StatePicker } from './components';
import styles from './App.module.css';
import { fetchCountryData, fetchStateData } from './api';
import { defaults } from 'react-chartjs-2';

import image from './images/image.png';

defaults.global.maintainAspectRatio = false;

class App extends React.Component {
	state = {
		countryData: {},
		stateData: {},
		country: '',
		state: ''
	}

	async componentDidMount() {
		const fetchedCountryData = await fetchCountryData();
		const fetchedStateData = await fetchStateData();

		this.setState({ countryData: fetchedCountryData, stateData: fetchedStateData });
	}

	handleCountryChange = async (country) => {
		const fetchedCountryData = await fetchCountryData(country);

		window.scrollTo(0, 0);

		this.setState({ countryData: fetchedCountryData, country: country });
	}

	handleStateChange = async (state) => {
		const fetchedStateData = await fetchStateData(state);

		this.setState({ stateData: fetchedStateData, state: state });
	}

	render() {
		const { countryData, stateData, country, state } = this.state;

		return (
			<div className={styles.container}>
				<img className={styles.image} src={image} alt="COVID-19"/>
				<h1>{!country ? 'Global' : country}</h1>
				<Cards data={countryData}/>
				<CountryPicker handleCountryChange={this.handleCountryChange}/>
				<GlobalChart data={countryData} country={country}/>
				<h1>{!state ? 'US States / Territories' : state}</h1>
				<StatePicker handleStateChange={this.handleStateChange}/>
				<USChart data={stateData} state={state}/>
			</div>
		)
	}
}

export default App;
