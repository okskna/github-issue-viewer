import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${theme.color.sub};
    background-color: ${theme.color.deepblack};
    width: 100vw;
    height: 100vh;
  }

  ul {
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: ${theme.color.lightpink}
  }

  * {
    box-sizing: border-box;
    animation: fadeIn 0.7s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default GlobalStyle;
