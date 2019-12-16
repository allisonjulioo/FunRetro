import styled from 'vue-styled-components';

// --------------------------
// Container
// --------------------------
export const SyContainer = styled.section`
    padding: 0 40px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    @media (max-width: 981px) {
      padding: 0 20px;
    }
`;

// --------------------------
// Linha
// --------------------------
const RowOption = {
  end: Boolean,
  large: Boolean,
  medium: Boolean,
  small: Boolean,
};
export const Row = styled('div', RowOption)`
      ${props => (props.medium ? 'width: 50%' : '')};
      ${props => (props.small ? 'width: 30%' : '')};
      ${props => (props.small ? 'width: 30%' : '')};
      ${props => (props.end ? 'justify-content: flex-end' : '')};
      display: flex;
      align-items: center;
      flex-wrap: wrap;
`;
// --------------------------
// Coluna
// --------------------------
const ColOption = {
  col: Number,
};
export const Column = styled('div', ColOption)`
    padding: 0 15px;
    ${(props) => {
    switch (props.col) {
      case 1:
        return 'width: 8.33%';
      case 2:
        return 'width: 16.67%';
      case 3:
        return 'width: 25%';
      case 4:
        return 'width: 33.33%';
      case 5:
        return 'width: 41.67%';
      case 6:
        return 'width: 50%';
      case 7:
        return 'width: 58.33%';
      case 8:
        return 'width: 66.67%';
      case 9:
        return 'width: 75%';
      case 10:
        return 'width: 83.33%';
      case 11:
        return 'width: 91.67%';
      case 12:
        return 'width: 100%';
      default:
        return 'width: 100%';
    }
  }};
`;
