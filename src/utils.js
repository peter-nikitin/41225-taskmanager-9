export const Positioning = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export const createElement = (template) => {
  const newElem = document.createElement(`div`);
  newElem.innerHTML = template;
  return newElem.firstElementChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case Positioning.AFTERBEGIN:
      container.prepend(element);
      break;
    case Positioning.BEFOREEND:
      container.append(element);
      break;
  }
};

export const unRender = (element) => {
  if (element) {
    element.remove();
  }
};
