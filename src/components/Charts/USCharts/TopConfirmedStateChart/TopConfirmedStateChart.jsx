import React from 'react';
import { Pie } from 'react-chartjs-2';
import styles from './TopConfirmedStateChart.module.css';

const TopConfirmedStateChart = ({ data }) => {
	const pieChart = (
		data.length
			? (
				<Pie
					data={{
						labels: data.map(item => item.state),
						datasets: [{
							label: 'People',
							data: data.map(item => item.confirmed),
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
								'#c2185b',
								'#607d8b'
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

export default TopConfirmedStateChart;
