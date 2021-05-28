import React from 'react';

import { unmountComponentAtNode } from "react-dom";
import { act , isElement, isElementOfType, renderIntoDocument } from "react-dom/test-utils";
import { render, fireEvent } from '@testing-library/react';

import results from '../../constants/fruits.json'

import Autocomplete from './Autocomplete';
import { sort } from './logic'


let container: null | HTMLElement = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container!);
    container?.remove();
    container = null;
});

it("renders Autocomplete component", () => {
    if(!container){
        return;
    }

    act(() => {
        render(<Autocomplete />);
    });
    renderIntoDocument(<Autocomplete />);
    expect(isElement(<Autocomplete />)).toBe(true);
    expect(isElementOfType(<Autocomplete />, Autocomplete)).toBe(true);
});

it('returns fuzzy search results box with one item', () => {
    const { getByTestId  } = render(<Autocomplete />);
    const inputElement = getByTestId('Autocomplete__input');
    expect(inputElement.textContent).toContain('');

    fireEvent.change(inputElement, { target: { value: 'app' } });
    const resultsElement = getByTestId('Autocomplete__input--results');
    expect(resultsElement.textContent).toBe('Apple');
});

it("will sort with no input and return an array", () => {
    const actual = sort('', results.fruits)
    expect(actual).toStrictEqual([]);
})

it("will sort with 'bad' input and return an array", () => {
    const actual = sort('1', results.fruits)
    expect(actual).toStrictEqual([]);
    const actual2 = sort('#`?.-@/\b/', results.fruits)
    expect(actual2).toStrictEqual([]);
})

it("will sort case insensitive input 'a' and return an array with 5 items starting with letter 'a'", () => {
    const actual = sort('a', results.fruits)
    expect(actual?.length).toBe(5);
})

it("will sort input 'app' and return one item 'Apple'", () => {
    const actual = sort('App', results.fruits)
    expect(actual).toStrictEqual(['Apple']);
})

it("will sort input 'B' and return array with 10 items starting with letter 'b'", () => {
    const actual = sort('b', results.fruits)
    expect(actual?.length).toBe(10);
})

it("will return array of fuzzy matched fruits", () => {
    const actual = sort('a', results.fruits)
    expect(actual).toStrictEqual(["Akee", "Apple", "Apricot", "Avocado","Açaí"]);
})

it("sort utility function will remove duplicates from payload", () => {
    const actual = sort('Avo', results.fruits)
    expect(results.fruits.filter(fruit => fruit === "Avocado").length).toBe(2);
    expect(actual).toStrictEqual(["Avocado"]);
})
