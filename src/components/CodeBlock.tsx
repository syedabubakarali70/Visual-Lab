"use client";
import React, { useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import darkTheme from "monaco-themes/themes/Dracula.json";
import lightTheme from "monaco-themes/themes/GitHub Light.json";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
import { useTheme } from "next-themes";
const CodeBlock = ({ children }: { children: string }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme, setTheme } = useTheme();
  let codeBlockTheme = theme === "dark" ? darkTheme : lightTheme;
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log('here is the monaco instance:', monaco);
      monaco.editor.defineTheme("dracula", {
        ...codeBlockTheme,
        base: "vs-dark",
      });
      monaco.editor.setTheme("dracula");
    }
  }, [theme]);

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    // console.log('onMount: the editor instance:', editor);
    // console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
    monacoRef.current=monaco;
    // console.log(editorRef)
    monaco.editor.defineTheme("dracula", {
      ...codeBlockTheme,
      base: "vs-dark",
    });
    monaco.editor.setTheme("dracula");
  }
  return (
    <>
      <div className="w-full my-4 overflow-y-auto">
        <Editor
          height="70vh"
          width="100%"
          defaultLanguage="python"
          defaultValue={children.trim()}
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
            lineDecorationsWidth: 0,
            cursorBlinking: "expand",
            renderLineHighlight: "none",
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
