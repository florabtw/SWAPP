import "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import AllCollections from "Collections/All";
import List from "Collections/List";
import Details from "Collections/Details";

export default function Root() {
  return (
    <Page>
      <Header />
      <Container>
        <Child>
          <AllCollections />
        </Child>
        <Child>
          <List />
        </Child>
        <Child>
          <Details />
        </Child>
      </Container>
    </Page>
  );
}

const Page = styled.div`
  padding: 2rem;
`;

const Container = styled.main`
  @media (min-width: 800px) {
    display: flex;
  }
`;

const Child = styled.div`
  @media (min-width: 800px) {
    flex-basis: 100%;
    min-width: 0px;
    transition: flex-basis 0.5s ease-out 0s;

    & + & {
      margin-left: 2rem;
    }

    &:empty {
      flex-basis: 0%;
      margin-left: 0;
    }
  }
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
