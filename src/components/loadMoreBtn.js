import AbstractComponent from './abstractClass';
export default class loadMoreBtnLayout extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
