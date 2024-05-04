import "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Root() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 2rem;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <Title>SWAPP</Title>
      </Link>
      <Subtitle>(Star Wars App)</Subtitle>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  color: var(--c-text-color);
  font-family: "Nunito", "Open Sans", sans-serif;
  font-size: 4rem;
  font-style: italic;
  font-weight: 800;
  letter-spacing: 0.75rem;
  margin-bottom: 0;
  text-align: center;
  text-shadow: 4px 4px 8px var(--c-text-shadow);
`;

const Subtitle = styled.p`
  color: var(--c-text-color);
  font-family: "Nunito", "Open Sans", sans-serif;
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0;
  text-align: center;
`;
