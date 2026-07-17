import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ${(p) => p.theme.font.body};
    background: ${(p) => p.theme.color.white};
    color: ${(p) => p.theme.color.ink};
    -webkit-font-smoothing: antialiased;
  }

  button, input, textarea {
    font-family: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
