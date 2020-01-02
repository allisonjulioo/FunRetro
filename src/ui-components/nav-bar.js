import styled from "vue-styled-components";
import { bgColor } from './colors.js';

// --------------------------
// Navigation
// --------------------------
const navProps = {
  sub: Boolean,
};
export const SyNav = styled('nav', navProps)`
  background-color: ${bgColor.primary};
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.25);
  z-index: 9999;
  margin-bottom: 10px;
  position: relative;
  ${props => props.sub ? `
   padding-top: 21px;
   margin-top: -9px !important;
   min-height: 127px !important;
   display: block !important;
    h1{
      font-size: 24px !important;
      text-transform: capitalize;
      font-weight: normal !important;
    }
    button{
      margin-top: 4px;
    }
  ` : ''}
  a{
    &.router-link-exact-active {

    }
  }
  img{
        margin: 0 auto;
        position: relative;
}`;
// --------------------------
// Sub Navigation
// --------------------------
export const SySubNav = styled.div`
  position:sticky;
  top: 0;
  background: ${bgColor.light};
  height: 100px;
  margin: -9px auto 13px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(39, 40, 50, 0.15);
  z-index: +1;
  section{
  display: flex;
  align-items: center;
    h1,h2{
      flex: 11;
      font-weight: normal;
      font-size: 24px;
      line-height: 1.25;
    }
    button{
    }
  }`;
