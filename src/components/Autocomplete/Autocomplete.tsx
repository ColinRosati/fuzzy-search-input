import { ReactElement, useState} from 'react';
import useEventListener from "@use-it/event-listener";

import results from '../../constants/fruits.json';

import styles from './Autocomplete.module.scss';
import { onKeyMap, sort } from "./logic";
import type { HandleInputChange, HandleClickSuggestion, SetAutoFillState, SetFillValueState } from "./types";

const Autocomplete = (): ReactElement => {
    const [autofill, setAutofill] = useState<SetAutoFillState>(undefined);
    const [fillValue, setFillValue] = useState<SetFillValueState>({
        text: ``,
        index: 0,
    });

  useEventListener('keydown', (e: KeyboardEvent) => onKeyMap(e, autofill!, fillValue, setFillValue));

    const handleInputChange: HandleInputChange = (e) => {
        const input = e.target.value;

        if(!input) {
          setAutofill([]);
          setFillValue({ ...fillValue });
        }

      const sorted = sort(input as string, results.fruits);
      setAutofill(sorted);
      setFillValue({ text: input as string, index: 0 });
    }

    const handleClickSuggestion: HandleClickSuggestion = (e) => {
      const value = (e.target as HTMLLIElement).innerText
      const newFillState = { text: value, index: autofill?.indexOf(value)! };

      setFillValue(newFillState)
    };
  
  const setActiveStyle = (value: string): string => {
    return fillValue.text === value ? styles.active: ""
  }

    return(
        <div className={styles.inputWrapper}>
            <input onChange={handleInputChange} value={fillValue.text} data-testid='Autocomplete__input'/>
            <ul className={styles.resultsWrapper} data-testid='Autocomplete__input--results' >{
                autofill && autofill!.map((suggestion, index) =>
                  <li 
                    onClick={(e) => handleClickSuggestion(e)}
                    className={setActiveStyle(suggestion)}
                    key={`${index}-${suggestion}`}
                    >{suggestion}</li>
                )}
            </ul>
        </div>
    )
}

export default Autocomplete;
