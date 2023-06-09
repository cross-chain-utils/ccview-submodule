import { createGlobalStyle } from 'styled-components'
export const GlobalStyles = createGlobalStyle`
  @media (max-width: 576px) {
      html {
          font-size: 6px;
      }
  }

  @media (max-width: 768px) {
      html {
          font-size: 8px;
      }

      .hideSmall {
          display: none !important;
      }



      .navbar-expand {
          flex-wrap: wrap !important;
      }

      .navbar-brand {
          white-space: normal !important;
      }
  }

  @media (max-width: 992px) {
      html {
          font-size: 10px;
      }


  }

  @media (max-width: 1200px) {
      html {
          font-size: 12px;
      }
  }
`