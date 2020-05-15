import React, { useState, useEffect } from 'react';
import { fetchInitialCountryData } from '../../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './GlobalChart.module.css';

const GlobalChart = ({ data: { confirmed, deaths, recovered }, country }) => {
	const [initialCountryData, setInitialCountryData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setInitialCountryData(await fetchInitialCountryData());
		}

		fetchAPI();
	}, []);

	const lineChart = (
		initialCountryData.length
			? (
				<Line
					data={{
						labels: initialCountryData.map(({ date }) => date),
						datasets: [{
							data: initialCountryData.map(({ confirmed }) => confirmed),
							label: 'Infected',
							borderColor: '#3333ff',
							fill: true
						}, {
							data: initialCountryData.map(({ deaths }) => deaths),
							label: 'Deaths',
							borderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.5)',
							fill: true
						}]
					}}
			/>) : null
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
							data: [confirmed.value, recovered.value, deaths.value]
						}]
					}}
					options={{
						legend: { display: false },
						title: { display: true, text: `Current state in ${country}`}
					}}
				/>
			) : null
	);

	return (
		<div className={styles.container}>
			{country ? barChart : lineChart}
		</div>
	)
}

export default GlobalChart;
