import {menuLayout} from './components/menu.js';
import {searchLayout} from './components/search.js';
import {filtersLayout} from './components/filters.js';
import {getFilter, getTask} from './data.js';
import BoardController from './controllers/boardController';

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

const boardController = new BoardController(main, taskMock);

boardController.init();

