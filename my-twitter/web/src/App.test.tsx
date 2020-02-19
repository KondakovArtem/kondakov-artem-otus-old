import React from 'react';
import {render} from '@testing-library/react';
import {App} from 'containers/app/app.container';

test('renders learn react link', () => {
  const app = render(<App />);
  expect(app).toBeDefined();
});
