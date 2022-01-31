import React, { useState, useEffect } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../../api';

import useStyles from './styles';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	BarElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const GlobalChart = React.memo(({ data: { confirmed, deaths, recovered }, country }) => {
	const [dailyData, setDailyData] = useState([]);
    const classes = useStyles();

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		}

		fetchAPI();
	}, []);

	const lineChart = (
		dailyData.length
			? (
				<Line
					data={{
						labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
						datasets: [{
							data: dailyData.map((data) => data.confirmed),
							label: 'Infected',
							borderColor: '#3333ff',
							backgroundColor: 'rgba(0, 0, 255, 0.1)',
							fill: true
						}, {
							data: dailyData.map((data) => data.deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.3)',
							fill: true
						}, {
				            data: dailyData.map((data) => data.recovered),
				            label: 'Recovered',
				            borderColor: 'green',
				            backgroundColor: 'rgba(0, 255, 0, 0.5)',
				            fill: true
						}]
					}}
				/>
			) : null
	);

	const barChart = (
		confirmed
			? (
				<Bar
					data={{
						labels: ['Infected', 'Recovered', 'Deaths'],
						datasets: [{
							label: 'People',
							backgroundColor: [
								'rgba(0, 0, 255, 0.5)',
								'rgba(0, 255, 0, 0.5)',
								'rgba(255, 0, 0, 0.5)'
							],
							data: [confirmed, recovered, deaths]
						}]
					}}
					options={{
						plugins: {
							legend: { display: false },
							title: { display: true, text: `Current status in ${country}`}
						}
					}}
				/>
			) : null
	);

	return (
		<div className={classes.container}>
			{country ? barChart : lineChart}
		</div>
	);
});

export default GlobalChart;
