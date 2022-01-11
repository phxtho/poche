import React, { FunctionComponent } from "react";
import { useHelpers } from "@remirror/react";
import { FaMarkdown, FaHtml5 } from "react-icons/fa";
import FileSaver from "file-saver";
import { INote } from "model/interfaces";

interface ExportOptionsProps {
  onRequestClose?;
  note: INote;
}

const ExportOptions: FunctionComponent<ExportOptionsProps> = (props) => {
  const { getHTML, getMarkdown } = useHelpers();
  return (
    <>
      <button
        className="w-full h-16 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200"
        onClick={() => {
          const htmlContent = `<!DOCTYPE html>
          <html>
          <head>
            <link href="https://cdn.jsdelivr.net/npm/base-css-theme@1.1.3/base.css" rel="stylesheet">
          </head>
          <body style="padding: 16px;">${getHTML()}</body>
          </html>`;

          let fileName = `${props.note.title}.html`;
          let fileBlob = new Blob([htmlContent], {
            type: "text/plain;charset=utf-8",
          });
          FileSaver.saveAs(fileBlob, fileName);

          props.onRequestClose?.();
        }}
      >
        <FaHtml5 className="mx-auto" /> Export HTML
      </button>

      <button
        className="w-full h-16 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-200"
        onClick={() => {
          let fileName = `${props.note.title}.md`;
          let fileBlob = new Blob([getMarkdown()], {
            type: "text/plain;charset=utf-8",
          });
          FileSaver.saveAs(fileBlob, fileName);

          props.onRequestClose?.();
        }}
      >
        <FaMarkdown className="mx-auto" /> Export Markdown
      </button>
    </>
  );
};

export default ExportOptions;
