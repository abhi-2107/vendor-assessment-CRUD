export const getData = () => {
  return fetch("http://localhost:3000/vendors?_page=1&_per_page=25").then(
    (res) => {
      if (!res.ok) {
        throw Error(res);
      }
      return res.json();
    }
  );
};
