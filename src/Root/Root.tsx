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
  padding: 4rem 2rem;
`;

const Container = styled.main`
  max-width: 1600px;
  margin: 0 auto;

  @media (min-width: 800px) {
    display: flex;
  }
`;

const Child = styled.div`
  @media (min-width: 800px) {
    flex-basis: 100%;
    min-width: 0px;
    transition: all 0.5s ease-out;

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
      <Subtitle>
        (Star Wars App - <a href="https://swapi.tech">SWAPI</a> browser)
      </Subtitle>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  align-items: center;
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  color: var(--c-text-color);
  font-family: "Nunito", "Open Sans", sans-serif;
  font-size: 4rem;
  font-style: italic;
  font-weight: 800;
  letter-spacing: 0.75rem;
  margin: 0;
  padding: 0 2rem;
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

  a {
    text-decoration: underline;
  }
`;
