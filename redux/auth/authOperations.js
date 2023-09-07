import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSighUp =
  ({ login, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });

      const user = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      );
      console.log("user->", user);
    } catch (error) {
      console.log(error);
    }
  };

export const authSighIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch();
      console.log("user->", user);
    } catch (error) {
      console.log(error);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export const authSighOut = () => async (dispatch, getState) => {
  try {
    await signOut(auth)

    dispatch(authSlice.actions.authSignOut())
  } catch (error) {
    
  }
};

export const authUpdateUserAvatar = ({ avatarUrl }) =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, { photoURL: avatarUrl });
      const user = auth.currentUser;
      
      if (user) {
        dispatch(authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL
        }));
      };
        
    } catch (error) {
      console.log(error);
    }
  };