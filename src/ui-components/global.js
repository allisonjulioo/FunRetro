import { injectGlobal } from 'vue-styled-components';

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
`;
