export const filtersLayout = (filters) =>
  `<section class="main__filter filter container">
      ${ Object.keys(filters).map((filter) => `<input
      type="radio"
      id="filter__${String(filter).toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${filters[filter] > 0 ? `` : `disabled`}
      />
      <label for="filter__all" class="filter__label">
      ${filter} <span class="filter__all-count">${filters[filter]}</span>
      </label>`)}
    </section>`.trim();
