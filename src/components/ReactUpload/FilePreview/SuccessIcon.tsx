import { CheckCircleIcon } from "@chakra-ui/icons";
import { FileStatus } from "../types/types";

export interface SuccessIconProps {
  status: FileStatus;
}

const SuccessIcon = ({ status }: SuccessIconProps) => {
  return (
    <>
      {status === FileStatus.SUCCESS && (
        <CheckCircleIcon
          borderRadius={"50%"}
          background={"white"}
          color="green"
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
