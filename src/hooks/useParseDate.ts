export const useParseDate = () => {
  const format = (date: string) => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();
    return new Date(year, month, day);
  };

  return {
    format,
  };
};
