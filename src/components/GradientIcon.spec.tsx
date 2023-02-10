import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GradientIcon } from "./GradientIcon";

describe("GradientIcon", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<GradientIcon />);

    expect(getByTestId("gradient-icon")).toBeTruthy();
  });
});
