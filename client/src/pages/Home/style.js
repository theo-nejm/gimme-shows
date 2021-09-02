import styled from "styled-components";

export const Container = styled.div`
    padding: 4rem 5vw 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    
    .left img {
        height: 75vh;
    }
    
    .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5rem;
        align-items: center;
        
        .tip {
            margin-top: .5rem;
            font-size: .85rem;
            color: #4343FA;
        }
    }
`