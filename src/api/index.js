import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

const url = 'https://covid19.mathdro.id/api';

// export const fetchInitialCountryData = async () => {
// 	try {
// 		const { data } = await axios.get(`${url}/daily`);

// 		return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
// 	} catch (error) {
// 		return error;
// 	}
// }

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

		return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }))
			.sort((item1, item2) => (new Date(item1.date) - new Date(item2.date)));
	} catch (error) {
		return error;
	}
}

export const fetchCountryData = async (country) => {
	const changeableUrl = !country ? url : `${url}/countries/${country}`;

	try {
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		return error;
	}
}

export const fetchStateData = async (state) => {
	try {
		if (state === "") {
			return null;
		}

		const result = [];
		const currentDate = moment(new Date('1/22/2020'));
		const yesterday = moment(new Date()).subtract(1, 'days');

		for (let date = currentDate; date.isSameOrBefore(yesterday); date.add(1, 'days')) {
			let reportDate = date.format('YYYY-MM-DD');
			let { data } = await axios.get(`${url}/daily/${reportDate}`);
			let stateData = data.filter((item) => item.provinceState === state);

			result.push({
				confirmed: _.sumBy(stateData, (item) => Number(item.confirmed)),
				deaths: _.sumBy(stateData, (item) => Number(item.deaths)),
				date: reportDate
			});
		}

		return result;
	} catch (error) {
		return error;
	}
}

export const fetchTopConfirmedStates = async () => {
	try {
		const { data } = await axios.get(`${url}/countries/USA/confirmed`);

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
		const { data } = await axios.get(`${url}/countries/USA/deaths`);

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
		const { data } = await axios.get(`${url}/countries/USA/confirmed`);
		const { confirmed, deaths } = data
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
