import { useState, useRef } from "react";
import { Box, Flex, FlexProps } from "@chakra-ui/react";

export interface DragDropProps extends FlexProps {
  onAddFiles: (files: FileList | File[]) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const DragDrop = ({
  onAddFiles,
  onClick,
  children,
  ...flexProps
}: DragDropProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    noPropagation(e);
    setIsDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    let efct;

    try {
      efct = e.dataTransfer.effectAllowed;
    } catch (error) {
      console.log("error handleDragOver");
    }

    e.dataTransfer.dropEffect =
      efct === "move" || efct === "linkMove" ? "move" : "copy";

    noPropagation(e);
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    noPropagation(e);
    setIsDragOver(false);

    if (!e.dataTransfer) return;

    let files = [];

    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      files[i] = e.dataTransfer.files[i];
    }

    if (files.length) {
      let { items } = e.dataTransfer;
      if (items && items.length && items[0].webkitGetAsEntry != null) {
        addFilesFromItems(items);
      } else {
        onAddFiles(files);
      }
    }
  };

  const addFilesFromItems = (items: DataTransferItemList) => {
    return (() => {
      for (let item of items) {
        var entry: FileSystemEntry | null;

        if (
          item.webkitGetAsEntry != null &&
          (entry = item.webkitGetAsEntry())
        ) {
          if (entry.isFile) {
            const _f = item.getAsFile();
            if (_f) onAddFiles([_f]);
          } else if (entry.isDirectory) {
            addFilesFromDirectory(entry as FileSystemDirectoryEntry);
          }
        } else if (item.getAsFile != null) {
          if (item.kind === "file") {
            const _f = item.getAsFile();
            if (_f) onAddFiles([_f]);
          }
        }
      }
    })();
  };

  const addFilesFromDirectory = (directory: FileSystemDirectoryEntry) => {
    let dirReader = directory.createReader();

    const readEntries = () => {
      dirReader.readEntries(
        async (entries: FileSystemEntry[]) => {
          if (entries.length > 0) {
            for (let entry of entries) {
              if (entry.isFile) {
                (entry as FileSystemFileEntry).file(
                  (file: File) => onAddFiles([file]),
                  (e) => console.log("error reading directory files files:", e)
                );
              } else if (entry.isDirectory) {
                addFilesFromDirectory(entry as FileSystemDirectoryEntry);
              }
            }

            readEntries();
          }
        },
        (e) => console.log("error reading directory files:", e)
      );
    };

    readEntries();
  };

  const containsFiles = function (e: React.DragEvent<HTMLDivElement>) {
    if (e.dataTransfer.types) {
      for (var i = 0; i < e.dataTransfer.types.length; i++) {
        if (e.dataTransfer.types[i] === "Files") return true;
      }
    }

    return false;
  };

  const noPropagation = function (e: React.DragEvent<HTMLDivElement>) {
    if (!containsFiles(e)) return;
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  };

  return (
    <Flex
      {...flexProps}
      border={isDragOver ? undefined : "1px dashed #CBD2E0"}
      opacity={isDragOver ? 0.5 : undefined}
      borderColor={isDragOver ? "transparent" : undefined}
      boxShadow={isDragOver ? "0 0 0 2.5px white" : undefined}
      cursor={"pointer"}
      borderRadius={"6px"}
      w={"100%"}
      p={"16px"}
      gap={"13px"}
      flexWrap={"wrap"}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      onClick={() => fileInputRef.current?.click()}
    >
      <Box visibility={"hidden"} position={"absolute"} top={0} left={0}>
        <input
          ref={fileInputRef}
          type={"file"}
          name="dropfile"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            let { files } = e.target;

            if (files && files.length) {
              onAddFiles(files);
            }
          }}
        />
      </Box>

      {children}
    </Flex>
  );
};

export default DragDrop;
