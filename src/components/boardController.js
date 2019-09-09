import Card from "./card.js";
import CardEdit from "./card-edit.js";
import Sort from "./Sort.js";
import LoadMore from "./loadMoreBtn";
import TaskBoard from "./taskBoard";
import {render, Positioning, unRender} from "../utils";

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._taskBoard = new TaskBoard();
    this._noCards = `<section class="board container">
    <p class="board__no-tasks">
      Congratulations, all tasks were completed! To create a new click on
      «add new task» button.
    </p>
  </section>`;
  }

  init() {
    const sort = new Sort();
    const loadMore = new LoadMore();

    const activeCards = this._tasks.filter((task) => !task.isArchive);
    render(this._container, sort.getElement(), Positioning.AFTERBEGIN);

    if (activeCards.length > 0) {
      this._tasks.forEach((task) => this._renderTasks(task));
    } else {
      document.querySelector(`.board`).innerHTML = this._noCards;
    }
    render(this._container, this._taskBoard.getElement(), Positioning.BEFOREEND);
    render(this._container, loadMore.getElement(), Positioning.BEFOREEND);

    sort.getElement()
    .addEventListener(`click`, (evt) => this._sortOnClick(evt));
  }

  _renderTasks(tasksData) {
    const card = new Card(tasksData);
    const cardEdit = new CardEdit(tasksData);

    const removeEditOnESC = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._taskBoard.getElement().replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, removeEditOnESC);
      }
    };

    card.getElement()
      .querySelector(`.card__btn`)
      .addEventListener(`click`, () => {
        this._taskBoard.getElement().replaceChild(cardEdit.getElement(), card.getElement());
        document.addEventListener(`keydown`, removeEditOnESC);
      });
    cardEdit.getElement()
      .querySelector(`.card__delete`)
      .addEventListener(`click`, () => {
        unRender(cardEdit.getElement());
        cardEdit.removeElement();
        document.removeEventListener(`keydown`, removeEditOnESC);
      });

    cardEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskBoard.getElement().replaceChild(card.getElement(), cardEdit.getElement());
        document.removeEventListener(`keydown`, removeEditOnESC);
      });

    cardEdit.getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, removeEditOnESC);
      });
    cardEdit.getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, removeEditOnESC);
      });

    render(this._taskBoard.getElement(), card.getElement(), Positioning.BEFOREEND);
  }

  _sortOnClick(evt) {
    const target = evt.target;
    this._taskBoard.getElement().innerHTML = ``;
    switch (target.dataset.sort) {
      case `up`:
        const sortUP = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortUP.forEach((task) => this._renderTasks(task));
        break;
      case `down`:
        const sortDown = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortDown.forEach((task) => this._renderTasks(task));
        break;
      case `default`:
        this._tasks.forEach((task) => this._renderTasks(task));
        break;
    }
  }
}
