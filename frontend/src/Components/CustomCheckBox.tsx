import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as CheckMark } from "../Assets/icon-check.svg";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${(props) =>
    props.checked
      ? "linear-gradient(325deg, rgba(205,0,255,0.75) 0%, rgba(0,185,255,0.75) 100%)"
      : "white"};
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.secondaryText};
  transition: all 150ms;

  display: flex;
  justify-content: center;
  align-items: center;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;

interface CustomCheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({ checked, onChange }) => (
  <CheckboxContainer onClick={() => onChange(!checked)}>
    <HiddenCheckbox checked={checked ?? false} readOnly />
    <StyledCheckbox checked={checked ?? false}>
      <CheckMark style={{ visibility: checked ? "visible" : "hidden" }} />
    </StyledCheckbox>
  </CheckboxContainer>
);

export default CustomCheckBox;
