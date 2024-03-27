"use client";
import React, { useEffect, useRef } from "react";

import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

import darkTheme from "monaco-themes/themes/Dracula.json";
import lightTheme from "monaco-themes/themes/GitHub.json";

const TextEditor = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme, setTheme } = useTheme();
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
            value="console.log('Hello World')"
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: {
                enabled: false,
              },
              scrollBeyondLastLine: false,
              cursorBlinking: "expand",
              renderLineHighlight: "none",
              smoothScrolling: true,
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
        <div className="bg-secondary w-full md:w-[30%] h-[30%] md:h-auto px-4 py-2 rounded-xl">
          Hello World
        </div>
      </div>
    </>
  );
};

export default TextEditor;
