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
	const changeableUrl = !state ? `${DISEASE_URL}/nyt/usa` : `${DISEASE_URL}/nyt/states/${state}?lastdays=all`;

	try {
		const { data } = await axios.get(changeableUrl);

		return data.map(({ cases, deaths, date }) => ({ confirmed: cases, deaths, date }));
	} catch (error) {
		return error;
	}
};

export const fetchUsaVaccineData = async (state) => {
	if (!state) { return null; }

	try {
		const { data: { timeline } } = await axios.get(`${DISEASE_URL}/vaccine/coverage/states/${state}?fullData=true`);

		return timeline.slice(-2)[0];
	} catch (error) {
		return error;
	}
};

export const fetchVaccineCandidatesData = async () => {
	try {
		const { data: { data } } = await axios.get(`${DISEASE_URL}/vaccine?fullData=true`);

		return data
			.filter(({ candidate }) => candidate !== 'No name announced')
			.map(({ candidate, trialPhase, mechanism, sponsors, institutions }) => ({ candidate, trialPhase, mechanism, sponsors: sponsors.join('\r\n'), institutions: institutions.join('\r\n') }));
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

		return data.reverse().map(({ country }) => country);
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
