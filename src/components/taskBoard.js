import AbstractComponent from './abstractClass';

export default class TaskBoard extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return ` <div class="board__tasks"></div>`;
  }
}
