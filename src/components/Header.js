import ColorPalette from "./ColorPalette";
import { motion } from "framer-motion";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1em;
  h1 {
    font-size: 2.5rem;
  }
`;

const StyledPlusButton = styled(motion.button)`
  cursor: pointer;
  font-size: 2rem;
  margin-left: 0.5em;
  background: none;
  border: none;
`;

const Header = ({ handleOpenPalette, openPalette }) => {
  return (
    <StyledHeader>
      <h1>Memo</h1>
      <StyledPlusButton
        whileHover={{
          scale: 1.1,
        }}
        onClick={() => handleOpenPalette(!openPalette)}
      >
        <AiOutlinePlusCircle />
      </StyledPlusButton>

      {openPalette && <ColorPalette />}
    </StyledHeader>
  );
};

export default Header;
