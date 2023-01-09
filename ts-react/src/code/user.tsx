type User = {
  avatarUrl: string;
  name: string;
};

function Comment(props: {
  author: User,
  text: string,
  date: string
}): JSX.Element {
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

<Comment
  author={{ avatarUrl: "https://github.com/ittokun.png", name: "ittokun" }}
  text="1 comment"
  date={Date.now().toString()}
/>
