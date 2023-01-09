import React from "react";

class Toggle extends React.Component<{}, { isToggleOn: boolean }> {
  constructor(props: any) {
    super(props);
	this.state = { isToggleOn: true };

	this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
	  isToggleOn: !prevState.isToggleOn,
	}));
  }

  render(): React.ReactNode {
      return (
	    <button onClick={this.handleClick}>
		  {this.state.isToggleOn ? "ON" : "OFF"}
		</button>
	  );
  }
}

<Toggle />
