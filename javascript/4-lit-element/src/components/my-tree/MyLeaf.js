import {LitElement, html, css} from 'lit-element';
import '@polymer/iron-icons/iron-icons.js';


export class MyLeafElement extends LitElement {
  static get properties() {
    return {
      data: {type: Object},
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
      `];
  }

  render() {
    return html`
        <iron-icon icon="folder"></iron-icon>
        <span>${this.data.title}</span>
    `;
  }

}


window.customElements.define('my-leaf', MyLeafElement);




