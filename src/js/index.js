import '../scss/index';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Anchor from 'grommet/components/Anchor';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Title from 'grommet/components/Title';
import TodoAppDashboard from './components/TodoAppDashboard';

const Main = () => (
  <App centered={false}>
    <Header direction='row' justify='between'
      pad={{ horizontal: 'medium' }}>
      <Title>Todo App</Title>
    </Header>
    <TodoAppDashboard />
    <Footer primary={true} appCentered={true} direction='column'
      align='center' pad='small' colorIndex='grey-1'>
      <p>
        Build your ideas with <Anchor href='http://grommet.io' target='_blank'>Grommet</Anchor>!
      </p>
    </Footer>
  </App>
);

const element = document.getElementById('content');
ReactDOM.render(React.createElement(Main), element);

document.body.classList.remove('loading');
