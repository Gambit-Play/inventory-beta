import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import SideMenu from './components/Layouts/SideMenu/SideMenu.Component';
import EnhancedTable from './components/Lists/EnhancedTable/EnhancedTable.Component';
import Detail from './components/Details/Detail.Component';
import SelectTable from './components/SelectTable/SelectTable.Component';

import useStyles from './App.Styles';

function App() {
	const classes = useStyles();

	return (
		<Switch>
			<Box className={classes.root}>
				<SideMenu>
					<Route path='/list' component={EnhancedTable} />
					<Route path='/detail' component={Detail} />
					<Route path='/tables' component={SelectTable} />
				</SideMenu>
			</Box>
		</Switch>
	);
}

export default App;
