import AbstractComponent from './abstractClass';

export default class TaskBoard extends AbstractComponent {
  getTemplate() {
    return ` <div class="board__tasks"></div>`;
  }
}
