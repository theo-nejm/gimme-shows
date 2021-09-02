import styled, { keyframes } from "styled-components";

const showNotification = keyframes`
  0% {
    right: -50rem;
  }
  10% {
    right: 7vw; 
  }
  15% {
    right: 5vw;
  }
  20% {
    right: 6vw;
  }
  70% {
    right: 6vw;
  }
  75% {
     right: 7vw;
  }
  100% {
    right: -50rem;
  }
`;

export const Container = styled.header`
    width: 100vw;
    height: 4rem;
    background: #FFF;
    border-bottom: 1px solid #EEE;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5vw;
    position: fixed;
    top: 0;
    left: 0;
    
    h1 {
        font-size: 1.6rem;
        
        span {
            color: #4343FA;
        }
    }
    
    nav ul {
        display: flex;
        gap: 2rem;
        font-size: 1.15rem;
        
        li {
            width: 5rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            
            transition: .2s ease;
        }
        
        li::before {
            content: '';
            height: 2px;
            width: 0;
            background: #4343FA;
            position: absolute;
            bottom: -5px;
            transition: .2s ease;
        }
        
        li:hover {
            color: #4343FA;
            
            &::before {
                width: 4rem;
            }
        }
    }
    
    .error {
        position: absolute;
        background: #EC2215;
        right: 6vw;
        top: 5rem;
        padding: 1rem;
        display: none;
        font-weight: 500;
        color: #FAFAFA;
        border-radius: .25rem;
        
        animation: ${showNotification} 5.15s ease;
    }
   
   .error.shown {
        display: flex;
   }
    
`