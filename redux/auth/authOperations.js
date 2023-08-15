import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSlice } from "./authReducer"

export const authSighUp = ({login, email, password}) => async (dispatch, getState) => {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        dispatch(authSlice.actions.updateUserProfile({userId: user.uid}))
        console.log("user->", user)
    } catch (error) {
        console.log(error)
    }
};

export const authSighIn = ({email, password}) => async (dispatch, getState) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        dispatch()
        console.log("user->", user)
    } catch (error) {
        console.log(error)
    }
};

export const authStateChangeUser = () =>
  async (dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }));
        dispatch(authStateChange({ stateChange: true }));        
      };

    });
  };

const authSighOut = () => async (dispatch, getState) => {
    
};

