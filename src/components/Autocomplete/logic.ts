const filterResultsInputMatched = (result: string, input: string) =>
  result.toLowerCase() !== input.toLowerCase() && result.toLowerCase().startsWith(input.toLowerCase());

const sortDescending = (a: string, b: string) => a > b ? 1 : -1;

export const sort = (input: string, results: string[]): string[] => {
    if(!input || input === ''){
        return [];
    }

    let sorted: string[] = [];

    if(input){
      sorted = Array.from(
        new Set(
          results.filter((result) => filterResultsInputMatched(result, input))
            .sort(sortDescending)));
    }

    return sorted;
};

const keyIteration: Record<string, number> = {
  'ArrowDown' : +1,
  'ArrowUp': -1
}

export const onKeyMap = (e: KeyboardEvent, autofill: string[], fillValue: {text: string, index: number}, setFillValue: React.Dispatch<React.SetStateAction<{text: string, index: number}>>) => {
  if (autofill?.length && typeof keyIteration[e.code] === 'number') {
    const suggestionIncrement = keyIteration[e.code];
    const newIndex = suggestionIncrement + fillValue.index;
    // reset when boundary limits reached 
    const boundaryIndex = newIndex === -1 ? autofill.length - 1 : 0;
    const index = autofill[newIndex] ? newIndex : boundaryIndex;
    const newValue = autofill[index];

    setFillValue({text: newValue, index});
  }
}
