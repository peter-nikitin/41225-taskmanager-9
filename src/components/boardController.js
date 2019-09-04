import Card from "./card.js";
import CardEdit from "./card-edit.js";
import {render, Positioning, unRender} from "../utils";

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._noCards = `<section class="board container">
    <p class="board__no-tasks">
      Congratulations, all tasks were completed! To create a new click on
      «add new task» button.
    </p>
  </section>`;
  }

  init() {
    const renderTasks = (tasksData) => {
      const card = new Card(tasksData);
      const cardEdit = new CardEdit(tasksData);

      const removeEditOnESC = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          this._container.replaceChild(card.getElement(), cardEdit.getElement());
          document.removeEventListener(`keydown`, removeEditOnESC);
        }
      };

      card.getElement()
        .querySelector(`.card__btn`)
        .addEventListener(`click`, () => {
          this._container.replaceChild(cardEdit.getElement(), card.getElement());
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
          this._container.replaceChild(card.getElement(), cardEdit.getElement());
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

      render(this._container, card.getElement(), Positioning.BEFOREEND);
    };

    const activeCards = this._tasks.filter((task) => !task.isArchive);

    if (activeCards.length > 0) {
      this._tasks.forEach((task) => renderTasks(task));
    } else {
      document.querySelector(`.board`).innerHTML = this._noCards;
    }
  }
}
