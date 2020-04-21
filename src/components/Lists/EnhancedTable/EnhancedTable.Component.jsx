import React, { useEffect } from 'react';
import orderData from 'lodash/orderBy';

// Redux
import { connect } from 'react-redux';
import {
	fetchCollectionsSuccess,
	fetchCollectionsStart,
	fetchCollectionsFailure,
	removeCollectionListener,
} from '../../../redux/menus/menus.actions';

// Selectors
import { createStructuredSelector } from 'reselect';
import {
	selectCurrentMenus,
	selectIsFetching,
} from '../../../redux/menus/menus.selectors';
import { selectAllUsers } from '../../../redux/user/user.selectors';

// Firebase Utils
import { updateDataWithUsersName } from '../../../utils/global-utils';

import { headCells } from '../../../data/Data';

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
import CircularProgress from '@material-ui/core/CircularProgress';

import AddIcon from '@material-ui/icons/Add';

import useStyles from './EnhancedTable.Styles';

const EnhancedTable = props => {
	const {
		fetchCollectionsStart,
		removeCollectionListener,
		menus,
		isFetching,
		allUsers,
	} = props;
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('name');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	useEffect(() => {
		fetchCollectionsStart('Menus');

		return () => {
			removeCollectionListener();
		};
	}, [fetchCollectionsStart, removeCollectionListener]);

	// This code is used to determin which column to sort.
	// It checks first to see if it´s a number.
	// Set to lowercase to make it case insensitive.
	const sorter =
		orderBy === 'price'
			? orderBy
			: menu => {
					return menu[orderBy].toLowerCase();
			  };

	const updatedMenus = menus.map(menu =>
		updateDataWithUsersName(allUsers, menu)
	);

	const rows = orderData(updatedMenus, [sorter], order);

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
				)}

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
};

const mapDispatchToProps = dispatch => ({
	fetchCollectionsSuccess: menus => dispatch(fetchCollectionsSuccess(menus)),
	fetchCollectionsStart: collectionId =>
		dispatch(fetchCollectionsStart(collectionId)),
	fetchCollectionsFailure: error => dispatch(fetchCollectionsFailure(error)),
	removeCollectionListener: () => dispatch(removeCollectionListener()),
});

const mapStateToProps = createStructuredSelector({
	menus: selectCurrentMenus,
	isFetching: selectIsFetching,
	allUsers: selectAllUsers,
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
