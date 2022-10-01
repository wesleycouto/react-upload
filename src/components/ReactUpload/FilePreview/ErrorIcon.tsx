import { Icon } from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";
import { FileStatus } from "../types/types";

export interface SuccessIconProps {
  status: FileStatus;
}

const SuccessIcon = ({ status }: SuccessIconProps) => {
  return (
    <>
      {status === FileStatus.ERROR && (
        <Icon
          as={FaExclamationCircle}
          borderRadius={"50%"}
          background={"white"}
          color="red.500"
          w={"26px"}
          h={"26px"}
          position={"absolute"}
          top={"-13px"}
          right={"-13px"}
        />
      )}
    </>
  );
};

export default SuccessIcon;
