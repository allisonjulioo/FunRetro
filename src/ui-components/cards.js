import styled from 'vue-styled-components';
import { bgColor, txtColor } from './colors';

// --------------------------
// Cards
// --------------------------
const CardOption = {
  clickable: Boolean,
  def: Boolean,
  hover: Boolean,
};

export const SyCard = styled('div', CardOption)`
  ${props => (props.clickable
    ? `cursor: pointer;
  &:active
  {
    border: 1px solid ${bgColor.primary};
  }`
    : '')};
  width: 100%;
  min-height: 170px;
  padding: 16px 24px;
  margin-bottom: 24px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, .1);
  background-color: ${bgColor.light};
  transition: all 300ms ease;
  ${props => (props.def
    ? `
    background: transparent;
    box-shadow: none; border:
    2px dashed #ccc;
    text-align:center;
    *{
      user-select: none;
    }
    &:hover{
      border: 2px dashed ${bgColor.primary};
    }
    &:active{
      border: 2px dashed ${bgColor.primary} !important;
      background-color: #f2f2f2;
    }`
    : '')};
  ${props => (props.hover ? '&:hover{ box-shadow: 0 4px 24px 1px rgba(0, 0, 0, .1); }' : '')};
  h1, h2, h3{
    color: ${txtColor.primary};
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
  }
  p, span{
    color: ${txtColor.quartz};
    font-size: 12px;
  }
`;

export const SySuccessCard = styled.div`
  width: 263px;
  height: 56px;
  position: absolute;
  right: 0;
  border-radius: 3px;
  background-color: #00cbc8;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 0 20px 0 20px;
  label{
    cursor: pointer;
    float: right;
    position: relative;
    top: 4px;
    right: -15px;
    img{
      filter: brightness(0) invert(1);
    }
  }
`;
