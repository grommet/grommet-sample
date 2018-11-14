import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  TextArea,
  Select,
} from 'grommet';

import { Close } from 'grommet-icons';

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

    this.selectMapToValue = {
      'Done': 'ok',
      'Warning': 'warning',
      'Past Due': 'critical'
    };
  }

  _onSubmit(event) {
    event.preventDefault();
    console.log(this.state.label);
    if (this.state.label) {
      console.log(this.state.status.value);
      this.props.onSubmit({
        label: this.state.label,
        status: this.selectMapToValue[this.state.status.value] || 'ok'
      });
    }
  }

  _onLabelChange(event) {
    this.setState({ label: event.target.value });
  }

  _onStatusChange(option) {
    this.setState({ status: option });
  }

  render() {
    return (
      <Layer position='right' full='vertical' modal
        onClickOutside={this.props.onClose} onClose={this.props.onClose}>
        <Box pad='large'>
          <Box tag='header' justify='between' direction='row' pad={{ vertical: 'medium' }} >
            <Heading level='3'>Add Task</Heading>
            <Button icon={<Close />} onClick={this.onClose} />
          </Box>
          <form onSubmit={this._onSubmit}>
            <Box border='top,left' pad='small'>
              <FormField label='Task' htmlFor='labelId'>
                <TextArea
                  id='labelId'
                  name='label'
                  onChange={this._onLabelChange}
                />
              </FormField>
            </Box>
            <Box border='top,left' pad='small'>
              <FormField label='Status' htmlFor='statusId'>
                <Select
                  id='select'
                  placeholder='Select'
                  value={this.state.status}
                  options={['Done', 'Warning', 'Past Due']}
                  onChange={this._onStatusChange}
                />
              </FormField>
            </Box>
          </form>
          <Box pad={{ vertical: 'large' }} align='start' tag='footer'>
            <Button type='submit'
              label='Add' onClick={this._onSubmit} />
          </Box>
        </Box>
      </Layer>
    );
  }
}

TodoAddTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
