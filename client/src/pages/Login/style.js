import styled from "styled-components";

export const Container = styled.div`
    padding: 4rem 5vw 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .left img {
        height: 75vh;
    }
    
    .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 5rem;
        align-items: center;
        text-align: center;
        
        h2 {
            margin-bottom: .5rem;
        }
       
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5rem;
            width: 15rem;
            height: 12rem;
           
            input {
                width: 100%;
                padding: 0 .25rem;
                border: 2px solid #CCCCFF;
                border-radius: .25rem; 
                transition: .2s ease;
            
                &:focus {
                    border: 2px solid #5454FA;
                }
            }
           
            button {
                width: 100%;
                border: 2px solid #5454FA;
                border-radius: .25rem;
                background: none;
                font-weight: 700;
                color: #5454FA;
                transition: .2s ease;
                
                &:hover,
                &:focus {
                    background: #5454FA;
                    color: #FAFAFA;
                }
            }
        }
    }
   
    .error-msg {
        font-size: .9rem;
        color: #9A3322;
        height: 2rem;
    }
`