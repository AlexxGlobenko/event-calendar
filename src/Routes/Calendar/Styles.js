import styled from 'styled-components';

export const StyledMainContainer = styled.div`
  display: flex;
  min-height: calc(100% - 60px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, black, 63%,  skyblue);
  width: 100%;
  padding: 0px;
`;

export default styled.div`
  border: 1px solid #cecece;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 3px 10px 0 rgba(128, 128, 128, 0.6);
  font-weight: bold;
  width: 20%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: white;
  @media (max-width: 1200px){
     {
      width: 60%;
    }
  }
  @media (max-width: 800px){
     {
      width: 90%;
    }
  }

  .locales {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .years-container,
  .month-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    
    button {
      outline: none;
      background: #f9f9f9;
      padding: 2px 15px;
      cursor: pointer;
      font-weight: bolder;
      border: 1px solid #cecece;
      border-radius: 5px;
      box-shadow: 0 3px 5px -3px rgba(128, 128, 128, 0.6);
      transition: 0.3s;

      :hover {
        background: #f1f1f1;
      }
    }    

    p {
      display: flex;
      align-items: center;
    }
  }

  .year {
    text-align: center;
    margin: 5px;
  }

  .week-days {
    display: grid;
    grid-template-columns: repeat(7, minmax(35px, 1fr));
    justify-items: center;

    p {
      width: 100%;
      height: 0;
      padding: 50% 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .weekend {
    color: #d62121;
  }

  &&& .today {
    color: white;
    background: #355fff;
    box-shadow: 0 3px 6px rgba(128, 128, 128, 0.3);
  }

  &&& .picked-day {
    color: white;
    background: #29d600;
    box-shadow: 0 3px 6px rgba(128, 128, 128, 0.3);
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, minmax(35px, 1fr));
    justify-items: center;
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none;

    .dot {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: crimson;
    border-radius: 5px;
    right: 3px;
    top: 3px;
  }

    p {
      color: #dadada;
      font-weight: normal;
      cursor: pointer;
      width: 100%;
      height: 0;
      padding: 50% 0;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.1s;
      border-radius: 5px;

      :hover {
        box-shadow: inset 0 0 6px 5px rgba(128, 128, 128, 0.2)
      }
    }
  }

  && .picked-month {
    font-weight: bold;
    color: inherit;
    position: relative;
  }
`;
