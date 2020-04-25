import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import orderData from 'lodash/orderBy';

// Routes
import * as ROUTES from '../../routes/routes';

// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as itemsActions from '../../redux/items/items.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import * as itemsSelectors from '../../redux/items/items.selectors';
import * as userSelectors from '../../redux/user/user.selectors';

// Firebase Utils
import * as COLLECTION_IDS from '../../firebase/collections.ids';

// Global Utils
import { updateDataWithUsersName } from '../../utils/global-utils';

// Table Header Settings
import { itemsHeadCells } from '../../data/Data';

import EnhancedTableHead from '../Lists/EnhancedTable/EnhancedTableHead.Component';
import EnhancedTableToolbar from '../Lists/EnhancedTable/EnhancedTableToolbar.Component';
import EnhancedTableBody from '../Lists/EnhancedTable/EnhancedTableBody.Component';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';

import useStyles from '../Lists/EnhancedTable/EnhancedTable.Styles';

const ItemsList = props => {
	const { items, isFetching, allUsers, history } = props;
	const classes = useStyles();
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(false);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	// This code is used to determin which column to sort.
	// It checks first to see if it´s a number.
	// Set to lowercase to make it case insensitive.
	const sorter =
		orderBy === 'price'
			? orderBy
			: menu => {
					return menu[orderBy].toLowerCase();
			  };

	const updatedItems = items.map(item =>
		updateDataWithUsersName(allUsers, item)
	);

	const rows = orderData(updatedItems, [sorter], order);

	// console.log('@@ ItemsList - rows:', rows);

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

	const handleFabClick = () => {
		history.push(`${ROUTES.ITEMS_LIST}/${ROUTES.NEW_ITEM}`);
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length} items />

				{isFetching ? (
					<div className={classes.loaderContainer}>
						<CircularProgress />
					</div>
				) : (
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
								headCells={itemsHeadCells}
								items
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
								items
							/>
						</Table>
					</TableContainer>
				)}

				<TablePagination
					rowsPerPageOptions={[
						5,
						10,
						25,
						{ label: 'All', value: -1 },
					]}
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
			<Fab
				color='secondary'
				aria-label='add'
				className={classes.fab}
				onClick={handleFabClick}
			>
				<AddIcon />
			</Fab>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	items: itemsSelectors.selectCurrentItems,
	isFetching: itemsSelectors.selectIsFetching,
	allUsers: userSelectors.selectAllUsers,
});

export default compose(withRouter, connect(mapStateToProps))(ItemsList);
