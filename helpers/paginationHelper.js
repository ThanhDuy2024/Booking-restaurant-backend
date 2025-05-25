export const paginationHelper = (requestPage, pages, limit, skip) => {
  let page = 1;

  if(requestPage < 1) {
    page = 1;
  } else if(requestPage > pages) {
    page = pages
  } else {
    page = requestPage;
  }

  skip = (page - 1) * limit;

  if(skip < 0) {
    skip = 0
  }

  const pagination = {
    skip: skip,
    pages: pages,
  };
  return pagination;
}