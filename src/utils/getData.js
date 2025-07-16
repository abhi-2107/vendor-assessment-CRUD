export const getData = (pageNo, perPage) => {
  return fetch(
    `http://localhost:3000/vendors?_page=${pageNo}&_per_page=${perPage}`
  ).then((res) => {
    if (!res.ok) {
      throw Error(res);
    }
    return res.json();
  });
};
