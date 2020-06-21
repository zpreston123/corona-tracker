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
								'#b71c1c',
								'#ff5722',
								'#ffca28',
								'#43a047',
								'#009688',
								'#039be5',
								'#3949ab',
								'#5e35b1',
								'#8e24aa',
								'#c2185b'
							]
						}]
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
