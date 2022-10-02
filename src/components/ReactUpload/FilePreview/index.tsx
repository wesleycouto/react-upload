import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { getFriendlySize } from "../Helpers";
import { FileStatus, ReactUploadFile } from "../types/types";
import ErrorIcon from "./ErrorIcon";
import ProgressBar from "./ProgressBar";
import SuccessIcon from "./SuccessIcon";

const FilePreview = (file: ReactUploadFile) => {
  console.log(file);
  return (
    <Flex
      minW={"175px"}
      minH={"175px"}
      boxSizing={"border-box"}
      background={"#FFFFFF"}
      border={"1px solid #A0ABC0"}
      flexFlow={"column"}
      justifyContent="flex-start"
      alignItems={"center"}
      fontFamily={"Inter"}
      fontSize={"12px"}
      fontStyle={"normal"}
      color={"black"}
      px={"5px"}
      py={"6px"}
      flex={"1 0 30%"}
      position={"relative"}
      cursor={"default"}
      zIndex={500}
    >
      <SuccessIcon status={file.status} />
      <ErrorIcon status={file.status} />

      <Flex>
        <Flex>
          <Image
            m={"2px"}
            borderRadius="full"
            boxSize="130px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
        </Flex>
      </Flex>
      <Flex lineHeight={"150%"} fontWeight={"400"} color={"#4A5568"}>
        {file.filename}
      </Flex>
      <ProgressBar progress={file.upload.progress} status={file.status} />
      <Flex fontWeight={"500"} lineHeight={"120%"} color={"#677389"}>
        <Text>
          {(file.status === FileStatus.ADDED ||
            file.status === FileStatus.QUEUED) &&
            getFriendlySize(file.size)}
          {file.status === FileStatus.SUCCESS && "Completed"}
          {file.status === FileStatus.ERROR && "Error"}
          {file.status === FileStatus.UPLOADING &&
            `${file.upload.progress}% completed`}
        </Text>
        <Text></Text>
      </Flex>
      <Flex mt={"13px"}>
        <Button>Cancel</Button>
      </Flex>
    </Flex>
  );
};

export default FilePreview;
