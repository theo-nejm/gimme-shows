import styled from 'styled-components';


export const Container = styled.div`
    transition: .2s ease;
    
    h2 {
        text-align: center;
        padding: 1rem 0;
    }
    
    .top {
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    
        button {
            background: none;
            border: none;
            color: #4343FA;
            font-size: 1.15rem;
            font-weight: 700;
            transition: .2s ease;
            
            &:hover {
                filter: brightness(1.75);
            }
        }
    }
    
    .users {
        width: 90vw;
        margin-left: 5vw;
        gap: 1rem;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
        height: 70vh;
        overflow-y: auto;
    }
`