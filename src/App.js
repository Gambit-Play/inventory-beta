import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Routes
import * as ROUTES from './routes/routes';

// Redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

// Data
// import { MenusData } from './data/newData';

// Firebase
import {
	auth,
	createUserProfileDocument,
	// addCollectionAndDocument,
} from './firebase/firebase.utils';

// Components
import SideMenu from './components/Layouts/SideMenu/SideMenu.Component';
import EnhancedTable from './components/Lists/EnhancedTable/EnhancedTable.Component';
import Detail from './components/Details/Detail.Component';
import SelectTable from './components/SelectTable/SelectTable.Component';
import MainContainer from './components/StyledComponents/MainContainer/MainContainer.component';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapshot => {
					setCurrentUser({
						id: snapshot.id,
						...snapshot.data(),
					});
					console.log(snapshot.data());
				});
			} else {
				setCurrentUser(userAuth);
			}
		});
		// Unquote if you want to create new data in firebase
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
	setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
