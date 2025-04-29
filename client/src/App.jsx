import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, matchPath } from 'react-router-dom';
import Home from './pages/Home';
import ScrollToTop from "./ScrollToTop";
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import About from './pages/About';
import RegisterOtp from './pages/RegisterOtp'
import Header from './components/RepeatedComponents/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import PropertyView from "./pages/PropertyView";
import PropertyDetails from "./pages/PropertyDetails";
import RoomSpace from './components/HomePageComponents/RoomSpace';
import Stays from './pages/Stays';
import Destination from './pages/Destination';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import AllImages from './pages/AllImages';
import AdminLogin from './pages/AdminLogin';
import DropDownCard from './components/RepeatedComponents/DropDownSignIn';
import AdminDashboard from './pages/AdminDashboard';
import Whatsapp from './components/SignInLoginComponents/Whatsappicon';
import WildernessStay from './pages/SelectedStay';
import RoomTour from './pages/RoomTour';
import SelectedDestination from './pages/SelectedDestination';
import Profile from './pages/ProfilePage';
import NewProfile from './pages/NewProfile';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import LoginSignup from './pages/LoginSignUp';
import CmsLogin from './cms/pages/CmsLogin';
import CmsDashboard from './cms/pages/CmsDashboard';
import AllStays from './cms/pages/AllStays';
import EditStay from './cms/pages/EditStay';
import AllZones from './cms/pages/AllZones';  
import EditDestination from './cms/pages/EditDestination';  
import Verification from './pages/Verification';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import BookingHistory from './pages/BookingHistory';
import Blog from './pages/Blog';  
import Footer from './components/RepeatedComponents/Footer';
import AddStay from './cms/pages/AddStay';
import StayTypes from './cms/pages/StayTypes';
import AllDestination from './cms/pages/AllDestination';
import AddDestination from './cms/pages/AddDestination';
import AllReviews from './cms/pages/AllReviews';
import LandingPage from './cms/pages/LandingPage';
import TripTypes from './cms/pages/TripTypes';
import MakePaymentPage from './pages/MakePaymentPage';


function App() {
  const location = useLocation(); // Get current location
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Define routes where the header should be hidden
  const noHeaderRoutes = ['/Register', '/sign-in', '/register-otp', '/LoginSignup', '/Room-tour/:roomId', '/payment', '/search', '/Admin-login', '/Admin-Dashboard', '/Activities', '/cms/login', '/cms/dashboard', '/cms/AllStays', '/cms/stays/edit/:stayId', '/cms/addstay', '/cms/StayTypes','/cms/AllDestination','/cms/AddDestination','/cms/AllZones','/cms/AllReviews', '/cms/LandingPage', '/cms/TripTypes', '/cms/EditDestination/:id']; 
  const noFooterRoutes = ['/Register', '/sign-in' , '/register-otp', '/LoginSignup', '/Room-tour/:roomId', '/payment', '/search', '/Admin-login', '/Admin-Dashboard', '/Activities', '/cms/login', '/cms/dashboard', '/cms/AllStays', '/cms/stays/edit/:stayId', '/cms/addstay', '/cms/StayTypes','/cms/AllDestination','/cms/AddDestination','/cms/AllZones','/cms/AllReviews', '/cms/LandingPage' , '/cms/TripTypes', '/cms/EditDestination/:id'];       
  const shouldHideHeader = noHeaderRoutes.some(route => matchPath(route, location.pathname));
  return (
    <>
      {/* Render Header only if the current path is not in the noHeaderRoutes array */}
      {!shouldHideHeader && <Header />}
      
      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/cms/LandingPage' element={<LandingPage />} /> 
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/Register' element={<Register />} />
        <Route path="/register-otp" element={<RegisterOtp />} />
        <Route path='/LoginSignup' element={<LoginSignup />} />
        <Route path='/Verify' element={<Verification />} />
        <Route path='/about' element={<About />} />
        <Route path='/Stays' element={<Stays />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/property-view" element={<PropertyView />} />
        <Route path="/Room-Space" element={<RoomSpace />} />
        <Route path="/PaymentPage" element={<PaymentPage />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfailure" element={<PaymentFailure />} />
        <Route path="/all-images" element={<AllImages />} />
        <Route path='/cms/AllDestination' element={<AllDestination />} /> 
        <Route path='/cms/AddDestination' element={<AddDestination />} /> 
        <Route path="/cms/EditDestination/:id" element={<EditDestination />} />
        <Route path="/make-payment" element={<MakePaymentPage />} />
        <Route path='/cms/AllZones' element={<AllZones />} />
        <Route path='/cms/AllReviews' element={<AllReviews />} />  
        <Route path='/Admin-login' element={<AdminLogin />} />
        <Route path='/cms/login' element={<CmsLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/cms/dashboard' element={<CmsDashboard setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/cms/stays/edit/:stayId" element={<EditStay />} />
        <Route path="/cms/StayTypes" element={<StayTypes />} /> 
        <Route path="/cms/AllStays" element={<AllStays />} />
        <Route path="/cms/addstay" element={<AddStay />} /> 
        <Route path='/cms/TripTypes' element={<TripTypes />} />
        <Route path='/Admin-Dashboard' element={<AdminDashboard />} />
        <Route path='/Destination' element={<Destination />} />
        <Route path='/Activities' element={<Activities />} />
        <Route path='/Blog' element={<Blog />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Stays/:stayId' element={<WildernessStay />} />
        <Route path='/Destination/:DestinationId' element={<SelectedDestination />} />
        <Route path ='/Room-tour/:roomId' element={<RoomTour /> } />
        <Route path='/Privacy' element={<PrivacyPolicy />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path ='/dropSignIn' elements={<DropDownCard/>} />
        <Route path ='/newprofile' element={<NewProfile />} />
        <Route path ='/bookings' element={<BookingHistory />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
        </Route>
      </Routes>
      {!shouldHideHeader && <Footer />}

      
    </>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <ScrollToTop />
        <App />
      
    </BrowserRouter>
  );
}
