export const CalendarEvent = ({ event }: any) => {
  const { title } = event;
  return (
    <div className="p-2 ">
      <strong>{title}</strong>
    </div>
  );
};
