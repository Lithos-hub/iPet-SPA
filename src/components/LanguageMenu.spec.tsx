import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LanguageMenu } from "./LanguageMenu";

describe("LanguageMenu", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<LanguageMenu />);

    const button = getByTestId("language-button");
    expect(button).toBeTruthy();

    fireEvent.click(button);

    const menu = getByTestId("language-menu");
    expect(menu).toBeTruthy();
  });
});
