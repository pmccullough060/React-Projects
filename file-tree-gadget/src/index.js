import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//this is the main entry point for the application.

//line 10: getting the Div with the id root and injecting the application into this div in index.html.

//Strict Mode - addtional warnings.

//this is essentially a method with two arguments, the first is the react app. The second is the div with root id that
//that the react app is going to be injected into.

//Webpack uses src/index.js as the entry point so that is the first module that it reads.
//

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
