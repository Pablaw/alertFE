import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
    --color-header: #D08856;
    --color-border: #EFB730;
    --color-font: #000000;
    --color-footer: #596235;
}

@font-face {
    font-family: 'KoPubWorldBatang';
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/kopus/KoPubWorldBatangMedium.woff') 
        format('woff');
    font-weight: 500;
    font-style: normal;
}
`;

export default GlobalStyle;
