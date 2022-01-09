import type { RefractorSyntax } from "refractor/core";
import bash from "refractor/lang/bash";
import c from "refractor/lang/c";
import clojure from "refractor/lang/clojure";
import csharp from "refractor/lang/csharp";
import cpp from "refractor/lang/cpp";
import css from "refractor/lang/css";
import go from "refractor/lang/go";
import jsx from "refractor/lang/jsx";
import markdown from "refractor/lang/markdown";
import markup from "refractor/lang/markup";
import python from "refractor/lang/python";
import regex from "refractor/lang/regex";
import rust from "refractor/lang/rust";
import sql from "refractor/lang/sql";
import typescript from "refractor/lang/typescript";

const SupportedLanguages: RefractorSyntax[] = [
  bash,
  c,
  clojure,
  csharp,
  cpp,
  css,
  go,
  jsx,
  markdown,
  markup,
  python,
  regex,
  rust,
  sql,
  typescript,
];

export default SupportedLanguages;
