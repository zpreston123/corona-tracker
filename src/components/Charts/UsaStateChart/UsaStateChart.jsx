import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { fetchUsaStateData } from '../../../api';

import styles from './UsaStateChart.module.css';

const UsaStateChart = ({ usaState }) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchUsaStateData(usaState));
		}

		fetchAPI();
	}, [usaState]);

	const lineChart = (
		dailyData.length
			? (
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
			) : null
	);

	return (
		<div className={styles.container}>
			{lineChart}
		</div>
	);
};

export default UsaStateChart;
