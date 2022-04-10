import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RoutesLayouts from './routing/Layouts';

function App() {
  return (
    <BrowserRouter>
      <RoutesLayouts />
    </BrowserRouter>
  );
}

export default App;
