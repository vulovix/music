import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Nav = ({ libraryStatus, setLibraryStatus, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      const term = searchTerm ? searchTerm.trim() : "";
      if (term) {
        onSubmit(term);
      }
    }
  };
  const onChange = (e) => setSearchTerm(e.target.value);
  return (
    <NavContainer>
      <H1 libraryStatus={libraryStatus}>xMusic</H1>
      <Search
        placeholder="Search"
        value={searchTerm}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <Button onClick={() => setLibraryStatus(!libraryStatus)}>
        <FontAwesomeIcon icon={faMusic} />
        &nbsp; Library
      </Button>
    </NavContainer>
  );
};

const Search = styled.input`
  background: transparent;
  border: none;
  cursor: pointer;
  border: 2px solid rgb(65, 65, 65);
  padding: 0.5rem;
  border-radius: 1rem;
  transition: all 0.3s ease;
  color: rgb(65, 65, 65);
  text-align: center;
  /* &:hover, */
  &:focus {
    &::placeholder {
      color: transparent;
    }
    background: rgb(65, 65, 65);
    color: white;
  }
`;

const NavContainer = styled.div`
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 940px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const H1 = styled.h1`
  transition: all 0.5s ease;

  @media screen and (max-width: 768px) {
    visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
    opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
    transition: all 0.5s ease;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  border: 2px solid rgb(65, 65, 65);
  padding: 0.5rem;
  transition: all 0.3s ease;
  border-radius: 1rem;
  min-width: 100px;
  &:hover {
    background: rgb(65, 65, 65);
    color: white;
  }
`;

export default Nav;
