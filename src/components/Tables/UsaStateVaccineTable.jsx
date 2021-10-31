import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import styles from './UsaStateVaccineTable.module.css';

const UsaStateVaccineTable = React.memo(({ data }) => {
    const table = (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Daily</b></TableCell>
                        <TableCell><b>Total per Hundred</b></TableCell>
                        <TableCell><b>Daily per Million</b></TableCell>
                        <TableCell><b>Total</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{data.daily}</TableCell>
                        <TableCell>{data.totalPerHundred}</TableCell>
                        <TableCell>{data.dailyPerMillion}</TableCell>
                        <TableCell>{data.total}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <div className={styles.container}>
            {table}
        </div>
    );
});

export default UsaStateVaccineTable;
