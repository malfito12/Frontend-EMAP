import { createTheme, ThemeProvider } from '@material-ui/core';
import ReactDOM from 'react-dom';
import App from './App';


const theme=createTheme({
  typography:{
    fontFamily:'Dubai Medium'
  }
})
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);


