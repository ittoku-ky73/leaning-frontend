// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

// const user = {
//   firstName: 'ittokun',
//   lastName: 'neo',
// };

// function formatName(user: { firstName: string, lastName: string}): string {
//   return user.firstName + ' ' + user.lastName;
// }

// function getGreeting(user?: any): any {
//   if (user) {
//     return React.createElement('h1', { className: "greeting" }, `Hello ${formatName(user)}!`);
//   } else {
//     return <h1>Hello, Stranger.</h1>;
//   }
// }

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello World!</h1>
//       <h2>
//         It is {new Date().toLocaleTimeString()}.
//       </h2>
//     </div>
//   );
//   root.render(element);
// }

// function Welcome(props: { name: string }): JSX.Element {
//   return <h1>Hello, {props.name}</h1>
// }

// function App() {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   )
// }

type User = {
  avatarUrl: string;
  name: string;
};

function Comment(props: { author: User, text: string, date: string }): JSX.Element {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}

function UserInfo(props: { user: User }): JSX.Element {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  )
}

function Avatar(props: { user: User }): JSX.Element {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
} 

const element = <Comment
  author={{ avatarUrl: "https://github.com/ittokun.png", name: "ittokun" }}
  text="1 comment"
  date={Date.now().toString()}
/>;

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);

root.render(element)
// setInterval(tick, 1000);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
