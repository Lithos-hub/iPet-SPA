import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AgendaTabs } from "./AgendaTabs";
import { BrowserRouter } from "react-router-dom";

describe("AgendaTabs", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<AgendaTabs />, { wrapper: BrowserRouter });

    expect(getByTestId("agenda-tabs")).toBeTruthy();
  });
});
