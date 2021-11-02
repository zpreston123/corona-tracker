import React from 'react';
import { Typography, Link } from '@material-ui/core';

import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Typography variant="body1" component="h2">
                US data sourced from <Link href="https://www.nytimes.com/interactive/2021/us/covid-cases.html">New York Times</Link>, <Link href="https://www.worldometers.info/coronavirus/">Worldometer</Link>, and <Link href="https://ourworldindata.org/coronavirus/">Our World in Data</Link>.<br />
                Global data sourced from <Link href="https://coronavirus.jhu.edu/">John Hopkins University CSSE</Link> and <Link href="https://www.worldometers.info/coronavirus/">Worldometer</Link>.
            </Typography>
        </div>
    );
};

export default Footer;
