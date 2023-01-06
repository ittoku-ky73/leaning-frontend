import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const user = {
  firstName: 'ittokun',
  lastName: 'neo',
};

const element = getGreeting(user);

function formatName(user: { firstName: string, lastName: string}): string {
  return user.firstName + ' ' + user.lastName;
}

function getGreeting(user?: any): any {
  if (user) {
    return React.createElement('h1', { className: "greeting" }, `Hello ${formatName(user)}!`);
  } else {
    return <h1>Hello, Stranger.</h1>;
  }
}

function tick() {
  const element = (
    <div>
      <h1>Hello World!</h1>
      <h2>
        It is {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );
  root.render(element);
}

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);
setInterval(tick, 1000);
// root.render(element)
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
