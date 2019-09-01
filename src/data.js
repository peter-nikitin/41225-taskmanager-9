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
    Mo: Boolean(Math.round(Math.random())),
    Tu: Boolean(Math.round(Math.random())),
    We: Boolean(Math.round(Math.random())),
    Th: Boolean(Math.round(Math.random())),
    Fr: Boolean(Math.round(Math.random())),
    Sa: Boolean(Math.round(Math.random())),
    Su: Boolean(Math.round(Math.random()))
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
export const getFilter = (tasks) => ({
  All: (tasks.length - tasks.filter((task) => task.isArchive).length),
  Overdue: (tasks.filter((task) => task.dueDate < Date.now()).length),
  Today: tasks.filter((task) => task.dueDate === Date.now()).length,
  Favorites: tasks.filter((task) => task.isFavorite).length,
  Archive: tasks.filter((task) => task.isArchive).length,
  Repeating: tasks.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])).length,
  Tags: new Set(tasks.map((task) => task.tags)).size,
});
