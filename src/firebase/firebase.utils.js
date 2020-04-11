import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, otherData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`Users/${userAuth.uid}`);
	const snapshot = await userRef.get();

	console.log(snapshot);

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date().toISOString();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...otherData,
			});
		} catch (error) {
			console.log('Error creating user', error.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocument = async (collectionId, objectToAdd) => {
	const collectionRef = firestore.collection(collectionId);
	const batch = firestore.batch();

	objectToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();

		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
