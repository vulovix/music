import { useState, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import SearchResults from "./components/SearchResults";

import Nav from "./components/Nav";

import { getColor } from "./data";
import useDebounce from "./hooks/useDebounce";
import { StorageKeys, getStorage, setStorage } from "./utils/storage";

const App = () => {
  const audioRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState(getStorage().library);
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1) % songs.length];
    await setCurrentSong(nextSong);

    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);

    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 150);
    }
  };

  const onHandleSearch = useDebounce((term, callBack) => {
    fetch(`https://saavn.dev/search/songs?query=${term}`)
      .then((res) => res.json())
      .then((res) => {
        const results = [
          ...res.data.results.map((song) => ({
            id: uuidv4(),
            active: false,
            name: song.name,
            color: getColor(),
            artist: song.primaryArtist,
            cover: song.image[song.image.length - 1].link, // highest quality (320p)
            audio: song.downloadUrl[song.downloadUrl.length - 1].link, // highest quality (320p)
          })),
        ];
        callBack(results);
      });
  });

  const onSongRemove = (song) => {
    if (songs.length > 1) {
      const newSongs = songs.filter((x) => x.id !== song.id);
      setSongs(newSongs);
      setStorage(StorageKeys.library, newSongs);
    }
  };

  const onSetSearchTerm = (term) => {
    setSearchTerm(term);
    onHandleSearch(term, (results) => {
      setSearchResults(results);
      setSearchStatus(true);
      setLibraryStatus(false);
    });
  };

  const onSelectSearchSong = (song) => {
    const newSongs = [song, ...songs];
    setSongs(newSongs);
    setCurrentSong(song);
    setStorage(StorageKeys.library, newSongs);
    setSearchStatus(false);
  };

  return (
    <AppContainer libraryStatus={libraryStatus}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        setSearchStatus={setSearchStatus}
        searchTerm={searchTerm}
        setSearchTerm={onSetSearchTerm}
      />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />
      <SearchResults
        songs={searchResults}
        setCurrentSong={onSelectSearchSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryStatus={searchStatus}
        setLibraryStatus={setSearchStatus}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        onSongRemove={onSongRemove}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  transition: all 0.5s ease;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export default App;
