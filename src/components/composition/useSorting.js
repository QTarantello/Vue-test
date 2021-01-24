const useSorting = (users, { key, direction }) => {
  switch (direction) {
    case "asc":
      return users.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    case "desc":
      return users.sort((a, b) => (a[key] < b[key] ? 1 : -1));
  }
};

export default useSorting;
