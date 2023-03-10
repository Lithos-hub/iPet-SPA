export const NoDataMessage = ({ message }: { message: string }) => {
  return (
    <h5 data-testid="no-data-message" className="text-red-500 text-center">
      {message}
    </h5>
  );
};
