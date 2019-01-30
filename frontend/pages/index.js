

//== Index Page ================================================================
/*
  This page is a thin wrapper for the LandingPage component. All users will see
  this page when first loggin in.

  If the <div> element is unnecessary, consider simply returning the LandingPage
  component, or using a React.Fragment instead.
*/

//-- Dependencies --------------------------------
import LandingPage from '../components/Landing/landingPage.js'

//-- React Implementation ------------------------
export default () => (
  <div>
    <LandingPage />
  </div>
);
