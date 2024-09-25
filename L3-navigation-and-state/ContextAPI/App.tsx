import React from 'react';
import { ThemeProvider} from './src/components/ThemeContext';
import { ThemeComponent } from './src/components/ThemeComponent';


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeComponent/>
    </ThemeProvider>
  );
};

export default App;

