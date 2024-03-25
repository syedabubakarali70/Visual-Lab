"use client";
import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import darkTheme from "monaco-themes/themes/Dracula.json";
import lightTheme from "monaco-themes/themes/GitHub Light.json";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

// type Code = {
//   "Python": string;
//   "JavaScript": string;
//   "C++": string;
// };

const CodeBlock = ({ code }:{code:object}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme, setTheme } = useTheme();
  const [selectedFile, setSelectedFile] = useState(
    "JavaScript"
  );
  let codeBlockTheme = theme === "dark" ? "darkTheme" : "lightTheme";
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
      monaco.editor.setTheme(codeBlockTheme);
    }
  }, [theme]);

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor;
    monacoRef.current = monaco;
    monaco.editor.defineTheme("darkTheme", {
      ...darkTheme,
      base: "vs-dark",
    });
    monaco.editor.defineTheme("lightTheme", {
      ...lightTheme,
      base: "hc-light",
    });
    monaco.editor.setTheme(codeBlockTheme);
  }
  const fileTypes = ["JavaScript", "Python", "C++"];
  const handleClick = (fileType: string) => {
    setSelectedFile(fileType);
  };
  useEffect(() => {
    localStorage.setItem("fileType", selectedFile);
    console.log(selectedFile);
    console.log(localStorage.fileType);
  }, [selectedFile]);

  // typeof Storage !== "undefined"
  // ? localStorage.fileType
  //   ? localStorage.fileType
  //   : "JavaScript"
  // : "JavaScript"

  return (
    <>
      <div className="w-full my-4 overflow-y-auto border drop-shadow-md border-background-foreground rounded-2xl">
        <div className="bg-secondary py-2">
          {fileTypes.map((fileType, index) => (
            <Button
              key={index}
              variant={
                selectedFile === fileType
                  ? "codeBlocklink_active"
                  : "codeBlocklink_inactive"
              }
              onClick={(e) => {
                e.stopPropagation();
                handleClick(fileType);
              }}
            >
              {fileType}
            </Button>
          ))}
        </div>
        <Editor
          height="70vh"
          width="100%"
          loading={<Skeleton className="h-[70vh] w-full" />}
          defaultLanguage="python"
          value={code[selectedFile as keyof typeof code]}
          theme="light"
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
            contextmenu: false,
            readOnly: true,
            scrollBeyondLastLine: false,
            lineNumbers: "off",
            lineNumbersMinChars: 0,
            lineDecorationsWidth: 16,
            cursorBlinking: "expand",
            renderLineHighlight: "none",
            smoothScrolling: true,
            folding: false,
            cursorWidth: 0,
            padding: {
              top: 16,
              bottom: 16,
            },
            readOnlyMessage: {
              value: "",
            },
            scrollbar: {
              useShadows: false,
              verticalHasArrows: true,
              horizontalHasArrows: true,
              vertical: "hidden",
              horizontal: "hidden",
              verticalScrollbarSize: 0,
              horizontalScrollbarSize: 17,
              alwaysConsumeMouseWheel: false,
            },
          }}
        />
      </div>
    </>
  );
};

export default CodeBlock;
