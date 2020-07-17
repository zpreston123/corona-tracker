import axios from 'axios';
import _ from 'lodash';

const url = 'https://covid19.mathdro.id/api';

export const fetchInitialCountryData = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);

		return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
	} catch (error) {
		return error;
	}
}

export const fetchCountryData = async (country) => {
	let changeableUrl = !country ? url : `${url}/countries/${country}`;

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

		for (let date = new Date('1/22/2020'); date <= yesterday; date.setDate(date.getDate() + 1)) {
			let reportDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
			let { data } = await axios.get(`${url}/daily/${reportDate}`);
			let confirmedTotal = data
				.filter((item) => {
					let firstCondition = (state) ? item.provinceState === state : item.countryRegion === 'US';
					return firstCondition && item.confirmed !== '';
				})
				.map((item) => parseInt(item.confirmed))
				.reduce((total, current) => total + current, 0);
			let deathTotal = data
				.filter((item) => {
					let firstCondition = (state) ? item.provinceState === state : item.countryRegion === 'US';
					return firstCondition && item.deaths !== '';
				})
				.map((item) => parseInt(item.deaths))
				.reduce((total, current) => total + current, 0);

			stateData.push({ confirmed: confirmedTotal, deaths: deathTotal, date: reportDate });
		}

		return stateData;
	} catch (error) {
		return error;
	}
}

export const fetchTopConfirmedStates = async () => {
	try {
		let { data } = await axios.get(`${url}/countries/USA/confirmed`);

		return _(data)
			.groupBy('provinceState')
			.map((array, key) => ({ 'state': key, 'total': _.sumBy(array, 'confirmed') }))
			.sort((item1, item2) => item2.total - item1.total)
			.slice(0, 10)
			.value();
	} catch (error) {
		return error;
	}
}

export const fetchTopDeathStates = async () => {
	try {
		let { data } = await axios.get(`${url}/countries/USA/deaths`);

		return _(data)
			.groupBy('provinceState')
			.map((array, key) => ({ 'state': key, 'total': _.sumBy(array, 'deaths') }))
			.sort((item1, item2) => item2.total - item1.total)
			.slice(0, 10)
			.value();
	} catch (error) {
		return error;
	}
}

export const fetchCountyData = async (county, state) => {
	try {
		let { data } = await axios.get(`${url}/countries/USA/confirmed`);

		let { confirmed, deaths } = data
			.filter(({ provinceState, admin2 }) => provinceState === state && admin2 === county)
			.reduce(({ confirmed, deaths }) => ({ confirmed: confirmed, deaths: deaths }));

		return { confirmed: confirmed, deaths: deaths };
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
		const { data } = await axios.get(`${url}/countries/USA/confirmed`);

		return _(data)
			.filter((item) => !item.provinceState.match(/(Diamond Princess|Grand Princess)/))
			.map('provinceState')
			.uniq()
			.sort()
			.value();
	} catch (error) {
		return error;
	}
}

export const fetchCountiesByState = async (state) => {
	try {
		const { data } = await axios.get(`${url}/countries/USA/confirmed`);

		return _(data)
			.filter(({ provinceState, admin2 }) => !provinceState.match(/(Diamond Princess|Grand Princess)/) && provinceState === state && admin2 !== 'Unassigned')
			.map('admin2')
			.uniq()
			.sort()
			.value();
	} catch (error) {
		return error;
	}
}
