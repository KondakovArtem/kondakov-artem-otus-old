/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from 'App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// async function delay(time: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, time);
//   });
// }

it('renders correctly', async () => {
  renderer.create(<App />);
});
