import { useCommands, useActive, useRemirrorContext } from "@remirror/react";
import { BsTypeUnderline } from "react-icons/bs";
import {
  VscBold,
  VscChecklist,
  VscCode,
  VscDiscard,
  VscItalic,
  VscListUnordered,
  VscQuote,
  VscRedo,
} from "react-icons/vsc";
import "./toolbar.css";

const ActiveClass = (isActive: boolean) => {
  return isActive ? "active" : "";
};

const Toolbar = () => {
  const commands = useCommands();
  const active = useActive();

  return (
    <div className="toolbar space-x-2">
      <button
        onClick={() => {
          commands.undo();
          commands.focus();
        }}
      >
        <VscDiscard />
      </button>
      <button
        className={ActiveClass(active.bold())}
        onClick={() => {
          commands.toggleBold();
          commands.focus();
        }}
      >
        <VscBold />
      </button>
      <button
        className={ActiveClass(active.italic())}
        onClick={() => {
          commands.toggleItalic();
          commands.focus();
        }}
      >
        <VscItalic />
      </button>

      <button
        className={ActiveClass(active.underline())}
        onClick={() => {
          commands.toggleUnderline();
          commands.focus();
        }}
      >
        <BsTypeUnderline />
      </button>
      <button
        className={ActiveClass(active.code())}
        onClick={() => {
          commands.toggleCode();
          commands.focus();
        }}
      >
        <VscCode />
      </button>

      <button
        className={ActiveClass(active.blockquote())}
        onClick={() => {
          commands.toggleBlockquote();
          commands.focus();
        }}
      >
        <VscQuote />
      </button>

      <button
        className={ActiveClass(active.bulletList())}
        onClick={() => {
          commands.toggleBulletList();
          commands.focus();
        }}
      >
        <VscListUnordered />
      </button>

      <button
        className={ActiveClass(active.taskList())}
        onClick={() => {
          commands.toggleTaskList();
          commands.focus();
        }}
      >
        <VscChecklist />
      </button>

      <button
        onClick={() => {
          commands.redo();
          commands.focus();
        }}
      >
        <VscRedo />
      </button>
    </div>
  );
};

export default Toolbar;
