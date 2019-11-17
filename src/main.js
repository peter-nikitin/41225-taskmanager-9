import { getTask } from "./data.js";
import { render, Positioning, unRender, Mode, CARDS_IN_ROW } from "./utils";
import Menu from "./components/menu";

import Filters from "./components/filters";
import Search from "./components/search";
import Statistic from "./components/statistic";
import BoardController from "./controllers/boardController";


import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const TASK_COUNT = 13;

const taskMock = Array(TASK_COUNT)
  .fill(``)
  .map(() => getTask());

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const menu = new Menu();
const search = new Search();
const filters = new Filters(taskMock);
const statistic = new Statistic();
statistic.getElement().classList.add(`visually-hidden`);

render();

render(mainControl, menu.getElement(), Positioning.BEFOREEND);
render(main, search.getElement(), Positioning.BEFOREEND);
render(main, filters.getElement(), Positioning.BEFOREEND);
render(main, statistic.getElement(), Positioning.BEFOREEND);

const boardController = new BoardController(main, taskMock);

boardController.init();
menu.getElement().querySelectorAll(`.control__input`).forEach((item) => {
  item.addEventListener(`change`, (evt) => {
    const target = evt.target;
    switch (target.id) {
      case `control__task`:
        boardController.show();
        statistic.getElement().classList.add(`visually-hidden`);
        break;
      case `control__statistic`:
        boardController.hide();
        statistic.getElement().classList.remove(`visually-hidden`);
        break;
      case `control__new-task`:
        boardController.createTask();
        // Вернем выделенный элемент
        menu.getElement().querySelector(`#control__task`).checked = true;
        break;
    }
  });
});
