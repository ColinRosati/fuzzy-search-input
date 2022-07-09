# Fuzzy Search input

This input fuzzy search or autocompletes search results. The data comes from JSON file of fruits in this repo `src/constants/fruits.JSON`

<img width="354" alt="Screenshot 2022-07-09 at 11 26 47 AM" src="https://user-images.githubusercontent.com/16339467/178099995-a5fe02e8-bde9-4972-832b-1a43e9b5b529.png">

-----
<img width="346" alt="Screenshot 2022-07-09 at 11 25 02 AM" src="https://user-images.githubusercontent.com/16339467/178099971-49ef075e-f890-4169-b023-2ada0a168d6a.png">

-----
<img width="343" alt="Screenshot 2022-07-09 at 11 24 42 AM" src="https://user-images.githubusercontent.com/16339467/178099973-d259e717-be92-4451-8ade-3a64387309e0.png">

----- 
Screenshots


## Steps to run

### `yarn` or `npm install`

Download dependencies

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

To run unit tests

## Criteria


### Functional requirements:
1. It must be built in React; feel free to use a styling solution of your choice
2. Upon typing, the widget fuzzy-matches case-insensitively against the list at the end of this document and presents list items that contain the matched characters as suggestions
3. Clicking an autocomplete suggestion should fill in the input with the full text
4. Using the up and down arrow keys should allow the user to highlight a desired suggestion and press Enter to select it, filling in the input
5. The input should be a valid HTML text input element to be used in a standard HTML form setup
6. The user should be able to proceed without choosing one of the suggestions (non-exclusive)

### Styling requirements:
1. The widget match suggestions should appear below the text input as a floating container
2. The floating suggestion area should become scrollable when there are many suggestions
3. The matched portion of the suggestion should be highlighted in some way


## Misc comments

this is the result of developing a fuzzy search input in a 3 hour code sprint.
If I had more time I would have made more integration tests to assert the flow of keypress and UI validation, 
as well as give the styling some more TLC to really make it ✨sparkle✨.
I decided to use useEventListener hook as dependable interface handle key events.
