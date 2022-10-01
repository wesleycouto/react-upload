import { Button, ButtonProps, useColorMode } from "@chakra-ui/react";

const ToggleThemeButton = (props: ButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button {...props} onClick={toggleColorMode}>
      Toggle {colorMode === "light" ? "Dark" : "Light"}
    </Button>
  );
};

export default ToggleThemeButton;
