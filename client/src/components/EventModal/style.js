import styled from "styled-components";

export const Overlay = styled.div`
position: fixed;
height: 100vh;
width: 100vw;
top: 0;
left: 0;

background: rgba(0, 0, 0, .7);
display: flex;
align-items: center;
justify-content: center;
z-index: 999;

.modal {
    background: #FFF;
    border: 1px solid #EEE;
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    height: 22rem;
    width: 15rem;
    gap: 1.5rem;
    
    form {
        display: flex;
        flex-direction: column;
        width: 12rem;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        
        input, select {
            width: 100%;
            background: none;
            border: 2px solid #CCCCFF;
            border-radius: .25rem;
            padding: 0 .5rem;
            
            &:focus {
                border: 2px solid #5454FA;
            }
        }
        
        .actions {
            display: flex;
            align-items: center;
            gap: 2rem;
        
             button {
                width: 5rem;
                background: none;
                transition: .2s ease;
                border-radius: .25rem;
                font-weight: 700;
             }
            .submit {
                border: 2px solid #5454FA;
                color: #5454FA;
            
                &:hover,
                &:focus {
                    background: #5454FA;
                    color: #FFF;
                }
            }
            .cancel {
                border: 2px solid #5e5e5e;
                color: #5e5e5e;
            
                &:hover,
                &:focus {
                    filter: brightness(1.75);
                }
            }
        }
    } 
}

select#roles {
    height: 5.5rem;
    overflow: hidden;
    border: none;
    padding: .5rem;
    
    option {
        width: 12rem;
    }
}
`