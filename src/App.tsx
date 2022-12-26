import { AppRouter } from "./app/router/AppRouter";
import { AppTheme } from "./theme";

export const App = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
