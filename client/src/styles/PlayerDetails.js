import styled from 'styled-components'

export const PlayerDetailsMain = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background: #0C8235;
    padding: 30px;
    overflow: auto;
    box-shadow: -2px -3px 5px rgba(0,0,0,0.3);
    box-sizing: border-box;
    color: #fff;
`

export const PlayerDetailsWrapper = styled.div `
    position: relative;
`;

export const DeleteButton = styled.button`  
    position: absolute;
    top: 0;
    right: 0;
    height: 40px;
    width: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
`;
