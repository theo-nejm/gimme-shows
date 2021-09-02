import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    button {
        cursor: pointer;
        height: 2rem;
        outline: none;
    }

    input {
        height: 2rem;
        outline: none;
    }

    ul {
        list-style: none;
    }

    body, a {
        font-family: 'Poppins', sans-serif;
        color: #290060; 
    }

    body {
        background: #FAFAFA;
    }
`

export const PageContainer = styled.main`
    height: 100vh;
    padding-top: 4rem;
    width: 100vw;
`