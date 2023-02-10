import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonVariant } from "@/models/types/ButtonVariant";

import { AccessCard } from "./AccessCard";
import { BrowserRouter } from "react-router-dom";

interface Props {
  title: string;
  variant?: ButtonVariant;
  onSubmit: Function;
  children: any;
  isValid: boolean;
}

const props = {} as Props;

describe("AccessCard", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<AccessCard {...props} />);

    expect(getByTestId("access-card")).toBeTruthy();
  });
});
