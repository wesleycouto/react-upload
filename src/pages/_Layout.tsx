import { Container } from "@chakra-ui/react";
import Home from "./Home";

const Layout = (): JSX.Element => {
  return (
    <Container maxW="container.lg" centerContent p={"25px"}>
      <Home />
    </Container>
  );
};

export default Layout;
