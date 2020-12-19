import axios from 'axios';
import moment from 'moment';
import convertState from './convertState';

const MATHDRO_URL = 'https://covid19.mathdro.id/api';
const COVID_TRACKING_URL = 'https://api.covidtracking.com/v1';

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get(`${COVID_TRACKING_URL}/us/daily.json`);

		return data
			.map(({ positive, recovered, death, date }) => ({
				confirmed: positive,
				recovered,
				deaths: death,
				date: moment(date.toString()).format('l')
			}))
			.sort((item1, item2) =>
				(new Date(item1.date) - new Date(item2.date))
			);
	} catch (error) {
		return error;
	}
}

export const fetchCountryData = async (country) => {
	const changeableUrl = !country ? MATHDRO_URL : `${MATHDRO_URL}/countries/${country}`;

	try {
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		return error;
	}
}

export const fetchUsaStateData = async (state) => {
	try {
		const { data } = await axios.get(`${COVID_TRACKING_URL}/states/${state.toLowerCase()}/daily.json`);

		return data
			.map(({ state, positive, death, date }) => ({
				state,
				confirmed: !positive ? 0 : positive,
				deaths: !death ? 0 : death,
				date: moment(date.toString()).format('l')
			})).sort((item1, item2) =>
				(new Date(item1.date) - new Date(item2.date))
			);
	} catch (error) {
		return error;
	}
}

export const fetchMostConfirmedStates = async () => {
	try {
		const { data } = await axios.get(`${COVID_TRACKING_URL}/states/current.json`);

		return data
			.map(({ state, positive }) => ({ state: convertState(state), total: positive }))
			.sort((item1, item2) => item2.total - item1.total)
			.slice(0, 10);
	} catch (error) {
		return error;
	}
}

export const fetchMostDeathStates = async () => {
	try {
		const { data } = await axios.get(`${COVID_TRACKING_URL}/states/current.json`);

		return data
			.map(({ state, death }) => ({ state: convertState(state), total: death }))
			.sort((item1, item2) => item2.total - item1.total)
			.slice(0, 10);
	} catch (error) {
		return error;
	}
}

export const fetchCountries = async () => {
	try {
		const { data: { countries } } = await axios.get(`${MATHDRO_URL}/countries`);

		return countries.map((country) => country.name);
	} catch (error) {
		return error;
	}
}

export const fetchUsaStates = async () => {
	try {
		const { data } = await axios.get(`${COVID_TRACKING_URL}/states/info.json`);

		return data.map((item) => ({ state: item.state, name: item.name }));
	} catch (error) {
		return error;
	}
}
