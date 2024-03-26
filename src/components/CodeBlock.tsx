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
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner"


// type Code = {
//   "Python": string;
//   "JavaScript": string;
//   "C++": string;
// };
const checkLocalStorage = () => {
  if (typeof Storage !== "undefined") {
    if (localStorage.fileType) {
      console.log("Setter wala " + localStorage.fileType);
      return localStorage.fileType;
    } else return "javascript";
  } else return "javascript";
};

const CodeBlock = ({ code }: { code: object }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme, setTheme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<string>("javascript");
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
  const fileTypes = ["javascript", "python", "cpp"];
  const handleClick = (fileType: string) => {
    setSelectedFile(fileType);
  };
  useEffect(() => {
    localStorage.setItem("fileType", selectedFile);
  }, [selectedFile]);

  console.log("render");

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(
        code[selectedFile as keyof typeof code]
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

  return (
    <>
      <div className="w-full my-4 overflow-y-auto border drop-shadow-md border-background-foreground rounded-xl">
        <div className="bg-secondary py-2 flex justify-between">
          <div>
            {fileTypes.map((fileType, index) => (
              <Button
                key={index}
                variant={
                  selectedFile == fileType
                    ? "codeBlocklink_active"
                    : "codeBlocklink_inactive"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(fileType);
                }}
              >
                {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
              </Button>
            ))}
          </div>
          <div className="flex justify-center items-center mr-2">
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                copyContent();
                toast("Code copied to clipboard");
              }}
              className="hover:bg-primary/10"
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Editor
          height="70vh"
          width="100%"
          loading={<Skeleton className="h-[70vh] w-full" />}
          language={selectedFile}
          value={code[selectedFile as keyof typeof code]}
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
            domReadOnly: true,
            cursorWidth: 0,
            padding: {
              top: 16,
              bottom: 16,
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
