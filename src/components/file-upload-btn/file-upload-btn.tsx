import React, { FunctionComponent, useRef } from "react";
import { FiUpload } from "react-icons/fi";

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

interface FileUploadBtnProps {
  maxFileSize?: number;
  multiple?: boolean;
  onUpload?(files: FileList): any;
  accept?: string;
}

const FileUploadBtn: FunctionComponent<FileUploadBtnProps> = ({
  onUpload,
  maxFileSize = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  multiple = false,
  accept = "*",
}) => {
  const fileInputField = useRef(null);

  return (
    <section>
      <button
        type="button"
        className="flex space-x-2 items-center bg-black text-white px-5 py-2 rounded-3xl"
        onClick={(e) => fileInputField.current.click()}
      >
        <FiUpload />
        <span> Upload {multiple ? "files" : "a file"}</span>
      </button>
      <input
        type="file"
        ref={fileInputField}
        title=""
        value=""
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const { files } = e.target;
          if (files.length) {
            onUpload?.(files);
          }
        }}
      />
    </section>
  );
};

export default FileUploadBtn;
