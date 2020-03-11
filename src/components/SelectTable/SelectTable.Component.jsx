import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';

import AddIcon from '@material-ui/icons/Add';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	paper: {
		height: 150,
		width: 150,
		paddingTop: theme.spacing(2),
		overflow: 'hidden'
	},
	tableName: {
		fontSize: 20,
		marginBottom: theme.spacing(1)
	},
	tableNumber: {
		fontSize: 36
	},
	status: {
		height: '100%'
	},
	statusWaiting: {
		height: '100%',
		backgroundColor: red[500]
	},
	statusServed: {
		height: '100%',
		backgroundColor: green[500]
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(4),
		right: theme.spacing(4)
	}
}));

const data = [
	{ status: '', tableNumber: 1 },
	{ status: '', tableNumber: 2 },
	{ status: 'served', tableNumber: 3 },
	{ status: 'waiting', tableNumber: 4 },
	{ status: 'served', tableNumber: 5 },
	{ status: '', tableNumber: 6 },
	{ status: 'waiting', tableNumber: 7 },
	{ status: 'waiting', tableNumber: 8 },
	{ status: '', tableNumber: 9 }
];

const TableStatus = props => {
	const classes = useStyles();
	const { status } = props;

	if (status === 'waiting')
		return <Box className={classes.statusWaiting}></Box>;
	if (status === 'served')
		return <Box className={classes.statusServed}></Box>;
	if (status === '') return <Box className={classes.status}></Box>;
};

const SelectTable = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<Grid container spacing={3}>
				{data.map(curr => (
					<Grid item key={curr.tableNumber}>
						<ButtonBase>
							<Paper className={classes.paper}>
								<Typography
									align='center'
									className={classes.tableName}
								>
									Table
								</Typography>
								<Typography
									align='center'
									className={classes.tableNumber}
								>
									{curr.tableNumber}
								</Typography>
								<TableStatus status={curr.status} />
							</Paper>
						</ButtonBase>
					</Grid>
				))}
			</Grid>
			<Fab color='secondary' aria-label='add' className={classes.fab}>
				<AddIcon />
			</Fab>
		</React.Fragment>
	);
};

export default SelectTable;
