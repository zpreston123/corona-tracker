import React, { useState, useEffect } from 'react';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { fetchUsaStateData } from '../../../api';

import useStyles from './styles';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const UsaStateChart = React.memo(({ usaState }) => {
	const [dailyData, setDailyData] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchUsaStateData(usaState));
		}

		fetchAPI();
	}, [usaState]);

	const lineChart = (
		<Line
			data={{
				labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
				datasets: [{
					data: dailyData.map(({ confirmed }) => confirmed),
					label: 'Infected',
					borderColor: '#3333ff',
					backgroundColor: 'rgba(0, 0, 255, 0.1)',
					fill: true
				}, {
					data: dailyData.map(({ deaths }) => deaths),
					label: 'Deaths',
					borderColor: 'red',
					backgroundColor: 'rgba(255, 0, 0, 0.3)',
					fill: true
				}]
			}}
		/>
	);

	return (
		<div className={classes.container}>
			{lineChart}
		</div>
	);
});

export default UsaStateChart;
