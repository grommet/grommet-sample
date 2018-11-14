// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Meter,
  Text
} from 'grommet';

import { Close, StatusCriticalSmall, StatusGoodSmall, StatusWarningSmall } from 'grommet-icons';

import TodoAddTaskForm from './TodoAddTaskForm';

function getLabel(label, value, color) {
  return { label, value, color };
}

class DeleteTaskButton extends Component {
  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const { task, onDelete } = this.props;
    onDelete(task);
  }

  render() {
    const { task } = this.props;
    return (
      <Button plain={true}
        onClick={this._onClick}
        icon={<Close />}
        a11yTitle={`Delete ${task.item} task`} />
    );
  }
}

DeleteTaskButton.propTypes = {
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

const List = props => <Box fill tag='ul' border='top' {...props} />;

const ListItem = props => (
  <Box
    align='center'
    tag='li'
    direction='row'
    {...props}
  />
);

const Critical = props => (
  <StatusCriticalSmall
    color='status-critical'
    size='small'
    {...props}
  />
);

const Warning = props => (
  <StatusWarningSmall
    color='status-warning'
    size='small'
    {...props}
  />
);

const Good = props => (
  <StatusGoodSmall
    color='status-ok'
    size='small'
    {...props}
  />
);

export default class TodoAppDashboard extends Component {

  constructor() {
    super();

    this._onRequestForAdd = this._onRequestForAdd.bind(this);
    this._onRequestForAddClose = this._onRequestForAddClose.bind(this);
    this._onRequestForDelete = this._onRequestForDelete.bind(this);
    this._onAddTask = this._onAddTask.bind(this);

    this.state = {
      tasks: [],
      addTask: false
    };
  }

  _onRequestForAdd() {
    this.setState({ addTask: true });
  }

  _onRequestForAddClose() {
    this.setState({ addTask: false });
  }

  _onRequestForDelete(task) {
    const { tasks } = this.state;
    const index = this.state.tasks.indexOf(task);
    tasks.splice(index, 1);
    this.setState({ tasks });
  }

  _onAddTask(task) {
    const tasks = this.state.tasks;
    tasks.push(task);
    this.setState({ tasks, addTask: false });
  }

  _onMeterActive(index) {
    this.setState({ index });
  }

  render() {
    const tasksMap = {
      critical: 0,
      ok: 0,
      warning: 0
    };

    const statusIcons = {
      'critical': Critical,
      'warning': Warning,
      'ok': Good
    };

    const tasks = this.state.tasks.map((task, index) => {
      console.log(tasks);
      tasksMap[task.status] += 1;

      return (
        <ListItem key={`task_${index}`} justify='between'
          border='horizontal' responsive={false}>
          <Box direction='row' justify='between' fill responsive={false}
            pad='small' align='center'>
            <Box direction='row' align='center' gap='small'>
              {statusIcons[task.status]()}
              <span>{task.label}</span>
            </Box>
            <Box align='end'>
              <DeleteTaskButton task={task} onDelete={this._onRequestForDelete} />
            </Box>
          </Box>
        </ListItem>
      );
    }, this);

    let addTask;
    if (this.state.addTask) {
      addTask = (
        <TodoAddTaskForm onClose={this._onRequestForAddClose}
          onSubmit={this._onAddTask} />
      );
    }

    const series = [
      getLabel('Past Due', tasksMap.critical, 'status-critical'),
      getLabel('Due Soon', tasksMap.warning, 'status-warning'),
      getLabel('Done', tasksMap.ok, 'status-ok')
    ];

    let value;
    let label;
    if (this.state.index >= 0) {
      value = series[this.state.index].value;
      label = series[this.state.index].label;
    } else {
      value = 0;
      series.forEach(serie => value += serie.value);
      label = 'Total';
    }


    return (
      <Box tag='section'>
        <Box direction='row'>
          <Box basis='1/3' align='center'>
            <Meter values={series} type='circle' size='small' background='light-2' />
            <Box direction='row' justify='between' align='center'
              responsive={false}>
              <Box full align='center' justify='between' pad='small' >
                <Text size='xlarge'> {value} Tasks </Text>
                <Text> {label} </Text>
              </Box>
            </Box>
          </Box>
          <Box pad='medium' basis='2/3'>
            <Text margin={{ vertical: 'small' }} size='large'>My Tasks</Text>
            <List>
              {tasks.map(task => (task))}
            </List>
            <Box pad={{ vertical: 'large' }} align='start' flex={false}>
              <Button label='Add Task' background='brand' onClick={this._onRequestForAdd} />
            </Box>
          </Box>
        </Box>
        {addTask}
      </Box>
    );
  }
}
