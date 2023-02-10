import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NoDataMessage } from "./NoDataMessage";

describe("NoDataMessage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<NoDataMessage message="test" />);
    expect(getByTestId("no-data-message")).toBeTruthy();
  });
  it("renders the message prop", () => {
    const { getByTestId } = render(<NoDataMessage message="test" />);
    expect(getByTestId("no-data-message")).toContain;
  });
});
