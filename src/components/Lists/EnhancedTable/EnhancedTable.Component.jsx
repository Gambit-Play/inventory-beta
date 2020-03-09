import React from 'react';

import { createData } from './EnhancedTable.Actions';

import EnhancedTableHead from './EnhancedTableHead.Component';
import EnhancedTableToolbar from './EnhancedTableToolbar.Component';
import EnhancedTableBody from './EnhancedTableBody.Component';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

const rows = [
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Donut', 452, 25.0, 51, 4.9),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
	createData('Honeycomb', 408, 3.2, 87, 6.5),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Jelly Bean', 375, 0.0, 94, 0.0),
	createData('KitKat', 518, 26.0, 65, 7.0),
	createData('Lollipop', 392, 0.2, 98, 0.0),
	createData('Marshmallow', 318, 0, 81, 2.0),
	createData('Nougat', 360, 19.0, 9, 37.0),
	createData('Oreo', 437, 18.0, 63, 4.0)
];

const headCells = [
	{
		id: 'name',
		numeric: false,
		disablePadding: true,
		label: 'Dessert (100g serving)'
	},
	{ id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
	{ id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
	{ id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
	{
		id: 'protein',
		numeric: true,
		disablePadding: false,
		label: 'Protein (g)'
	}
];

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(4),
		right: theme.spacing(4)
	}
}));

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
