import AbstractComponent from './abstractClass';

export default class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
