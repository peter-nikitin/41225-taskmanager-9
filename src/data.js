export const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    mo: Boolean(Math.round(Math.random())),
    tu: Boolean(Math.round(Math.random())),
    we: Boolean(Math.round(Math.random())),
    th: Boolean(Math.round(Math.random())),
    fr: Boolean(Math.round(Math.random())),
    sa: Boolean(Math.round(Math.random())),
    su: Boolean(Math.round(Math.random()))
  },
  tags: new Set([
    `cinema`,
    `entertainment`,
    `myself`,
    `cinema`,
  ]),
  color: colors[Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});
