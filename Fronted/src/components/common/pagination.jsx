import React from "react";
import _ from "lodash";
const Pagenation = (props) => {
  const { pageSize, itemsCount, onPageChage, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination ">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link " onClick={() => onPageChage(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>      
    </nav>
  );
};

export default Pagenation;
