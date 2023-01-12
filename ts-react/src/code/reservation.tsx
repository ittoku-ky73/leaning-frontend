import React from "react";

class Reservation extends React.Component<{}, { isGoing: boolean, numberOfGuests: number }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;

    switch(name) {
	  case "isGoing":
		this.setState({ [name]: target.checked });
	    break;
	  case "numberOfGuests":
	    this.setState({ [name]: Number(target.value) });
	    break;
	}
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

<Reservation />
