import React from 'react';

import Box from '@material-ui/core/Box';

import SideMenu from './components/Layouts/SideMenu/SideMenu.Component';
import EnhancedTable from './components/Lists/EnhancedTable/EnhancedTable.Component';

import useStyles from './App.Styles';

function App() {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<SideMenu>
				<Box className={classes.content}>
					<EnhancedTable />
				</Box>
			</SideMenu>
		</Box>
	);
}

export default App;
