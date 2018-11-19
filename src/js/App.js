import React, { Component } from 'react';

import {
  Anchor,
  Box,
  Grommet,
  Text
} from 'grommet';

import TodoAppDashboard from './components/TodoAppDashboard';
import { v1 } from 'grommet-theme-v1';

export default class SampleApp extends Component {
  render() {
    return (
      <Grommet full={true} theme={v1}>
        <Box fill justify='between' direction='column'>
          <Box>
            <Box tag='header' direction='row' pad='medium'>
              <Text size='large' weight='bold'>Todo App</Text>
            </Box>
            <TodoAppDashboard />
          </Box>
          <Box tag='footer' direction='column' align='center' background='black' pad={{ vertical: 'medium' }} >
            <p>
              Build your ideas with <Anchor href='http://grommet.io' target='_blank'>Grommet</Anchor>!
            </p>
          </Box>
        </Box>
      </Grommet>
    );
  }
}
