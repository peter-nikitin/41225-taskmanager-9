import Card from "../components/card.js";
import CardEdit from "../components/card-edit.js";
import {render, Positioning, unRender, Mode} from "../utils";

export default class CardContainer {
  constructor(container, data, mode, onDataChange, onViewChange) {
    this._container = container.getElement();
    this._data = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._newData = {...this._data};
    this.create(mode);
  }

  create(mode) {

    let renderPosition = Positioning.BEFOREEND;
    let currentView = this._card;
    if (mode === Mode.ADDING) {
      renderPosition = Positioning.AFTERBEGIN;
      currentView = this._cardEdit;
    }

    const removeEditOnESC = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.replaceChild(this._card.getElement(), this._this._cardEdit.getElement());
        document.removeEventListener(`keydown`, removeEditOnESC);
      }
    };

    this._card.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        if (mode === Mode.DEFAULT) {
          this._onViewChange();
          this._container.replaceChild(this._cardEdit.getElement(), this._card.getElement());
        } else if (mode === Mode.ADDING) {
          this._container.removeChilde(currentView.getElement());
          this._onDataChange(null, null);
        }
        document.addEventListener(`keydown`, removeEditOnESC);
      });

    this._card.getElement().querySelector(`.card__btn--archive`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();

          this._newData.isArchive = !this._data.isArchive;
          this._onDataChange(this._newData, this._data);
        });

    this._card.getElement().querySelector(`.card__btn--favorites `)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();

          this._newData.isFavorite = !this._data.isFavorite;
          this._onDataChange(this._newData, this._data);
        });

    this._cardEdit.getElement().querySelector(`.card__btn--archive`)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();

          this._newData.isArchive = !this._data.isArchive;
          this._onDataChange(this._newData, this._data);

        });

    this._cardEdit.getElement().querySelector(`.card__btn--favorites `)
        .addEventListener(`click`, (evt) => {
          evt.preventDefault();

          this._newData.isFavorite = !this._data.isFavorite;
          this._onDataChange(this._newData, this._data);
        });

    this._cardEdit.getElement()
      .querySelector(`.card__delete`)
      .addEventListener(`click`, () => {
        document.removeEventListener(`keydown`, removeEditOnESC);

        this._onDataChange(null, this._data);
      });

    this._cardEdit.getElement()
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._toggelDateField();
      });

    this._cardEdit.getElement()
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._toggleRepeat();
      });

    this._cardEdit.getElement()
      .querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `LABEL`) {
          this._changeColor(evt.target.textContent);
        }
      });

    this._cardEdit.getElement()
      .querySelector(`.card__save`)
      .addEventListener(`click`, (e) => {
        e.preventDefault();
        const formData = new FormData(this._cardEdit.getElement().querySelector(`.card__form`));

        const newState = {
          description: formData.get(`text`),
          dueDate: new Date(formData.get(`date`)),
          repeatingDays: formData.getAll(`repeat`).reduce(
              (accomulator, current) => {
                accomulator[current] = true;
                return accomulator;
              }, {
                mo: false,
                tu: false,
                we: false,
                th: false,
                fr: false,
                sa: false,
                su: false
              }),
          tags: new Set(formData.getAll(`hashtag`)),
          color: formData.get(`color`)
        };
        if (mode === Mode.ADDING) {
          this._onDataChange(newState, null);
        } else if (mode === Mode.DEFAULT) {
          this._onDataChange(newState, this._data);
        }

        this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
        document.removeEventListener(`keydown`, removeEditOnESC);
      });

    this._cardEdit.getElement()
      .querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, removeEditOnESC);
      });
    this._cardEdit.getElement()
      .querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, removeEditOnESC);
      });
    this._cardEdit.getElement()
      .querySelector(`input.card__hashtag-input`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, removeEditOnESC);
        // document.addEventListener(`keydown`, (evt) => this._addTage(evt));
      });

    render(this._container, currentView.getElement(), renderPosition);
  }

  _toggelDateField() {
    this._cardEdit.getElement().querySelector(`.card__date-deadline`).style.display = (this._cardEdit.getElement().querySelector(`.card__date-deadline`).style.display === `none`) ? `block` : `none`;
    this._cardEdit.getElement().querySelector(`.card__date-status`).textContent = (this._cardEdit.getElement().querySelector(`.card__date-status`).textContent === `yes`) ? `no` : `yes`;
  }

  _toggleRepeat() {
    this._cardEdit.getElement().querySelector(`.card__repeat-days`).style.display = (this._cardEdit.getElement().querySelector(`.card__repeat-days`).style.display === `none`) ? `block` : `none`;
    this._cardEdit.getElement().querySelector(`.card__repeat-status`).textContent = (this._cardEdit.getElement().querySelector(`.card__repeat-status`).textContent === `yes`) ? `no` : `yes`;
    this._container.querySelector(`.card--edit`).classList.toggle(`card--repeat`);

    const days = this._cardEdit.getElement().querySelectorAll(`.card__repeat-day-input`);

    days.forEach((day) => {
      if (day.checked) {
        day.checked = false;
      } else {
        day.checked = this._data.repeatingDays[day.value];
      }
    });
  }

  _changeColor(color) {
    const card = this._container.querySelector(`.card--edit`);
    const classList = card.className.split(` `);
    classList[2] = `card--${color}`;
    card.className = classList.join(` `);
  }

  setDefaultView() {
    if (this._container.contains(this._cardEdit.getElement())) {
      this._container.replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }
}
