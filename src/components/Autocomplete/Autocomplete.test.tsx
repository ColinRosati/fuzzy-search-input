
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Autocomplete from "./Autocomplete";

let container: null | HTMLDivElement = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
});

it("renders with or without a name", () => {
    act(() => {
        render(Autocomplete, container);
    });
    expect(container.textContent).toBe("Hey, stranger");

    act(() => {
        render(<Autocomplete/>, container);
    });
    expect(container.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Autocomplete/>, container);
    });
    expect(container.textContent).toBe("Hello, Margaret!");
});
