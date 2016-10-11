// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React, { Component } from 'react';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import Section from 'grommet/components/Section';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Value from 'grommet/components/Value';

import Status from 'grommet/components/icons/Status';
import CloseIcon from 'grommet/components/icons/base/Close';

import TodoAddTaskForm from './TodoAddTaskForm';

function getLabel(label, value, colorIndex) {
  return { label, value, colorIndex };
}

export default class TodoAppDashboard extends Component {

  constructor () {
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

  _onRequestForAdd () {
    this.setState({addTask: true});
  }

  _onRequestForAddClose () {
    this.setState({addTask: false});
  }

  _onRequestForDelete (index) {
    let tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({tasks: tasks});
  }

  _onAddTask (task) {
    let tasks = this.state.tasks;
    tasks.push(task);
    this.setState({tasks: tasks, addTask: false});
  }

  render () {

    let tasksMap = {
      critical: 0,
      ok: 0,
      warning: 0
    };

    let tasks = this.state.tasks.map((task, index) => {

      tasksMap[task.status] += 1;

      let separator;
      if (index === 0) {
        separator = 'horizontal';
      }
      return (
        <ListItem key={`task_${index}`} justify='between'
          separator={separator} responsive={false}>
          <Box>
            <Status value={task.status} size='small' />
            <span>{task.label}</span>
          </Box>
          <Button plain={true}
            onClick={this._onRequestForDelete.bind(this, index)}
            icon={<CloseIcon />}
            a11yTitle={`Delete ${task.item} task`} />
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
      getLabel('Past Due', tasksMap.critical, 'critical'),
      getLabel('Due Soon', tasksMap.warning, 'warning'),
      getLabel('Done', tasksMap.ok, 'ok')
    ];

    let value, label;
    if (this.state.index >= 0) {
      value = series[this.state.index].value;
      label = series[this.state.index].label;
    } else {
      value = 0;
      series.forEach(serie => value += serie.value);
      label = 'Total';
    }

    return (
      <Section primary={true} flex={true}>
        <Box direction='row'>
          <Box basis='1/3' align="center">
            <Meter series={series} type="circle" label={false}
              onActive={(index) => this.setState({ index: index })} />
            <Box direction="row" justify="between" align="center"
              responsive={false}>
              <Value value={value} units="Tasks" align="center" label={label} />
            </Box>
          </Box>
          <Box basis='2/3' pad='medium'>
            <Heading tag='h3'>My Tasks</Heading>
            <List>
              {tasks}
            </List>
            <Box pad={{ vertical: 'large' }} align='start'>
              <Button label="Add Task" primary={true}
                onClick={this._onRequestForAdd} />
            </Box>
          </Box>
        </Box>
        {addTask}
      </Section>
    );
  }
}
