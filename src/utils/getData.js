export const getData = (pageNo, perPage, filterStr) => {
  return fetch(
    `http://localhost:3000/vendors?_page=${pageNo}&_per_page=${perPage}&${filterStr}`
  ).then((res) => {
    if (!res.ok) {
      throw Error(res);
    }
    return res.json();
  });
};
