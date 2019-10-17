import {storiesOf, html, withKnobs, withClassPropertiesKnobs} from '@open-wc/demoing-storybook';

// import {MyApp} from '../src/MyApp.js';
import {MyTreeElement} from '../src/components/my-tree/MyTree.js';
import { structure as myTreeData } from './components/my-tree/data.js';

storiesOf('my-app', module)
  .addDecorator(withKnobs)
  // .add('Documentation', () => withClassPropertiesKnobs(MyApp))
  // .add(
  //   'Alternative Title',
  //   () => html`
  //     <my-app .title=${'Something else'}></my-app>
  //   `
  // )
  .add('MyTree', () => withClassPropertiesKnobs(MyTreeElement, {
      template: html`
            <my-tree .data=${myTreeData}><p>foo</p></my-tree>
        `
    }
  ));
