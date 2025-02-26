import { LitElement, css, html } from 'lit'
import { Child1Element } from './child-1-element'
import { CharacterGetterElement } from './character-getter-element'
import { CharacterCardElement } from './character-card-Element'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * The number of times the button has been clicked
       */
      count: { type: Number },
      /**
       * An array of characters
       */
      characters: { type: Array },

    }
  }

  constructor() {
    super()
    this.count = 0
    this.characters = []

  }
  myEvent1Handler() {
    this.count++
  }

  firstUpdated() {
    const getter = this.shadowRoot.querySelector("#getter")

    for (let i = 0; i < 100; i++)
      getter.getNewCharacter()
  }


  newCharacterEventHandler(e) {
    this.characters = [...this.characters, e.detail]


  }

  render() {
    return html`
    <div class="card">
      <h1>
        count is ${this.count}
      </h1>
      <child-1-element @my-event-1= "${this.myEvent1Handler}"></child-1-element>
      <character-getter-element id="getter" @new-character-event="${this.newCharacterEventHandler}"></character-getter-element>
    <div class="character-table">
      ${this.characters.map(character => html`<character-card-element class="character-item" name="${character.name}" image="${character.image}" species="${character.species}" status="${character.status}"></character-card-element>`)}
    
    </div>
    </div>  
    `
  }


  static get styles() {
    return css`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    img{
      width: 20vw;
    }

    .character-table {
      display: grid;
      grid-template-columns: auto auto auto;
      padding-right: 10px;
      padding-bottom: 10px;
    
    }


    .character-item {
      font-size: 30px;
      text-align: center;

    }
    
    `
  }
}

window.customElements.define('my-element', MyElement)
