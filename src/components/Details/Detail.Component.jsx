import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';

import useStyles from './Detail.Styles';

const Detail = () => {
	const classes = useStyles();

	return (
		<Grid container spacing={3}>
			<Grid item xs={8}>
				<Paper className={classes.root}>
					<Box display='flex' alignItems='start' paddingBottom={3}>
						<Typography
							component='h2'
							variant='h5'
							color='inherit'
							noWrap
							className={classes.title}
						>
							Basic Info
						</Typography>
						<Button
							variant='contained'
							color='secondary'
							size='small'
							className={classes.deleteButton}
							startIcon={<DeleteIcon />}
						>
							Delete
						</Button>
					</Box>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<TextField label='Name' fullWidth color='primary' />
						</Grid>
						<Grid item xs={6}>
							<TextField
								label='Price'
								fullWidth
								color='primary'
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								label='Quantity'
								fullWidth
								color='primary'
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label='Description'
								fullWidth
								color='primary'
								multiline
								rows='6'
							/>
						</Grid>
					</Grid>
					<Box display='flex' paddingTop={5}>
						<Button
							variant='contained'
							color='primary'
							size='small'
							startIcon={<SaveIcon />}
						>
							Save
						</Button>
						<Button
							variant='contained'
							className={classes.cancelButton}
							size='small'
							startIcon={<BlockIcon />}
						>
							Cancel
						</Button>
					</Box>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Detail;
