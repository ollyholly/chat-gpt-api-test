import { createTheme, ThemeProvider } from '@mui/material/styles';
import Quote from './Quote';

const theme = createTheme({
  palette: {
    blacky: {
      main: '#222222',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Quote />
    </ThemeProvider>
  );
}

export default App;
