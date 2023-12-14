import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// import React from 'react';
// import ReactDOM from 'react-dom';
// import React, { createRoot } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import App from './App.jsx';
// import './index.css'

/**
 * React 18 introduces concurrent rendering improvements and 
 * a new root API called createRoot to enable these features. 
 * The deprecation warning you're seeing suggests that ReactDOM.render will be 
 * replaced by createRoot in React 18.
 */

// const root = createRoot(<Router />, <App />, document.getElementById('root'));
// root.render(<App />);

// ReactDOM.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );