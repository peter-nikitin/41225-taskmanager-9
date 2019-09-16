import {getTask} from './data.js';
import BoardController from './controllers/boardController';


const TASK_COUNT = 3;

const taskMock = Array(TASK_COUNT).fill(``).map(() => getTask());

const main = document.querySelector(`.main`);

const boardController = new BoardController(main, taskMock);

boardController.init();

