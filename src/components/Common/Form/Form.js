import { Component } from 'react';

const emptyErrors = {};
const emptyTouched = {};

export default class Form extends Component {
  state = {
    values: this.props.initialValues,
    errors: this.props.intialErrors || emptyErrors,
    touched: this.props.initialTouched || emptyTouched,
    isDisabled: true,
  };

  componentDidMount() {
    this.validate();
  }

  setFieldState(stateName, key, value) {
    const items = this.state[stateName];

    const newItems = {
      ...items,
      [key]: value,
    };

    this.setState({ [stateName]: newItems });
  }

  setValue(name, value) {
    this.setFieldState('values', name, value);
  }

  setError(name, value) {
    this.setFieldState('errors', name, value);
  }

  setTouched(name) {
    this.setFieldState('touched', name, true);
  }

  validateField(name, toSetError = true) {
    const { validation } = this.props;
    const { values } = this.state;

    const value = values[name];
    const validate = validation[name];
    let error = false;

    if (validate && typeof validate === 'function') {
      error = !validate(value);
    }

    if (toSetError) {
      this.setError(name, error);
    }

    return error;
  }

  validate() {
    if (!this.props.validation) {
      return;
    }

    const { values } = this.state;

    const errors = {};
    let hasError = false;

    for (let name in values) {
      const errorValue = this.validateField(name, false);

      if (errorValue) {
        hasError = true;
      }

      errors[name] = errorValue;
    }

    this.setState({
      errors,
      isDisabled: hasError,
    });

    return hasError;
  }

  onSubmit = async event => {
    event.preventDefault();

    const { values, isDisabled } = this.state;
    const { onSubmit } = this.props;

    const hasError = this.validate();

    if (isDisabled || hasError) {
      return;
    }

    await onSubmit(values);
  }

  onChange = async event => {
    const { name, value } = event.target;
    await this.setValue(name, value);
    this.validate();
  }

  onBlur = event => {
    const { name } = event.target;
    this.setTouched(name);
  }

  render() {
    const renderForm = this.props.children;
    const form = renderForm({
      ...this.state,
      handleChange: this.onChange,
      handleBlur: this.onBlur,
      handleSubmit: this.onSubmit,
    });

    return form;
  }
}
