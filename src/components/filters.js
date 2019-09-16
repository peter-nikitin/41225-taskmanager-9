import AbstractComponent from './abstractClass';
// import {getFilter, getTask} from './data.js';
export default class Filters extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
    this._filters = {
      All: (this._data.length - this._data.filter((task) => task.isArchive).length),
      Overdue: (this._data.filter((task) => task.dueDate < Date.now()).length),
      Today: this._data.filter((task) => task.dueDate === Date.now()).length,
      Favorites: this._data.filter((task) => task.isFavorite).length,
      Archive: this._data.filter((task) => task.isArchive).length,
      Repeating: this._data.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])).length,
      Tags: new Set(this._data.map((task) => task.tags)).size,
    }
  }
  getTemplate() {
    return `
    <section class="main__filter filter container">
      ${ Object.keys(this._filters).map((filter) => `<input
      type="radio"
      id="filter__${String(filter).toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${this._filters[filter] > 0 ? `` : `disabled`}
      />
      <label for="filter__all" class="filter__label">
      ${filter} <span class="filter__all-count">${this._filters[filter]}</span>
      </label>`).join(``)}
    </section>`.trim();
  }
}
