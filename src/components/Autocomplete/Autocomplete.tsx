import React, {ReactElement, useState} from 'react';
import useEventListener from "@use-it/event-listener";

import results from '../../constants/fruits.json';

import styles from './Autocomplete.module.scss';
import { onKeyMap, sort } from "./logic";
import { HandleChange, HandleClick, SetAutoFillState, SetFillValueState } from "./types";

const Autocomplete = (): ReactElement => {
    const [autofill, setAutofill] = useState<SetAutoFillState>(undefined);
    const [fillValue, setFillValue] = useState<SetFillValueState>({
        text: ``,
        index: 0,
    });

    useEventListener('keydown', (e: KeyboardEvent) => onKeyMap(e, autofill!, fillValue, setFillValue ));

    const handleChange: HandleChange = (e) => {
        const input = e.target.value;

        if(!input) {
            setAutofill([])
            setFillValue({...fillValue})
        }

        const sorted = sort(input as string, results.fruits)
        setAutofill(sorted)
        setFillValue({ text: input as string, index: 0})
    }

    const handleClick: HandleClick = (e) => {
        const value = (e.target as HTMLLIElement).innerText
        setFillValue({text: value, index: autofill?.indexOf(value)!})
        document.querySelectorAll('li').forEach(element => element.classList.remove(styles.active));
        document.querySelector(`.${(e.target as HTMLLIElement).classList.value}`)?.classList.toggle(styles.active)
        e.preventDefault();
    };

    return(
        <div className={styles.inputWrapper}>
            <input onChange={handleChange} value={fillValue.text} data-testid='Autocomplete__input'/>
            <ul className={styles.resultsWrapper} data-testid='Autocomplete__input--results' >{
                autofill && autofill!.map((suggestion, index) =>
                    <li
                        className={suggestion.replace(/\s/g, '')}
                        onClick={(e) => handleClick(e)}
                        key={`${index}-${suggestion}`}
                    >{suggestion}</li>
                )}
            </ul>
        </div>
    )
}

export default Autocomplete;
