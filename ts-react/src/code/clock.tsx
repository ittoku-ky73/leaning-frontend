import React from 'react';

class Clock extends React.Component<{}, { date: Date }> {
  timerID: any;

  constructor(props: any) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount(): void {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount(): void {
      clearInterval(this.timerID);
  }

  tick(): void {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
	    <div>
	      <h1>Hello World!</h1>
	      <h2>
	        It is {this.state.date.toLocaleTimeString()}.
	      </h2>
	    </div>
	  );
  }
}

<Clock />
