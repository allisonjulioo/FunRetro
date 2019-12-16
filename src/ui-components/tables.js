import styled from "vue-styled-components";
// --------------------------
// Tabela
// --------------------------
const TableOption = {
  percent: String,
}
export const SyTable = styled('table', TableOption)` 
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  
    thead tr {
        color: #494b57;
        text-transform: uppercase;
        font-weight: bold;
        border: 1px solid #d6d8db;
        background: rgba(214, 216, 219, 0.1);
    }
  
    td,
    th {
        padding: 10px;
        text-align: left;
        font-size: 12px;
        height: 36px;
        &.q{
          background: #f3f3f4;
        }
    } 
    tbody tr {
        border-bottom: solid 1px rgba(214, 216, 219, 0.5);
        border-top: solid 1px rgba(214, 216, 219, 0.5);
        &:hover{
          cursor: pointer;
          background: #f3f3f3;
        }
    }  
  `;