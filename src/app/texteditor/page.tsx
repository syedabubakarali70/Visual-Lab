"use client";
import React, { useEffect, useRef, useState } from "react";

import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

import darkTheme from "monaco-themes/themes/Dracula.json";
import lightTheme from "monaco-themes/themes/GitHub.json";
import Output from "./Output";

const editorOptions: editor.IStandaloneDiffEditorConstructionOptions = {
  fontSize: 14,
  minimap: {
    enabled: false,
  },
  scrollBeyondLastLine: true,
  cursorBlinking: "expand",
  renderLineHighlight: "none",
  smoothScrolling: true,
  lineNumbersMinChars: 3,
  lineDecorationsWidth: 4,
  padding: {
    top: 16,
    bottom: 16,
  },
  scrollbar: {
    useShadows: false,
    verticalHasArrows: true,
    horizontalHasArrows: true,
    // vertical: "hidden",
    // horizontal: "hidden",
    verticalScrollbarSize: 0,
    horizontalScrollbarSize: 17,
    alwaysConsumeMouseWheel: false,
  },
};

const TextEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState("");
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
    editor.focus();
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

  // function showValue() {
  //   alert(editorRef.current?.getValue());
  // }

  return (
    <>
      {/* <button onClick={showValue}>Show value</button> */}
      <div className="w-full px-4 h-[90vh] flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
        <div className="w-full md:w-[70%] h-[70%] md:h-auto drop-shadow-md border-background-foreground rounded-xl overflow-y-auto">
          <Editor
            width="100%"
            loading={<Skeleton className="h-[70vh] w-full" />}
            language="javascript"
            value={value}
            onChange={(value) => setValue(value || "")}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>
        
        <Output editorRef={editorRef.current}/>
      </div>
    </>
  );
};

export default TextEditor;
