import {createElement} from '../utils';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._elem = null;
  }
  getElement() {
    if (!this._elem) {
      this._elem = createElement(this.getTemplate());
    }
    return this._elem;
  }

  removeElement() {
    this._elem = null;
  }

  getTemplate() {
    throw new Error(`Abstract class wasnt implemented`);
  }
}
