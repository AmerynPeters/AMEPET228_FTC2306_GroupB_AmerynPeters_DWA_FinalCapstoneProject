/**
 * Importing the supabase constant from the supabase.jxs file allows you to centralize the 
 * initialization and management of the Supabase client instance. This can make your code more 
 * modular and easier to maintain
 */
import React from "react";
import { supabase } from './services/supabase.jsx';

/** 
 * Define the Login component
 */
const Login = () => {
  /** 
   * Function to handle login using GitHub
   */
  const handleLogin = async () => {
    try {
      /** My attempt to sign in using Supabase authentication with GitHub provider  */
      await supabase.auth.signIn({
        provider: 'github',
      });
    } catch (error) {
      /** Handle errors if any occur during the login process  */
      console.error('Error logging in:', error.message);
    }
  };

  /** Render the Login component  */
  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

/** Export the Login component as the default export  */
export default Login;