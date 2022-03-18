import React, {ChangeEvent, useContext, useState} from "react";
import {Input} from "../../shared/Input";
import {Button} from "../../shared/Button";
import styled from "styled-components";
import {ServiceContext} from "../../../contexts/ServiceContext";
import {HighScore} from "../../../services/HighScoreService";

const InputContainer = styled.div`
  display: flex;
  max-width: 100%;
  box-sizing: content-box;

  input {
    &:first-child {
      width: 75%;
      margin-right: 1rem;
    }

    &:last-child {
      width: 25%;
    }
  }
`

const Center = styled.div`
  display: flex;
  justify-content: center;
`

interface IAddHighScoreProps {
    readonly songId: number;
}

export const AddHighScore: React.FC<IAddHighScoreProps> = ({songId}) => {
    const {highScoreService} = useContext(ServiceContext);
    const [editMode, setEditMode] = useState(false);
    const [highScore, setHighScore] = useState<HighScore>({name: '', score: 0, songId})

    const saveHighScore = () => {
        highScoreService.save(highScore);
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHighScore({...highScore, name: e.currentTarget.value});
    }

    const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
        setHighScore({...highScore, score: parseInt(e.currentTarget.value)});
    }

    return <>
        {editMode && <>
            <InputContainer>
                <Input type="text" placeholder={'Name'} value={highScore.name} onChange={handleNameChange}/>
                <Input type="number" placeholder={'Score'} value={highScore.score} onChange={handleScoreChange}/>
            </InputContainer>
            <Center><Button onClick={saveHighScore}>Save</Button></Center>
        </>}
        {!editMode &&
            <Center>
                <Button onClick={() => setEditMode(true)}>Add new High Score</Button>
            </Center>}
    </>
};