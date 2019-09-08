import Card from "../components/card.js";
import CardEdit from "../components/card-edit.js";
import Board from "../components/board.js";
import NoCards from "../components/noCards.js";
import Sort from "../components/Sort.js";
import LoadMore from "../components/loadMoreBtn";
import TaskBoard from "../components/taskBoard";
import {render, Positioning, unRender} from "../utils";
import CardController from './cardContainer';

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._taskBoard = new TaskBoard();
    this._board = new Board();
    this._noCards = new NoCards();
    this._sort = new Sort();
    this._loadMore = new LoadMore();

    this.subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  init() {
    render(this._container, this._sort.getElement(), Positioning.AFTERBEGIN);
    this._renderBoard(this._tasks);
    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._sortOnClick(evt));
  }

  _renderTask(task) {
    const cardController = new CardController(this._taskBoard, task, this._onDataChange, this._onViewChange);
    this.subscriptions.push(cardController.setDefaultView.bind(cardController));
  }

  _renderBoard(tasks) {
    unRender(this._taskBoard.getElement());
    this._taskBoard.removeElement();

    render(this._board.getElement(), this._sort.getElement(), Positioning.BEFOREEND);
    render(this._board.getElement(), this._taskBoard.getElement(), Positioning.BEFOREEND);
    render(this._board.getElement(), this._loadMore.getElement(), Positioning.BEFOREEND);

    if (tasks.length > 0) {
      tasks.forEach((task) => this._renderTask(task));
    } else {
      this._board.getElement.querySelector(`.board`).innerHTML = this._noCards.getElement();
    }

    render(this._container, this._board.getElement(), Positioning.BEFOREEND);

  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((element) => element === oldData)] = newData;
    this._renderBoard(this._tasks);

  }

  _onViewChange() {
    this.subscriptions.forEach((cardDefaultView) => cardDefaultView());
  }

  _sortOnClick(evt) {
    const target = evt.target;
    this._taskBoard.getElement().innerHTML = ``;
    switch (target.dataset.sort) {
      case `up`:
        const sortUP = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._renderBoard(sortUP);
        break;
      case `down`:
        const sortDown = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._renderBoard(sortDown);
        break;
      case `default`:
        this._renderBoard(this._tasks);
        break;
    }
  }
}