import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        user-select: none;
        cursor: default;
        font-family: 'Pretendard';
        word-break: keep-all;
        font-size: 16px;
      }

      html,
      body,
      #__next {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
      }

      button,
      a {
        cursor: pointer;
      }

      a {
        text-decoration: none;
        color: black;
      }

      input,
      textarea {
        cursor: text;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
      }
    `}
  />
);
