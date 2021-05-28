import React, { ReactElement } from 'react';

import Autocomplete from "./components/Autocomplete/Autocomplete";

const App = (): ReactElement =>(
    <div style={{width: '80wv', padding: '3rem', display: 'flex', flexDirection: 'column'}}>
      Search
      <Autocomplete/>
    </div>
  );

export default App;
