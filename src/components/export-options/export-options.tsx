import React, { FunctionComponent } from "react";
import { useHelpers } from "@remirror/react";
import { FaMarkdown, FaHtml5 } from "react-icons/fa";
import FileSaver from "file-saver";
import { INote } from "model/interfaces";
import MenuItem from "components/menu-item/menu-item";

interface ExportOptionsProps {
  onRequestClose?;
  note: INote;
}

const ExportOptions: FunctionComponent<ExportOptionsProps> = (props) => {
  const { getHTML, getMarkdown } = useHelpers();
  const exportHtml = () => {
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
  };

  const exportMarkdown = () => {
    let fileName = `${props.note.title}.md`;
    let fileBlob = new Blob([getMarkdown()], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(fileBlob, fileName);

    props.onRequestClose?.();
  };

  return (
    <>
      <MenuItem onClick={exportHtml}>
        <span>Export HTML</span> <FaHtml5 />
      </MenuItem>

      <MenuItem onClick={exportMarkdown}>
        <span>Export Markdown</span> <FaMarkdown />
      </MenuItem>
    </>
  );
};

export default ExportOptions;
