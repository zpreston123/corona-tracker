import React, { useState, useEffect } from 'react';
import { fetchInitialStateData } from '../../../api';
import { Line } from 'react-chartjs-2';

import styles from './USChart.module.css';

const USChart = ({ data: stateData, state }) => {
	const [initialStateData, setInitialStateData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setInitialStateData(await fetchInitialStateData());
		}

		fetchAPI();
	}, []);

	if (!initialStateData.length) {
		return 'Loading...';
	}

	const initialLineChart = (
		initialStateData.length
			? (
				<Line
					data={{
						labels: initialStateData.map(({ date }) => date),
						datasets: [{
							data: initialStateData.map(({ confirmed }) => confirmed),
							label: 'Infected',
							borderColor: '#3333ff',
							fill: true
						}, {
							data: initialStateData.map(({ deaths }) => deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.5)',
							fill: true
						}]
					}}
			/>) : null
	);

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
			{stateData.length ? lineChart : initialLineChart}
		</div>
	)
}

export default USChart;
