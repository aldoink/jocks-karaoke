import styled from "styled-components";

const StyledButton = styled.button<{ isOpen: boolean }>`
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: visible;
`;

const Box = styled.div`
  width: 24px;
  height: 24px;
  display: inline-block;
  position: relative;
`;

const BoxInner = styled.div<{ isOpen: boolean }>`
  display: block;
  top: 50%;
  margin-top: -2px;
  transition: transform 0.15s ease;
  background-color: white;
  width: 24px;
  height: 2px;
  border-radius: 0;
  position: absolute;

  &::before,
  &::after {
    content: "";
    display: block;
    background-color: white;
    width: 24px;
    height: 2px;
    border-radius: 0;
    position: absolute;
    transition: transform 0.15s ease;
  }

  &::before {
    top: -8px;
  }

  &::after {
    bottom: -8px;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
      transform: rotate(45deg);
      &::before {
        top: 0;
        transform: rotate(90deg);
      }
      &::after {
        top: 0;
        opacity: 0;
      }
  `}
`;

const Button = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <StyledButton
    data-testid="hamburger-button"
    type="button"
    onClick={onClick}
    isOpen={isOpen}
  >
    <Box>
      <BoxInner isOpen={isOpen} />
    </Box>
  </StyledButton>
);

export default Button;
