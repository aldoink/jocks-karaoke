import React, {useEffect, useState} from "react";
import {Song} from "../../models/Song";
import {Modal} from "../Modal";
import {HighScores} from "../HighScores";
import styled from "styled-components";

type TableProps = {
    songList: Song[]
}

export const SongList: React.FC<TableProps> = ({songList}) => {
    const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (selectedSong) {
            setShowModal(true);
        }
    }, [selectedSong])

    return (
        <>
            <div className="table-container">
                {
                    songList.map((song) => (
                        <SongContainer key={`song${song.id}`} onClick={() => setSelectedSong(song)}>
                            <TitleArtistContainer>
                                <h3>{song.title}</h3>
                                <h4>{song.artist}</h4>
                            </TitleArtistContainer>
                            <LocationContainer>
                                <h4>{song.location}</h4>
                            </LocationContainer>
                        </SongContainer>
                    ))
                }
            </div>
            <Modal isOpen={showModal} closeFn={() => setShowModal(false)}>
                {selectedSong && <HighScores song={selectedSong}/>}
            </Modal>
        </>
    )
}

const SongContainer = styled.div`
  display: flex;
  padding: 0.75rem 1rem;

`

const TitleArtistContainer = styled.div`
  width: 75%;
  padding-right: 1rem;

  h3 {
    color: white;
    margin: 0;
  }

  h4 {
    color: red;
    margin: 0;
  }
`

const LocationContainer = styled.div`
  width: 25%;

  h4 {
    color: white;
    margin: 0;
  }
`