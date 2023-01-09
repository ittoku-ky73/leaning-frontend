import React from "react";

function WarningBanner(props: { showWarning: boolean }): JSX.Element | null {
  return (props.showWarning) 
	? <div className="warning">Warning!</div>
    : null;
}

class Flash extends React.Component<{}, { showWarning: boolean }> {
  constructor(props: any) {
    super(props);
	this.state = { showWarning: true };
	this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
	  showWarning: !state.showWarning,
	}));
  }

  render(): React.ReactNode {
    return (
      <div>
        <WarningBanner showWarning={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "Hide" : "Show" }
        </button>
      </div>
    );
  }
}

<Flash />
