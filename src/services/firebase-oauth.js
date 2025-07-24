import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase';

class FirebaseOAuthService {
  constructor() {
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    
    // Configure Google provider
    this.googleProvider.addScope('email');
    this.googleProvider.addScope('profile');
    
    // Configure Facebook provider
    this.facebookProvider.addScope('email');
    this.facebookProvider.addScope('public_profile');
  }

  // Google Sign In
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      return {
        success: true,
        user: {
          id: user.uid,
          email: user.email,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          profileImage: user.photoURL,
          provider: 'google',
          isEmailVerified: user.emailVerified,
          googleId: user.uid
        },
        token: await user.getIdToken(),
        accessToken: token
      };
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      let errorMessage = 'Google sign-in failed';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled by user';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked. Please allow pop-ups and try again';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email';
      }
      
      throw new Error(errorMessage);
    }
  }

  // Facebook Sign In
  async signInWithFacebook() {
    try {
      const result = await signInWithPopup(auth, this.facebookProvider);
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      return {
        success: true,
        user: {
          id: user.uid,
          email: user.email,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          profileImage: user.photoURL,
          provider: 'facebook',
          isEmailVerified: user.emailVerified,
          facebookId: user.uid
        },
        token: await user.getIdToken(),
        accessToken: token
      };
    } catch (error) {
      console.error('Facebook sign-in error:', error);
      
      let errorMessage = 'Facebook sign-in failed';
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Sign-in cancelled by user';
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up blocked. Please allow pop-ups and try again';
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email';
      }
      
      throw new Error(errorMessage);
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Sign out failed');
    }
  }

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
}

// Create and export singleton instance
const firebaseOAuthService = new FirebaseOAuthService();
export default firebaseOAuthService;
