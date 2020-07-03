import React from 'react';
import { Line } from 'react-chartjs-2';
import styles from './StateChart.module.css';

const StateChart = ({ data: stateData, state }) => {
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
							backgroundColor: 'rgba(0, 0, 255, 0.1)',
							fill: true
						}, {
							data: stateData.map(({ deaths }) => deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.3)',
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

export default StateChart;