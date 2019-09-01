import {menuLayout} from './components/menu.js';
import {searchLayout} from './components/search.js';
import {filtersLayout} from './components/filters.js';
import Card from './components/card.js';
import CardEdit from './components/card-edit.js';
import {loadMoreBtnLayout} from './components/loadMoreBtn.js';
import {getFilter, getTask} from './data.js';
import {render, Positioning} from './utils';

const renderElement = (element, layout, data) => {
  element.innerHTML += layout(data);
};

const TASK_COUNT = 3;

const taskMock = Array(TASK_COUNT).fill(``).map(() => getTask());


const menu = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
renderElement(menu, menuLayout);
renderElement(main, searchLayout);
renderElement(main, filtersLayout, getFilter(taskMock));

const board = document.createElement(`section`);
board.classList.add(`board`);
board.classList.add(`container`);
const boardTasks = document.createElement(`div`);
boardTasks.classList.add(`board__tasks`);
board.innerHTML += ` <div class="board__filter-list">
<a href="#" class="board__filter">SORT BY DEFAULT</a>
<a href="#" class="board__filter">SORT BY DATE up</a>
<a href="#" class="board__filter">SORT BY DATE down</a>
</div>`;
board.append(boardTasks);
renderElement(board, loadMoreBtnLayout);
main.appendChild(board);

const cardsContainer = document.querySelector(`.board__tasks`);

const renderTasks = (tasksData) => {
  const card = new Card(tasksData);
  const cardEdit = new CardEdit(tasksData);

  const removeEditOnESC = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      cardsContainer.replaceChild(card.getElement(), cardEdit.getElement());
      document.removeEventListener(`keydown`, removeEditOnESC);
    }
  };

  card.getElement()
    .querySelector(`.card__btn`)
    .addEventListener(`click`, () => {
      cardsContainer.replaceChild(cardEdit.getElement(), card.getElement());
      document.addEventListener(`keydown`, removeEditOnESC);
    });

  cardEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      cardsContainer.replaceChild(card.getElement(), cardEdit.getElement());
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

  render(cardsContainer, card.getElement(), Positioning.BEFOREEND);
};

taskMock.forEach((task) => renderTasks(task));
