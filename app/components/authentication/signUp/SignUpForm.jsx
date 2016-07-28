import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import request from 'superagent';

import store from '../../../redux/store';

const fields = [
  'username',
  'email',
  'firstName',
  'lastName',
  'password'
];

const divStyle = {
  marginTop: '20px',
};

const fieldStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
};

const buttonStyle = {
  display: 'block',
  margin: 'auto',
  width: '75%',
  color: '#FFFFFF',
  backgroundColor: '#607D8B',
  marginTop: '20px',
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'password',
    'username',
    'email'
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignUpForm = (props) => {
  return (
    <div style={divStyle}>
      <div style={fieldStyle}>
        <Field
          style={{ width: '100%' }}
          name="username"
          component={TextField}
          hintText="Username"
          floatingLabelText="Username"
        />
      </div>
      <div style={fieldStyle}>
        <Field
          style={{ width: '49%', float: 'left' }}
          name="firstName"
          component={TextField}
          hintText="First Name"
          floatingLabelText="First Name"
        />
        <Field
          style={{ width: '49%', float: 'right' }}
          name="lastName"
          component={TextField}
          hintText="Last Name"
          floatingLabelText="Last Name"
        />
      </div>
      <div style={fieldStyle}>
        <Field
          style={{ width: '100%' }}
          name="email"
          component={TextField}
          hintText="Email"
          floatingLabelText="Email"
        />
      </div>
      <div style={fieldStyle}>
        <Field
          style={{ width: '100%' }}
          name="password"
          component={TextField}
          hintText="Password"
          floatingLabelText="Password"
          type="password"
        />
      </div>
      <FlatButton
        style={buttonStyle}
        label="Sign Up"
        onClick={props.handleSubmit}
      />
    </div>
  );
};

SignUpForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
};

const signUpUser = (values) => {
  console.log(values);
  request
    .post('api/users')
    .send(values)
    .end((error, response) => {
      if (error) {
        store.dispatch({
          type: 'SIGN_UP_USER_FAILURE',
          payload: {
            error
          }
        });
      }
      console.log(response.body);
    });
};

export default reduxForm({
  form: 'simple',
  validate,
  fields,
  onSubmit: (values) => {
    signUpUser(values);
  }
})(SignUpForm);
