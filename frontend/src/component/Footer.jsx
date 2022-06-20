import React from "react";

import styled from "styled-components";
const Foter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 20px;
  font-size: bold;
  text-align: center;
  position: relative;
  /* margin-top: 40px; */
`;
function Footer() {
  return (
    <div>
      <Foter className="footer-content m-auto ">
        @Copyright 2022 - iravishankarpal
      </Foter>
    </div>
  );
}

export default Footer;
