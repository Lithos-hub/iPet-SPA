import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<Button />);

    expect(getByTestId("button")).toBeTruthy();
  });
  it("renders correctly the title", () => {
    const { getByText } = render(<Button title="test" />);
    expect(getByText("test")).toBeTruthy();
  });
});
