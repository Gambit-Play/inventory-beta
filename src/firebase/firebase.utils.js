import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyDsgDkgMyuj7kSAV0_lJpoFRpq0tRqJw6A',
	authDomain: 'inventory-beta.firebaseapp.com',
	databaseURL: 'https://inventory-beta.firebaseio.com',
	projectId: 'inventory-beta',
	storageBucket: 'inventory-beta.appspot.com',
	messagingSenderId: '708800177908',
	appId: '1:708800177908:web:b9cb78858d189cd41f60a1',
	measurementId: 'G-NW24RZ554G',
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
