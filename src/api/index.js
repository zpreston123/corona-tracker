import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchInitialCountryData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
	} catch (error) {
		return error;
	}
}

export const fetchInitialStateData = async () => {
	try {
		let stateData = [];
		let currentDate = new Date();
		let yesterday = currentDate.setDate(currentDate.getDate() - 1);

		for (let date = new Date('1/22/2020'); date <= yesterday; date.setDate(date.getDate() + 1)) {
			let reportDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
			let { data } = await axios.get(`${url}/daily/${reportDate}`);
			let confirmedTotal = data
				.filter((item) => item.countryRegion === 'US' && item.confirmed !== '')
				.map((item) => parseInt(item.confirmed))
				.reduce((total, current) => total + current, 0);
			let deathTotal = data
				.filter((item) => item.countryRegion === 'US' && item.deaths !== '')
				.map((item) => parseInt(item.deaths))
				.reduce((total, current) => total + current, 0);

			stateData.push({ confirmed: confirmedTotal, deaths: deathTotal, date: reportDate });
		}

		return stateData;
	} catch (error) {
		return error;
	}
}

export const fetchCountryData = async (country) => {
	let changeableUrl = url;

	if (country) {
		changeableUrl = `${url}/countries/${country}`;
	}

	try {
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		return error;
	}
}

export const fetchStateData = async (state) => {
	try {
		let stateData = [];
		let currentDate = new Date();
		let yesterday = currentDate.setDate(currentDate.getDate() - 1);

		if (state) {
			for (let date = new Date('1/22/2020'); date <= yesterday; date.setDate(date.getDate() + 1)) {
				let reportDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
				let { data } = await axios.get(`${url}/daily/${reportDate}`);
				let confirmedTotal = data
					.filter((item) => item.provinceState === state && item.confirmed !== '')
					.map((item) => parseInt(item.confirmed))
					.reduce((total, current) => total + current, 0);
				let deathTotal = data
					.filter((item) => item.provinceState === state && item.deaths !== '')
					.map((item) => parseInt(item.deaths))
					.reduce((total, current) => total + current, 0);

				stateData.push({ confirmed: confirmedTotal, deaths: deathTotal, date: reportDate });
			}
		}

		return stateData;
	} catch (error) {
		return error;
	}
}

export const fetchCountries = async () => {
	try {
		const { data: { countries }} = await axios.get(`${url}/countries`);

		return countries.map((country) => country.name);
	} catch (error) {
		return error;
	}
}

export const fetchStates = async () => {
	try {
		const usaConfirmed = await axios.get(`${url}/countries/USA/confirmed`);
		const usaDeaths = await axios.get(`${url}/countries/USA/deaths`);
		const usaConfirmedStates = usaConfirmed.data
			.filter((item) => !item.provinceState.match(/(Diamond Princess|Grand Princess)/))
			.map((item) => item.provinceState);
		const usaDeathStates = usaDeaths.data
			.filter((item) => !item.provinceState.match(/(Diamond Princess|Grand Princess)/))
			.map((item) => item.provinceState);

		return [...new Set([...usaConfirmedStates, ...usaDeathStates])].sort();
	} catch (error) {
		return error;
	}
}
