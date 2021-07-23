import axios from 'axios';

const DISEASE_URL = 'https://disease.sh/v3/covid-19';

export const fetchDailyData = async () => {
	try {
		const { data: { cases, recovered, deaths } } = await axios.get(`${DISEASE_URL}/historical/all?lastdays=all`);

		return Object.keys(cases)
				.map((date) => ({
					date,
					confirmed: cases[date],
					recovered: recovered[date],
					deaths: deaths[date]
				}));
	} catch (error) {
		return error;
	}
};

export const fetchCountryData = async (country) => {
	const changeableUrl = !country ? `${DISEASE_URL}/all` : `${DISEASE_URL}/countries/${country}`;

	try {
		const { data: { cases, recovered, deaths, updated } } = await axios.get(changeableUrl);

		return { confirmed: cases, recovered, deaths, lastUpdate: updated };
	} catch (error) {
		return error;
	}
};

export const fetchUsaStateData = async (state) => {
	if (!state) {
		return null;
	}

	try {
		const { data } = await axios.get(`${DISEASE_URL}/nyt/states/${state}?lastdays=all`);

		return data
			.map(({ state, cases, deaths, date }) => ({
				state,
				confirmed: cases,
				deaths: deaths,
				date
			}));
	} catch (error) {
		return error;
	}
};

export const fetchMostConfirmedStates = async () => {
	try {
		const { data } = await axios.get(`${DISEASE_URL}/states?sort=cases`);

		return data
			.map(({ state, cases }) => ({ state, total: cases }))
			.slice(0, 10);
	} catch (error) {
		return error;
	}
};

export const fetchMostDeathStates = async () => {
	try {
		const { data } = await axios.get(`${DISEASE_URL}/states?sort=deaths`);

		return data
			.map(({ state, deaths }) => ({ state, total: deaths }))
			.slice(0, 10);
	} catch (error) {
		return error;
	}
};

export const fetchCountries = async () => {
	try {
		const { data } = await axios.get(`${DISEASE_URL}/countries?sort=country`);

		return data
			.filter(({ country }) => country !== 'USA')
			.reverse()
			.map(({ country }) => country);
	} catch (error) {
		return error;
	}
};

export const fetchUsaStates = async () => {
	try {
		const { data } = await axios.get(`${DISEASE_URL}/nyt/states`);

		return data.map(({ state }) => state);
	} catch (error) {
		return error;
	}
};
