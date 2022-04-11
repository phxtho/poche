import { FunctionComponent } from "react";

import FileUploadBtn from "@/components/file-upload-btn/file-upload-btn";
import ImportFromHtml from "@/utils/import/importHtml";

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  return (
    <>
      <div className="p-5">
        <h1>Import HTML</h1>
        <FileUploadBtn
          accept=".html"
          onUpload={(files) => ImportFromHtml(files)}
        />
      </div>
    </>
  );
};

export default Settings;
