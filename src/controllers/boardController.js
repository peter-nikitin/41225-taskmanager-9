import Board from "../components/board.js";
import NoCards from "../components/noCards.js";
import Sort from "../components/Sort.js";
import LoadMore from "../components/loadMoreBtn";
import TaskBoard from "../components/taskBoard";
import {render, Positioning, unRender, Mode, CARDS_IN_ROW} from "../utils";
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

    this._showerCards = CARDS_IN_ROW;

    this._creatingTask = null;

    this.subscriptions = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    // this._showStat();
  }

  init() {
    render(this._container, this._sort.getElement(), Positioning.AFTERBEGIN);
    render(this._container, this._taskBoard.getElement(), Positioning.AFTERBEGIN);
    
    this._renderBoard(this._tasks);

    this._sort.getElement()
    .addEventListener(`click`, (evt) => this._sortOnClick(evt));
  }

  hide() {
    this._board.getElement().classList.add(`visually-hidden`);
  }
  show() {
    this._board.getElement().classList.remove(`visually-hidden`);
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const defaultCard = {
      description: ``,
      dueDate: new Date(),
      tags: new Set(),
      color: [],
      repeatingDays: {},
      isFavorite: false,
      isArchive: false,
    };

    this._creatingTask = new CardController(this._taskBoard, defaultCard, Mode.ADDING, this._onDataChange, this._onViewChange);
  }

  _renderTask(task) {
    const cardController = new CardController(this._taskBoard, task, Mode.DEFAULT, this._onDataChange, this._onViewChange);
    this.subscriptions.push(cardController.setDefaultView.bind(cardController));
  }

  _renderBoard() {
    unRender(this._taskBoard.getElement());
    this._taskBoard.removeElement();

    render(this._board.getElement(), this._sort.getElement(), Positioning.BEFOREEND);
    render(this._board.getElement(), this._taskBoard.getElement(), Positioning.BEFOREEND);
    if (this._tasks.length > 0) {
      this._tasks.slice(0, this._showerCards).forEach((task) => this._renderTask(task));
    } else {
      this._board.getElement.querySelector(`.board`).innerHTML = this._noCards.getElement();
    }

    render(this._container, this._board.getElement(), Positioning.BEFOREEND);
    render(this._taskBoard.getElement(), this._loadMore.getElement(), Positioning.BEFOREEND);
    this._onClickLoadMore();
  }

  _onDataChange(newData, oldData) {
    if (newData === null) {
      this._tasks.splice(this._tasks.findIndex((element) => element === oldData), 1);
    }
    if (oldData === null) {
      this._tasks.unshift(newData);
      this._creatingTask = null;
    }
    if (oldData === null && newData === null) {
      this._creatingTask = null;
    }
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

  _onClickLoadMore() {
    this._loadMore.getElement().addEventListener(`click`, () => {
      unRender(this._loadMore.getElement());
      this._tasks.slice(this._showerCards, this._showerCards + CARDS_IN_ROW).forEach((task) => this._renderTask(task));

      this._showerCards += CARDS_IN_ROW;
      console.log(this._showerCards)
      if ( this._tasks.length >= this._showerCards) {

        render(this._taskBoard.getElement(), this._loadMore.getElement(), Positioning.BEFOREEND);
      }

    })
  }


}
