import styles from "./Autocomplete.module.scss";

export const sort = (input: string, results: string[]): string[] | undefined => {
    if(!input || input === ''){
        return [];
    }

    let sorted: string[] = [];

    if(input){
        sorted = Array.from(new Set(results.filter(x => x.toLowerCase() !== input.toLowerCase() && x.toLowerCase().startsWith(input.toLowerCase()))
            .sort((a, b) => {
                if (a > b) {
                    return 1;
                }
                if (a < b) {
                    return -1;
                }
                return 0;
            })));
    }

    return sorted;
};

export const onKeyMap = (e: KeyboardEvent, autofill: string[], fillValue: {text: string, index: number}, setFillValue: React.Dispatch<React.SetStateAction<{text: string, index: number}>>) => {
    document.querySelectorAll('li').forEach(element => element.classList.remove(styles.active));

    if (e.code === 'Enter') {
        setFillValue({
            ...fillValue,
            text: autofill![fillValue.index]
        })
    }

    if (e.code === 'ArrowUp' && autofill) {
        const _index = fillValue.index > 0 ? fillValue.index - 1 : fillValue.index + autofill.length;

        setFillValue({...fillValue, index: _index});

        document.querySelector(`.${autofill && autofill[_index]?.replace(/\\s/g, '')}`)
            ?.classList.toggle(styles.active);
    }

    if (e.code === 'ArrowDown' && autofill) {
        const _index = fillValue.index < autofill.length ? fillValue.index + 1 : fillValue.index - autofill.length;

        setFillValue({...fillValue, index: _index});
        document.querySelector(`.${autofill && autofill[_index]?.replace(/\\s/g, '')}`)
            ?.classList.toggle(styles.active);
    }
}
