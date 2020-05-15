import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './USChart.module.css';

const USChart = ({ data: stateData, state }) => {
	const lineChart = (
		stateData.length
			? (
				<Line
					data={{
						labels: stateData.map(({ date }) => date),
						datasets: [{
							data: stateData.map(({ confirmed }) => confirmed),
							label: 'Infected',
							borderColor: '#3333ff',
							fill: true
						}, {
							data: stateData.map(({ deaths }) => deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.5)',
							fill: true
						}]
					}}
			/>) : null
	);

	return (
		<div className={styles.container}>
			{lineChart}
		</div>
	)
}

export default USChart;
