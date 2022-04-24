import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BtnLink = ({ link, children, handler }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <StyledButton onClick={handler}>{children}</StyledButton>
    </Link>
  );
};

export const Btn = ({ children, handler }) => {
  return <StyledButton onClick={handler}>{children}</StyledButton>;
};
export const BtnSm = ({ children, handler }) => {
  return <StyledButtonSm onClick={handler}>{children}</StyledButtonSm>;
};

export const BtnRed = ({ children, handler }) => {
  return <StyledButtonRed onClick={handler}>{children}</StyledButtonRed>;
};
export const BtnRedSm = ({ children, handler }) => {
  return <StyledButtonRedSm onClick={handler}>{children}</StyledButtonRedSm>;
};
export const BtnGreen = ({ children, handler }) => {
  return <StyledButtonGreen onClick={handler}>{children}</StyledButtonGreen>;
};

const StyledButton = styled.button`
  cursor: pointer;
  padding: 0.1rem 2rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  border-radius: 10px;
  border: solid 1px #32394d;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  color: #32394d;
  transition: all 0.3s ease;
  outline-width: 0;
  &:hover {
    color: white;
    background: #32394d;
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.1rem 1.3rem;
  }
`;

const StyledButtonRed = styled(StyledButton)`
  border: solid 1px #8b240a;
  color: #8b240a;
  &:hover {
    color: white;
    background: #8b240a;
  }
`;
const StyledButtonRedSm = styled(StyledButton)`
  border: solid 1px #8b240a;
  color: #8b240a;
  padding: 0.3rem 0.3rem;
  &:hover {
    color: white;
    background: #8b240a;
  }
`;
const StyledButtonGreen = styled(StyledButton)`
  border: solid 1px #2e6429;
  color: #2e6429;
  &:hover {
    color: white;
    background: #2e6429;
  }
`;
const StyledButtonSm = styled(StyledButton)`
  padding: 0.3rem 0.3rem;
`;
