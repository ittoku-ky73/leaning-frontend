import { ReactNode } from "react";

function About(): JSX.Element {
  return <div>About</div>;
}

function Chat(): JSX.Element {
  return <div>Chat</div>;
}

function SplitPane(props: { left: ReactNode, right: ReactNode }) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function Contacts() {
  return (
    <SplitPane
      left={<About />}
      right={<Chat />}
    />
  );
}

<Contacts />
