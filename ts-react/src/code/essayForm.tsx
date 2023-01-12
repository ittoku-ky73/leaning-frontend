import React from "react";

class EssayForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
	  value: 'Please write an essay about your favorite DOM element.' 
	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

<EssayForm />
