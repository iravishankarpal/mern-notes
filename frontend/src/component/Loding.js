import React from "react";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Lodings = styled.div`
  height: 80vh;
  /* position: absolute; */
  display: flex;
  justify-content: center;
  width: 100%;
`;
function Lodingspinner() {
  return (
    <Lodings>
      <Spinner
        style={{
          size: "60%",
        }}
        animation="border"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Lodings>
  );
}

export default Lodingspinner;
