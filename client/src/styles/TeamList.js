import styled from 'styled-components';

export const TeamListMain = styled.ul`
    padding: 0;
`
export const TeamListItem = styled.li`
    display: inline-block;
    margin: 12px;
    padding: 10px;
    border-radius: 4px;
    border: 2px solid ${p => p.colors ? p.colors.secondaryColor : '#252A34' };
    box-shadow: 1px 2px 3px rgba(0,0,0,0.3);
    cursor: pointer;
    color: ${p => p.colors ? 'white' : '#252A34' };
    background-color: ${p => p.colors ? p.colors.mainColor : 'transparent' };
`
