"use client";
import React, { useRef,useContext } from "react";
import Editor from "@monaco-editor/react";
import draculaTheme from "monaco-themes/themes/Dracula.json";
import { editor } from "monaco-editor";
import { Monaco } from "@monaco-editor/react";
const CodeBlock = ({ children }: { children: string }) => {
  const editorRef = useRef({});
// const theme = useContext(ThemeProvider)
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
      <div className="w-full my-4 overflow-y-auto">
        <Editor
          height="70vh"
          width="100%"
          defaultLanguage="python"
          defaultValue={children.trim()}
          theme="light"
          onMount={handleEditorDidMount}
          // className="overflow-scroll overflow-y-auto"
          options={{
            fontSize: 14,
            minimap: {
              enabled: false,
            },
            contextmenu: false,
            readOnly: true,
            scrollBeyondLastLine: false,
            lineNumbers:'off',
            lineNumbersMinChars:0,
            lineDecorationsWidth:0,
            cursorBlinking:"expand",
            renderLineHighlight:"none",
            scrollbar: {
              useShadows: false,
              verticalHasArrows: true,
              horizontalHasArrows: true,
              vertical: 'hidden',
              horizontal: 'hidden',
              verticalScrollbarSize: 0,
              horizontalScrollbarSize: 17,
              alwaysConsumeMouseWheel:false
            },
          }}
        />
      </div>
    </>
  );
};

export default CodeBlock;
