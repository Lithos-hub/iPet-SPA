import { render, screen } from "@testing-library/react";

import { AlertMessage } from "./AlertMessage";

describe("AlertMessage", () => {
  it("should render", () => {
    render(<AlertMessage />);
  });
});
