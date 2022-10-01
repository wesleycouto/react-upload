import { Box } from "@chakra-ui/react";
import { FileStatus } from "../types/types";

export interface ProgressBarProps {
  status: FileStatus;
  progress: number;
}

const ProgressBar = ({ status, progress }: ProgressBarProps) => {
  const shouldShowInnerProgressbar =
    status === FileStatus.SUCCESS ||
    status === FileStatus.ERROR ||
    status === FileStatus.UPLOADING;
  const innerBarColor = status === FileStatus.ERROR ? "red.500" : "green.300";
  const progressWidth = `${status === FileStatus.ERROR ? 100 : progress ?? 1}%`;

  return (
    <Box w="100%" background={"#E2E7F0"} my={"4px"} h={"4px"}>
      {shouldShowInnerProgressbar && (
        <Box background={innerBarColor} w={progressWidth} h={"4px"} />
      )}
    </Box>
  );
};

export default ProgressBar;
