import { menuLayout } from './components/menu.js';
import { searchLayout } from './components/search.js';
import { filtersLayout } from './components/filters.js';
import { cardLayout } from './components/card.js';
import { addCardLayout } from './components/addCard.js';
import { loadMoreBtnLayout } from './components/loadMoreBtn.js';
import { getFilter, getTask } from './data.js';

const renderElement = (element, layout, data) => {
  element.innerHTML += layout(data);
};

const TASK_COUNT = 3;

const tasks = Array(TASK_COUNT).fill(``).map(() => getTask());


const menu = document.querySelector(`.main__control`);
const main = document.querySelector(`.main`);
renderElement(menu, menuLayout);
renderElement(main, searchLayout);
renderElement(main, filtersLayout, getFilter(tasks));

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

renderElement(boardTasks, addCardLayout);
tasks.forEach((task) => renderElement(boardTasks, cardLayout, task))
board.appendChild(boardTasks);
renderElement(board, loadMoreBtnLayout);
main.appendChild(board);
