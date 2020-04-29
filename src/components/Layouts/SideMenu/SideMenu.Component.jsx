import React from 'react';
import clsx from 'clsx';

// Selectors
import { createStructuredSelector } from 'reselect';
import { selectSideMenuOpen } from '../../../redux/ui/ui.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

// Redux
import { connect } from 'react-redux';
import { toggleSidemenu } from '../../../redux/ui/ui.actions';
import * as actions from '../../../redux/user/user.actions';

import SideMenuList from './SideMenuList.Component';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PowerSettingsIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useStyles from './SideMenu.Styles';

const SideMenu = ({
	children,
	toggleSidemenu,
	open,
	currentUser,
	fetchCurrentUserStart,
	userGoogleLogoutStart,
}) => {
	const classes = useStyles();

	const handleToggleSidemenu = () => {
		toggleSidemenu();
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleToggleSidemenu}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component='h1'
						variant='h6'
						color='inherit'
						noWrap
						className={classes.title}
					>
						Dashboard
					</Typography>
					<IconButton color='inherit'>
						<Badge badgeContent={9} color='secondary'>
							<NotificationsIcon />
						</Badge>
					</IconButton>
					<Divider
						orientation='vertical'
						flexItem
						className={classes.dividerToolbar}
					/>
					<Avatar
						alt='Remy Sharp'
						src='https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
						className={classes.avatar}
						onClick={fetchCurrentUserStart}
					/>
					<Typography>
						{currentUser && currentUser.displayName}
					</Typography>
					<IconButton color='inherit' onClick={userGoogleLogoutStart}>
						<PowerSettingsIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!open && classes.drawerPaperClose
					),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleToggleSidemenu}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<SideMenuList />
			</Drawer>
			<Box className={classes.content}>{children}</Box>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	toggleSidemenu: () => dispatch(toggleSidemenu()),
	fetchCurrentUserStart: () => dispatch(actions.fetchCurrentUserStart()),
	userGoogleLogoutStart: () => dispatch(actions.userGoogleLogoutStart()),
});

const mapStateToProps = createStructuredSelector({
	open: selectSideMenuOpen,
	currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
