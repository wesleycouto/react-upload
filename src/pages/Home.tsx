import { Button, Flex, useColorMode } from "@chakra-ui/react";
import ReactUpload from "../components/ReactUpload";
import ToggleThemeButton from "../components/ToggleThemeButton";

const Home = (): JSX.Element => {
  return (
    <>
      <Flex>Home </Flex>
      <ToggleThemeButton
        alignSelf={"end"}
        top={0}
        right={0}
        position={"absolute"}
      />

      <ReactUpload />
    </>
  );
};

export default Home;
