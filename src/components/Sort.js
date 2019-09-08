import AbstractComponent from './abstractClass';
export default class Sort extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list">
    <a href="#" class="board__filter" data-sort="default">SORT BY DEFAULT</a>
    <a href="#" class="board__filter" data-sort="up">SORT BY DATE up</a>
    <a href="#" class="board__filter" data-sort="down">SORT BY DATE down</a>
    </div>`;
  }
}
