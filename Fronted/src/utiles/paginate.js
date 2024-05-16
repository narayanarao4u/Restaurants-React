import _ from "lodash";

export function paginate(items, pageNumber, PageSize) {
  const startIndex = (pageNumber - 1) * PageSize;
  return _(items).slice(startIndex).take(PageSize).value();
}
