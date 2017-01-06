import React, { Component, PropTypes } from 'react';

import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Layer from 'grommet/components/Layer';

export default class TodoAddTaskForm extends Component {
  constructor() {
    super();

    this._onSubmit = this._onSubmit.bind(this);
    this._onLabelChange = this._onLabelChange.bind(this);
    this._onStatusChange = this._onStatusChange.bind(this);

    this.state = {
      label: undefined,
      status: undefined
    };
  }

  _onSubmit(event) {
    event.preventDefault();
    if (this.state.label) {
      this.props.onSubmit({
        label: this.state.label,
        status: this.state.status || 'ok'
      });
    }
  }

  _onLabelChange(event) {
    this.setState({ label: event.target.value });
  }

  _onStatusChange(event) {
    this.setState({ status: event.target.value });
  }

  render() {
    return (
      <Layer align='right' closer={true} onClose={this.props.onClose}>
        <Header pad={{ vertical: 'large' }}>
          <Heading>Add Task</Heading>
        </Header>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label='Task' htmlFor='labelId'>
                <input type='text' name='label' id='labelId'
                  onChange={this._onLabelChange} />
              </FormField>
              <FormField label='Status' htmlFor='statusId'>
                <select name='status' id='statusId'
                  onChange={this._onStatusChange}>
                  <option value='ok'>Done</option>
                  <option value='warning'>Warning</option>
                  <option value='critical'>Past Due</option>
                </select>
              </FormField>
            </fieldset>
          </FormFields>
        </Form>
        <Footer pad={{ vertical: 'large' }}>
          <Button primary={true} type='submit'
            label='Add' onClick={this._onSubmit} />
        </Footer>
      </Layer>
    );
  }
}

TodoAddTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
