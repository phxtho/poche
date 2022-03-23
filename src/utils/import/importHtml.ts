import { insertNote } from "@/db/pouch/notes";
import { Renderer } from "html-to-prosemirror";

export default function ImportFromHtml(files: FileList) {
  const fileReader = new FileReader();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    fileReader.onload = (e) => {
      const htmlContent = e.target.result;
      const renderer = new Renderer();
      const prosemirrorJson = renderer.render(htmlContent);
      const title = file.name.replace(".html", "");
      insertNote(null, title, null, {
        doc: prosemirrorJson,
        selection: null,
      });
    };

    if (file.type === "text/html") fileReader.readAsText(file);
  }
}
