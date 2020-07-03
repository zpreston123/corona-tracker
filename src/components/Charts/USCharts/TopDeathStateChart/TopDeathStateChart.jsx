import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './TopDeathStateChart.module.css';

const TopDeathStateChart = ({ data }) => {
	const pieChart = (
		data.length
			? (
				<Pie
					data={{
						labels: data.map(item => item.state),
						datasets: [{
							label: 'People',
							data: data.map(item => item.deaths),
							backgroundColor: [
								'rgb(183, 28, 28)',
								'rgb(255, 87, 34)',
								'rgb(255, 202, 40)',
								'rgb(67, 160, 71)',
								'rgb(0, 150, 136)',
								'rgb(3, 155, 229)',
								'rgb(57, 73, 171)',
								'rgb(94, 53, 177)',
								'rgb(142, 36, 170)',
								'rgb(194, 24, 91)',
								'rgb(96, 125, 139)'
							]
						}]
					}}
					options={{
						legend: {
							display: false
						}
					}}
			/>) : null
	);

	return (
		<div className={styles.container}>
			{pieChart}
		</div>
	)
}

export default TopDeathStateChart;
