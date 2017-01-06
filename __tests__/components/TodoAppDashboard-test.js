import React from 'react';
import TodoAppDashboard from '../../src/js/components/TodoAppDashboard';
import renderer from 'react-test-renderer';

test('TodoAppDashboard renders', () => {
  const component = renderer.create(
    <TodoAppDashboard />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
