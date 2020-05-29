import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './CountyChart.module.css';

const CountyChart = ({ data: { confirmed, deaths }, county }) => {
	const doughnutChart = (
		confirmed
			? (
				<Doughnut
					data={{
						labels: ['Infected', 'Deaths'],
						datasets: [{
							label: 'People',
							backgroundColor: [
								'rgba(0, 0, 255, 0.5)',
								'rgba(255, 0, 0, 0.5)'
							],
							data: [confirmed, deaths]
						}]
					}}
					options={{
						legend: { display: false },
						title: { display: true, text: `Current state in ${county} county`}
					}}
			/>) : null
	);

	return (
		<div className={styles.container}>
			{doughnutChart}
		</div>
	)
}

export default CountyChart;
