import styled from 'vue-styled-components';
import { bgColor, txtColor } from './colors';

// --------------------------
// Buttons
// --------------------------
export const BtnOption = {
  primary: Boolean,
  secondary: Boolean,
  raised: Boolean,
  outline: Boolean,
  left: Boolean,
  right: Boolean,
  avatar: Boolean,
  icon: Boolean,
};

export const SyButton = styled('button', BtnOption)`
  position: relative;
  cursor: pointer;
  font-size: 12px;
  width: ${props => (props.avatar ? '40px' : 'auto')};
  min-width: ${props => (props.avatar ? '40px' : '140px')};
  min-height: ${props => (props.avatar ? '40px' : 'auto')};
  padding: 0 10px;
  margin: 1em;
  height: 34px;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 50px;
  text-transform:  uppercase;

    .arrow{
      position: absolute;
      right: -17px;
      top: 30%;
    }
  float: ${(props) => {
    if (props.right) return 'right';
    if (props.left) return 'left';
    return 'none';
  }
};
  font-weight: ${props => (props.primary ? '600' : '')};
  border: 1px solid ${(props) => {
    if (props.primary) return bgColor.primary;
    if (props.avatar) return bgColor.darkGray;
    return bgColor.secondary;
  }
};

  background: ${(props) => {
    if (props.primary) return bgColor.light;
    if (props.avatar) return bgColor.darkGray;
    return bgColor.secondary;
  }};
  color: ${props => (props.primary ? txtColor.primary : txtColor.light)};
  ${props => (props.avatar ? 'box-shadow: 0 1px 2px 0 rgba(39, 40, 50, 0.15)' : '')};
  ${props => (props.raised ? `
      color: ${txtColor.light} !important;
      background: ${bgColor.primary} !important;
      border-color: ${bgColor.primary} !important;
  ` : '')}
  ${props => (props.outline ? `
      color: ${txtColor.light} !important;
      background: transparent !important;
      border-color: ${bgColor.light} !important;
  ` : '')}
  ${props => (props.icon ? `
    cursor: pointer;
    position: relative;
    border: none;
    background: transparent !important;
    border-radius: 50%;
    width: 30px;
    min-width: 30px !important;
    height: 30px;
    padding: 0 !important;
    margin: 0 !important;
    *{
      color: #828282;
      font-size: 18px !important;
    }
    &:active{
      box-shadow: none !important;
    }
  ` : '')}
  @media screen and (max-width: 981px) {
     min-width: 100px;
  }
  &:focus {
    outline: none;
  }
  :disabled {
    cursor: default;
    background: #eeeeeefc;
    border: none;
    color: #b3b3b3;
  }
  &:active {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
    transform: scale(1.004) !important;
  }
  &.disabled {
    cursor: default;
    opacity: .2;
    filter: grayscale(1);
  }
`;
