import LibrarySong from "./LibrarySong";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRef } from "react";

const SearchResults = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryStatus,
  setLibraryStatus,
}) => {
  const myComponentRef = useRef();

  const handleOutsideClick = () => {
    setLibraryStatus(false);
  };

  useOutsideClick(myComponentRef, handleOutsideClick, ["search-input"]);

  const skip = () => {};

  return (
    <LibraryContainer ref={myComponentRef} libraryStatus={libraryStatus}>
      <Title>Search Results</Title>
      <SongContainer>
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={skip}
          />
        ))}
      </SongContainer>
    </LibraryContainer>
  );
};

export const LibraryContainer = styled.div`
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;
  width: 20rem;
  height: 100%;
  background-color: white;
  box-shadow: 2px 2px 50px rgb(204, 204, 204);
  user-select: none;
  overflow: scroll;
  transform: translateY(${(p) => (p.libraryStatus ? "0%" : "100%")});
  transition: all 0.5s ease;
  opacity: ${(p) => (p.libraryStatus ? "100" : "0")};
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) tranparent;

  position: fixed;
  width: 480px;
  left: calc(50% - 240px);
  top: 5rem;
  border-radius: 20px 20px 20px 20px;
  height: calc(100% - 8rem);

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    z-index: 9;
  }
`;

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Title = styled.h2`
  padding: 2rem;
`;

export default SearchResults;
