import React from "react";

class FlavorForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { value: 'coconut' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">グレープフルーツ</option>
            <option value="lime">ライム</option>
            <option value="coconut">ココナッツ</option>
            <option value="mango">マンゴー</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

<FlavorForm />
