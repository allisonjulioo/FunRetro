import styled from "vue-styled-components";
import { bgColor, txtColor } from './colors.js'


export const TabOprion = {
    primary: Boolean,
};

export const SyTabs = styled('ul', TabOprion)` 
    position: absolute;
    bottom: 0;
    list-style: none;
    display: inline-flex;
    margin: 0;
    padding: 0;
    left: 20px;
    li {
      color: ${txtColor.quartz};
      margin-right: 20px;
      padding: 10px 20px;
      cursor: pointer;
      text-transform: uppercase;
      user-select: none;
      letter-spacing: normal;
      text-align: center;
      font-size: 12px;
      font-weight: 600;
      &.active {
        color: ${txtColor.primary};
        border-bottom: 3px solid ${bgColor.primary};
      }
    }
  `