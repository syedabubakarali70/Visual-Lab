"use client";
import React, { useRef } from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";

const TextEditor = () => {
  const editorRef = useRef(null);

  // function handleEditorDidMount(editor, monaco) {
  //   editorRef.current = editor;
  // }

  // function showValue() {
  //   alert(editorRef.current?.getValue());
  // }

  return (
    <>
      {/* <button onClick={showValue}>Show value</button> */}
      <div className="w-full">
        <Editor
          height="90vh"
          width="80vw"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          // onMount={handleEditorDidMount}
          theme="vs-dark"
          loading={<Skeleton className="h-[70vh] w-full"/>}
          className="mx-auto"
          options={{
            lineHeight: 25,
          }}
        />
      </div>
    </>
  );
};

export default TextEditor;
