import styled from 'styled-components';

export const Container = styled.div`
height: ${({ isExpanded }) => isExpanded ? '15rem' : '12rem'};
min-height: 12rem;
width: ${({ isExpanded }) => isExpanded ? '30rem' : '12rem'};
min-width: 12rem;
background: #FFF;
border: 1px solid #EEE;
border-radius: .25rem;
display: flex;
align-items: center;
flex-direction: column;
justify-content: space-between;
padding: .5rem 1rem;
text-align: center;
position: relative;
overflow: hidden;
transition: .2s ease;

gap: 1.5rem;

.additionalInfo {
    font-size: .9rem;
    width: 12rem;
}

.shows {
    height: max-content;
    max-height: 6rem;
    width: 25rem;
    overflow: auto;
    font-size: .85rem;
    
    & > p {
        margin-bottom: .25rem;
        text-align: center;
        &:nth-child(1) { margin-top: .5rem; }
    }
}

.actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    button {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        font-size: 1.5rem;
        transition: .25s ease;
        
        &:hover {
            transform: rotate(-10deg);
        }
        
        &:nth-child(1) { color: #AA4228; }
        &:nth-child(2) { color: #4228AA; }
    }
}
`