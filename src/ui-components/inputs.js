import styled from 'vue-styled-components';
import { bgColor } from './colors';

const inputProps = {
  full: Boolean,
  a100: Boolean,
  date: Boolean,
  checkbox: Boolean,
  mr: String,
  ml: String,
  preLeft: Boolean,
};
// --------------------------
// Inputs
// --------------------------
export const SyInput = styled('label', inputProps)`
    margin-rigth: 0px;
    ${props => (props.date ? 'max-width: 189px !important;' : '')};
    ${props => (props.full ? 'width: 100%; display: block' : '')};
    ${props => (props.mr ? `margin-right: ${props.mr}px` : '')};
    ${props => (props.ml ? `margin-left: ${props.ml}px` : '')};

      ${props => (props.checkbox ? `
       display: flex;
       align-items: center;
       cursor: pointer;
       font-size: 14px;
       color: #50525f;
       margin-left: 25px;
       white-space: nowrap;
       margin-top: 21px;
       user-select: none;
        input{
          display: none;
          margin-right: 10px;
          padding:12px;
          border: solid 1px ${bgColor.steel};
          width: 15px !important;
          height: 15px !important;
          border-radius: 3px;
        }
        input + label {
          display: block;
          margin: 0.2em;
          cursor: pointer;
          padding: 0.2em;
        }

        input + label:before {
          content: "v";
          border: 0.1em solid ${bgColor.steel};
          border-radius: 0.2em;
          display: inline-block;
          margin-right: 0.2em;
          vertical-align: bottom;
          color: transparent;
          -webkit-transition: .2s;
          transition: .2s;
          text-align: center;
          line-height: 1.2;
          height: 18px;
          width: 18px;
        }
        input + label:active:before {
          transform: scale(0);
        }
        input:checked + label:before {
          background-color: ${bgColor.primary};
          border-color: ${bgColor.primary};
          color: #fff;
        }
      ` : '')};
      &.diabled{
        opacity: .7;
        *{
          color: #c2c2c1 !important;
          border-color: #c2c2c1 !important;
        }
      }
       label{
        font-size: 12px;
        margin: 5px 0 0;
        display: block;
       }
      span{
        font-size: 14px;
        font-weight: 600;
        color: #50525f;
        display: flex;
        margin-bottom: 2px;
        small{
          pading-left: 2px;
          color: ${bgColor.strawberry};
        };
      }
      input{
        padding:12px;
        border: solid 1px ${bgColor.steel};
        width: 100%;
        height: 40px;
        border-radius: 3px;
        &.hasError{
          border: solid 1px ${bgColor.strawberry} !important;
          *{
            border: solid 1px ${bgColor.strawberry} !important;
          }
        }
      }
      .hasError{
        input, .mx-input-append{
          border-color: ${bgColor.strawberry} !important;
        }
      }
      textarea{
        width: 100%;
        padding: 10px;
        border-radius: 3px;
        border: none;
        margin-top: 10px;
      }
      .alert{
        ${props => (props.a100 ? 'max-width: 100% !important;' : '')};
        max-width: 85%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        margin: 4px 0 0;
        font-weight: 600;
        line-height: 1;
        min-width: 0px;
        font-size: 12px;
        word-break: break-word;
        min-height: 24px;
        float: left;
        margin-bottom: -28px;
        color: ${bgColor.strawberry};
      }
      ${props => (props.preLeft ? `
      .preamble{
        float: left !important;
        text-align: left !important;
      }
      ` : '')};
      .preamble{
        font-size: 12px;
        color: ${bgColor.darkGray};
        float: right;
        text-align: right;
        min-height: 24px;
        margin: 4px 0 0;
        margin-bottom: -27px;
      }
  `;
