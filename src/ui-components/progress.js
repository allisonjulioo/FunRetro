import styled from "vue-styled-components"; 

const ProgressOption = {
    percent: Number,
};
export const SyProgress = styled('div', ProgressOption)`
    border-radius: 6px;
    overflow: hidden;
    height: 24px; 
    position: relative;
    background-color: #f2f3f4;
    div {
      ${props => props.percent ? `width: ${props.percent}%` : 'width: 0%'}; 
      height: 24px;  
      background-color: #2ac8bc;
    }
    span{
      top: 4px;
      position: absolute;
      &.left{
        left: 5px;
      }
      &.right{
        right: 5px; 
      }
    }
  `;
