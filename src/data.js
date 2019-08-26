export const getFilter = (tasks) => ({
  All: tasks.length,
  Overdue: tasks.filter((task) => task.dueDate < Date.now()).length,
  Today: tasks.filter((task) => task.dueDate === Date.now()).length,
  Favorites: tasks.filter((task) => task.isFavorite).length,
  Archive: tasks.filter((task) => task.isArchive).length,
  Repeating: tasks.filter((task) => Object.keys(task.repeatingDays).some((day) => task.repeatingDays[day])).length,
  Tags: new Set(tasks.map((task) => task.tags)).size,
});