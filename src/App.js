import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import * as ROUTES from './routes/routes';

// Redux
import { connect } from 'react-redux';
import { fetchCurrentUserSuccess } from './redux/user/user.actions';
import {
	fetchCollectionsSuccess,
	fetchCollectionsStart,
	fetchCollectionsFailure,
} from './redux/menus/menus.actions';
import { fetchAllUsersStart } from './redux/user/user.actions';

// Data
// import { MenusData } from './data/newData';

// Firebase
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// Components
import SideMenu from './components/Layouts/SideMenu/SideMenu.Component';
import EnhancedTable from './components/Lists/EnhancedTable/EnhancedTable.Component';
import Detail from './components/Details/Detail.Component';
import SelectTable from './components/SelectTable/SelectTable.Component';
import MainContainer from './components/StyledComponents/MainContainer/MainContainer.component';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { fetchCurrentUserSuccess, fetchAllUsersStart } = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const otherData = {
					firstName: '',
					lastName: '',
					avatar: '',
					company: '',
					role: '',
				};
				const userRef = await createUserProfileDocument(
					userAuth,
					otherData
				);

				userRef.onSnapshot(snapshot => {
					fetchCurrentUserSuccess({
						id: snapshot.id,
						...snapshot.data(),
					});
				});
			} else {
				fetchCurrentUserSuccess(userAuth);
			}
		});

		fetchAllUsersStart();

		// Unquote the code below, if you want to create a new "Menus" collection in firebase.
		// addCollectionAndDocument('Menus', MenusData);
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		return (
			<Switch>
				<React.Fragment>
					<MainContainer>
						<SideMenu>
							<Route
								path={ROUTES.LIST}
								component={EnhancedTable}
							/>
							<Route path={ROUTES.DETAIL} component={Detail} />
							<Route
								path={ROUTES.TABLE}
								component={SelectTable}
							/>
						</SideMenu>
					</MainContainer>
				</React.Fragment>
			</Switch>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchCurrentUserSuccess: user => dispatch(fetchCurrentUserSuccess(user)),
	fetchCollectionsSuccess: menus => dispatch(fetchCollectionsSuccess(menus)),
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
	fetchCollectionsFailure: error => dispatch(fetchCollectionsFailure(error)),
	fetchAllUsersStart: () => dispatch(fetchAllUsersStart()),
});

export default connect(null, mapDispatchToProps)(App);
