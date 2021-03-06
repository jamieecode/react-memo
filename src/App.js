import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import MemoList from "./components/MemoList";
import Search from "./components/Search";
import Header from "./components/Header";
import styled from "styled-components";
import { colorContext } from "./contexts/ColorContext";

const StyledContainer = styled.section`
  max-width: 960px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  min-height: 100vh;
`;

const App = () => {
  const [memos, setMemos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [openPalette, setOpenPalette] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const savedMemos = JSON.parse(localStorage.getItem("react-memo-data"));

    if (savedMemos) {
      setMemos(savedMemos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-memo-data", JSON.stringify(memos));
  }, [memos]);

  const addMemo = (text, color) => {
    const date = new Date();
    const newMemo = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
      color,
    };
    const newMemos = [...memos, newMemo];
    setMemos(newMemos);
  };

  const deleteMemo = (id) => {
    const newMemos = memos.filter((memo) => memo.id !== id);
    setMemos(newMemos);
  };

  return (
    <StyledContainer>
      <colorContext.Provider value={{ selectedColor, setSelectedColor }}>
        <Header handleOpenPalette={setOpenPalette} openPalette={openPalette} />
        <Search handleSearchMemo={setSearchText} />
        <MemoList
          memos={memos.filter((memo) =>
            memo.text.toLowerCase().includes(searchText)
          )}
          handleAddMemo={addMemo}
          handleDeleteMemo={deleteMemo}
        />
      </colorContext.Provider>
    </StyledContainer>
  );
};

export default App;
