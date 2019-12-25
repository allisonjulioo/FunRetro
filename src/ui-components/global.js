import { injectGlobal } from 'vue-styled-components'

// --------------------------
// Global
// --------------------------
export const global = injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
  body {
      background: #f5f5f5;
      margin: 0;
      padding-bottom: 60px;
  }
  *{
      font-family: 'Open Sans', sans-serif;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
  }
  a{
    text-decoration: none;
  }

  .mb-10{
    margin-bottom: 10px;
  }
  .mr-2{
    margin-right: 1rem;
  }
  .f-2{
    font-size: 1rem !important;
  }
  .material-icons{
    float: left;
  }
.smooth-dnd-drop-preview-constant-class{
  background: #e0e0e0 !important;
    border: 2px dotted #bfbfbf;
    border-radius: 4px;
}
.title{
  display: flex;
  align-items:center;
  justify-content: space-between;
}

.toast__container {
    display: block;
    position: fixed;
    top: 4%;
    left: 50%;
    max-width: 300px;
    text-align: center;
    transform: translate(-47%,0%);
}

.toast__cell{
  display:inline-block;
}

.add-margin{
  margin-top:20px;
}

.toast__svg{
  fill:#fff;
}
.toast {
    text-align: center;
    padding: 1px 0;
    background-color: #ffc007;
    border-radius: 4px;
    max-width: 300px;
    top: 0px;
    position: relative;
    box-shadow: 1px 7px 14px -5px rgba(0,0,0,0.2);
    &.success{
      background: #41bb4e;
    }
    &.error{
      background: #ff2948;
    }
}
.toast__type {
  color: #3e3e3e;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 8px;
}

.toast__message {
    font-size: 14px;
    margin-top: 0;
  margin-bottom: 0;
    color: #878787;
}

.toast__content{
  padding:0 50px;
  p{
    font-size: 14px;
    color:white
  }
}

.toast__close {
    position: absolute;
    right: 22px;
    top: 50%;
    width: 14px;
    cursor:pointer;
    height: 14px;
  fill:#878787;
    transform: translateY(-50%);
}

.toast--green .toast__icon{
  background-color:#2BDE3F;
}

.toast--green:before{
  background-color:#2BDE3F;
}

.toast--blue .toast__icon{
  background-color:#1D72F3;
}

.toast--blue:before{
  background-color:#1D72F3;
}

.toast--yellow .toast__icon{
  background-color:#FFC007;
}

.toast--yellow:before{
  background-color:#FFC007;
}
`
