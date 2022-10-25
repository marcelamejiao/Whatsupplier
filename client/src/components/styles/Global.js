import {createGlobalStyle} from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    background: ${({ theme }) => theme.colors.body};
    color: hsl(192, 100%, 9%);
    font-family: 'Raleway', sans-serif;
    font-size: 1.15em;
    margin: 0;
    margin-bottom:60px;
  }
  p {
    opacity: 0.6;
    line-height: 1.5;
  }
  img {
    max-width: 100%;
  }
  h1, h2 {
    text-shadow: 1px 1px #cccdcd;
  }
`
export default GlobalStyles