import React, { ChangeEvent, useContext, useState } from "react";
import { Input } from "../../shared/Input";
import { Button } from "../../shared/Button";
import styled from "styled-components";
import { HighScore } from "../../../services/HighScoreService";
import { HighScoreContext } from "../../../contexts/HighScoreContext";
import { Song } from "../../../models/Song";
import { ButtonLayout } from "components/shared/styledComponents";

const InputContainer = styled.div`
  display: flex;
  max-width: 100%;
  box-sizing: content-box;
  margin-top: 2rem;

  input {
    &:first-child {
      width: 75%;
      margin-right: 1rem;
    }

    &:last-child {
      width: 25%;
    }
  }
`;

interface IAddHighScoreProps {
  readonly song: Song;
  readonly closeFn: () => void;
}

export const AddHighScore: React.FC<IAddHighScoreProps> = ({
  song,
  closeFn,
}) => {
  const { highScoreService, refreshHighScores } = useContext(HighScoreContext);
  const [highScore, setHighScore] = useState<HighScore>({
    name: "",
    score: "",
    songId: song.id,
  });

  const saveHighScore = async () => {
    await highScoreService.save(highScore);
    refreshHighScores(song);
    closeFn();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHighScore({ ...highScore, name: e.currentTarget.value });
  };

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = new RegExp("^[0-9]*$");
    if (numbersOnly.test(e.currentTarget.value)) {
      setHighScore({ ...highScore, score: e.currentTarget.value });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await saveHighScore();
  };

  const handleCancelClicked = () => {
    closeFn();
    setHighScore({ ...highScore, name: "", score: "" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type="text"
          placeholder={"Name"}
          value={highScore.name}
          onChange={handleNameChange}
        />
        <Input
          type="text"
          placeholder={"Score"}
          value={highScore.score}
          onChange={handleScoreChange}
          maxLength={2}
        />
      </InputContainer>
      <ButtonLayout>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={handleCancelClicked}>Cancel</Button>
      </ButtonLayout>
    </form>
  );
};
