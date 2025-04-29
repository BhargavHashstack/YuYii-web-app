// utils/recaptcha.js

import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { app } from "../firebase"; // Adjust the path based on your project structure

let recaptchaInstance = null;

export const initializeRecaptcha = (containerId = "recaptcha-container") => {
  if (recaptchaInstance) {
    console.warn("reCAPTCHA is already initialized.");
    return recaptchaInstance;
  }

  try {
    const auth = getAuth(app); // Get the auth instance from initialized Firebase app

    // Disable app verification for testing purposes (if required)
    auth.settings.appVerificationDisabledForTesting = true;

    // Create a new RecaptchaVerifier instance
    recaptchaInstance = new RecaptchaVerifier(containerId, {
      size: "invisible", // Invisible reCAPTCHA
      callback: function(response) {
        // Handle successful reCAPTCHA response here (optional)
      },
    }, auth);

    // Render the reCAPTCHA and handle any errors
    recaptchaInstance.render()
      .then(() => {
        console.log("reCAPTCHA rendered successfully.");
      })
      .catch((error) => {
        console.error("Error during reCAPTCHA rendering:", error);
        throw new Error("Failed to render reCAPTCHA");
      });

    return recaptchaInstance;
  } catch (error) {
    console.error("Error initializing reCAPTCHA:", error);
    throw new Error("Failed to initialize reCAPTCHA");
  }
};

// Clean up reCAPTCHA instance
export const clearRecaptcha = () => {
  if (recaptchaInstance) {
    recaptchaInstance.clear();
    recaptchaInstance = null;
    console.log("reCAPTCHA cleared.");
  }
};
