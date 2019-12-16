import styled from 'vue-styled-components';
import { txtColor } from './colors';

// --------------------------
// Titles
// --------------------------
const titleProps = {
  sub: Boolean,
  black: Boolean,
  light: Boolean,
  normal: Boolean,
};

export const SyTitle = styled('h1', titleProps)`
    ${props => (props.black ? `color:${txtColor.quartz} !important;` : '')};
    ${props => (props.light ? `color:${txtColor.light} !important;` : '')};
    ${props => (props.normal ? 'font-size: 16px !important;' : '')};

    ${props => (props.sub ? `
    color: #616161 !important;
    transform: scale(.7);
    transform-origin: left;
    font-weight: normal !important;
    
    ` : `color:${txtColor.primary}`)};

    font-size: 20px;
    font-weight: 600; 
    line-height: 1.5;  
    margin-top: 10px;
    small{
      color: ${txtColor.quartz};
      display: block;
      line-height: 1.5;
      margin-left: 30px;
      font-size: 12px;
      font-weight: normal;
      top: 3px;
      position: relative;
    }
`;
