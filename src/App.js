import React from "react";
import styled from "styled-components";
import Nav from "./components/Nav";
import Home from "./components/Home";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 500px;
  max-height: 800px;
`;

const App = () => (
  <Container>
    <Nav />
    <Home />
  </Container>
);

export default App;
