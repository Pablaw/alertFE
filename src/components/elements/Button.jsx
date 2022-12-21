import React from "react";
import styled from "styled-components";

const Button = ({ fontSize, width, color, borderColor, onClick, children }) => {
  return (
    <CustomButton
      style={{
        fontSize: fontSize,
        width: width,
        backgroundColor: color,
        borderColor: borderColor,
      }}
      onClick={onClick}
    >
      {children}
    </CustomButton>
  );
};

const CustomButton = styled.button`
  font: inherit;
  width: 170px;
  border: 1px solid var(--color-border);
  border-radius: 15px;
  background: white;
  color: var(--color-font);
  font-size: 15px;
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
