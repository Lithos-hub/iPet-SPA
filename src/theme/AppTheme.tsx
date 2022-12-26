import { ThemeProvider } from "@emotion/react";
import { cyanTheme } from "./";

export const AppTheme = ({ children }: any) => {
  return (
    <ThemeProvider theme={cyanTheme}>
      {/* children = App */}
      {children}
    </ThemeProvider>
  );
};
