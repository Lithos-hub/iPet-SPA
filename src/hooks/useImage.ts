export const useImage = () => {
  const id = localStorage.getItem("id");

  const i = (name: string) =>
    `${
      import.meta.env.VITE_API_URL
    }/${id}/${name}?query=${new Date().getTime()}`;

  return {
    i,
  };
};
