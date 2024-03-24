"use client";
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
// import monacoThemes from "monaco-themes/themes/themelist";
import draculaTheme from "monaco-themes/themes/GitHub Dark.json";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
const CodeBlock = ({ children }: { children: string }) => {
  // console.log(monacoThemes);
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: Monaco) {
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    editorRef.current = editor;
    console.log(editorRef)
    monaco.editor.defineTheme("dracula", {
      ...draculaTheme,
      base:'vs-dark',
      colors: { ...draculaTheme.colors, "editor.background": "#020817" },
    });
    monaco.editor.setTheme("dracula");
  }
  // function showValue() {
  //   alert(editorRef.current.getValue());
  // }
  /* load monaco */

  return (
    <>
      {/* <button onClick={showValue}>Show value</button> */}
      <div className="w-full">
        <Editor
          height="90vh"
          width="100%"
          defaultLanguage="python"
          defaultValue={children.trim()}
          theme="light"
          onMount={handleEditorDidMount}
          className="mx-auto"
          options={{
            fontSize: 12,
            minimap: {
              enabled: false,
            },
            contextmenu: false,
            readOnly: true,
            scrollBeyondLastLine: false,
            lineNumbers:'off',
            lineNumbersMinChars:0,
            lineDecorationsWidth:0,
            cursorBlinking:"expand"
          }}
        />
      </div>
    </>
  );
};

export default CodeBlock;
