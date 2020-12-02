import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
  renderError = ({ touched, error }) => {
    if (!touched || !error) return null;

    return (
      <div className="ui error message">
        <div className="">{error}</div>
      </div>
    );
  };

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="field">
        <label>{label}</label>
        <input autoComplete="off" {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        className="ui form error"
      >
        <Field name="title" label="enter title" component={this.renderInput} />
        <Field
          name="description"
          label="enter description"
          component={this.renderInput}
        />

        <button className="ui primary button">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'you must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'you must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamForm',
  validate,
})(StreamForm);
