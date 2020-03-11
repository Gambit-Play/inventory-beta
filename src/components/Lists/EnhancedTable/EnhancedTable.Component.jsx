import React from 'react';

import { rows, headCells } from '../../../data/Data';

import EnhancedTableHead from './EnhancedTableHead.Component';
import EnhancedTableToolbar from './EnhancedTableToolbar.Component';
import EnhancedTableBody from './EnhancedTableBody.Component';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import useStyles from './EnhancedTable.Styles';

export default function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = event => {
		setDense(event.target.checked);
	};

	console.log(rows);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}
						aria-label='enhanced table'
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							headCells={headCells}
						/>
						<EnhancedTableBody
							order={order}
							orderBy={orderBy}
							page={page}
							dense={dense}
							rowsPerPage={rowsPerPage}
							rows={rows}
							selected={selected}
							setSelected={setSelected}
						/>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel
				control={
					<Switch checked={dense} onChange={handleChangeDense} />
				}
				label='Dense padding'
			/>
			<Fab color='secondary' aria-label='add' className={classes.fab}>
				<AddIcon />
			</Fab>
		</div>
	);
}
