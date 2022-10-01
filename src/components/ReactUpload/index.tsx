import { Center, Text } from "@chakra-ui/react";
import { useState } from "react";
import DragDrop from "./DragDrop";
import FilePreview from "./FilePreview";
import { FileStatus, ReactUploadFile, ReactUploadProps } from "./types/types";
import { createNewReactUploadFile } from "./Helpers";

const mockStatus = (): FileStatus => {
  const value = Math.floor(Math.random() * 7);
  let ret: FileStatus = FileStatus.ERROR;

  switch (value) {
    case 0:
      ret = FileStatus.SUCCESS;
      break;
    case 1:
      ret = FileStatus.ERROR;
      break;
    case 2:
      ret = FileStatus.UPLOADING;
      break;
    case 3:
      ret = FileStatus.QUEUED;
      break;
    case 4:
      ret = FileStatus.ADDED;
      break;
    case 5:
      ret = FileStatus.ACCEPTED;
      break;
    case 6:
      ret = FileStatus.CANCELED;
      break;
    default:
      break;
  }

  return ret;
};

const ReactUpload = ({
  minWidth = "600px",
  minHeight = "300px",
}: ReactUploadProps): JSX.Element => {
  const [files, setFiles] = useState<ReactUploadFile[]>([
    // newFile(),
  ]);

  const addFiles = (files: FileList | File[]) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reactUploadFile = createNewReactUploadFile(file);

      setFiles((prev) => [...prev, reactUploadFile]);
    }
  };

  return (
    <DragDrop minH={minHeight} minW={minWidth} onAddFiles={addFiles}>
      {!files ||
        (files.length === 0 && (
          <Center w={"100%"}>
            <Text>Drag files here!</Text>
          </Center>
        ))}

      {files &&
        files.length > 0 &&
        files.map((f) => <FilePreview {...f} key={f.uuid} />)}
    </DragDrop>
  );
};

export default ReactUpload;
