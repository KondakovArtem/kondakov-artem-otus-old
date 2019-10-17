import {LitElement, html, css} from 'lit-element';

// import '@polymer/iron-icons/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import './MyLeaf.js';

export class MyTreeElement extends LitElement {
  static get properties() {
    return {
      /* The total number of clicks you've done. */
      data: {type: Object},
      /* The current value of the counter. */

    }
  }

  static get styles() {
    return [css`
        :host{
          display: block;
        }
        span {
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }
        my-tree {
            padding-left: 20px;
            display:block;
        }
        my-leaf {
            padding-left: 20px;
            display:block;
        }
      `];
  }

  render() {
    return html`
        ${this.data.items && html`<iron-icon icon="folder-open"></iron-icon>`}
        <span>${this.data.title}</span>
        ${(this.data.items || []).map((item) => {
          if (item.items) {
            return html`<my-tree .data="${item}"></my-tree>`;
          }
          return html`<my-leaf .data="${item}"></my-leaf>`
        })}
    `;
  }
}

window.customElements.define('my-tree', MyTreeElement);




