import React from "react";
import styled from "styled-components";

const Button = ({ color, borderColor, onClick, children }) => {
  return (
    <CustomButton
      style={{ backgroundColor: color, borderColor: borderColor }}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

const CustomButton = styled.button`
  font: inherit;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  padding: 0.5rem 1.5rem;
  cursor: pointer;

  &:hover,
  &:active {
    color: white;
    background: var(--color-border);
    border-color: var(--color-border);
  }
  &:focus {
    outline: none;
  }
`;
export default Button;
