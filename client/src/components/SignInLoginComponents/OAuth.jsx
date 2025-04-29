import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase'; // Adjust the import path to match your project structure
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice'; // Adjust path to match your Redux setup
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const handleGoogleClick = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    console.log('Google Auth Result:', result.user);

    // Access the email from _tokenResponse
    const email = result._tokenResponse.email;
    const name = result.user.displayName;
    const photoURL = result.user.photoURL;

    if (!email) {
      console.error('Email is missing!');
      return; // Exit if email is not available
    }

    const res = await fetch('/property-api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        photo: photoURL,
      }),
    });

    const data = await res.json();
    dispatch(signInSuccess(data));
    navigate('/');
  } catch (error) {
    console.error('Could not sign in with Google:', error);
  }
};

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 text-[#1F1F1F] rounded-sm hover:bg-gray-100 hover:border-black transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-5 w-5 mr-2"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.52 1.17 8.94 3.07l6.77-6.76C35.7 2.68 30.25 0.5 24 0.5 14.89 0.5 7.2 5.99 3.65 13.1l7.85 6.09C13.06 12.5 18.19 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.8 24.5c0-1.54-.15-3.03-.42-4.5H24v9h12.94c-.56 3.22-2.3 5.96-4.86 7.75l7.53 5.85c4.44-4.1 7.19-10.16 7.19-17.1z"
        />
        <path
          fill="#4A90E2"
          d="M24 48.5c6.48 0 11.93-2.18 15.91-5.9l-7.53-5.85c-2.08 1.39-4.77 2.2-7.38 2.2-5.87 0-10.83-4.14-12.6-9.75l-7.85 6.09C7.04 42.48 14.8 48.5 24 48.5z"
        />
        <path
          fill="#FBBC05"
          d="M3.65 13.1C2.67 15.25 2 17.77 2 20.5s.67 5.25 1.65 7.4l7.85-6.09c-.51-1.54-.79-3.2-.79-4.91s.28-3.37.79-4.91l-7.85-6.09z"
        />
      </svg>
      Continue with Google
    </button>
  );
}