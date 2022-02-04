import React, {useEffect} from "react";
import {ReactComponent as SearchIcon} from "../../../assets/search-icon.svg";
import styled from "styled-components";
import {Input} from "../../shared/Input";
import {useSongSearch} from "../../../hooks/useSongSearch";

export const SearchBar: React.FC = () => {
    const {search, searchWithoutDebounce} = useSongSearch();

    useEffect(() => {
        searchWithoutDebounce("")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        search(event.currentTarget?.value.toLowerCase())
    }

    return (
        <Container>
            <SearchInput inverted
                         type="text"
                         placeholder="Search"
                         onChange={handleSearch}/>
            <SearchIcon/>
        </Container>
    )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  transition: 0.5s;
  width: 100%;
  padding: 1rem;

  svg {
    flex-shrink: 0;
    fill: white;
    height: 20px;
    align-self: center;
    position: absolute;
    right: 1rem;
    bottom: 1.5rem;
  }
`

const SearchInput = styled(Input)`
  box-sizing: border-box;
  width: 100%;
  transition: border-bottom-color 0.5s;

  &:focus {
    border-bottom-color: red;
  }
`;
