import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const AsWidth = styled.div`
  width: fit-content;
  margin: auto;
  margin-top: 15px;
  font-family: "Roboto", sans-serif;
`;
function PageFormat({ title, children }) {
  return (
    <>
      <Container>
        <AsWidth>
          {title && <h1>{title}</h1>}
          <hr />
          <Container>{children}</Container>
        </AsWidth>
      </Container>
    </>
  );
}

export default PageFormat;
