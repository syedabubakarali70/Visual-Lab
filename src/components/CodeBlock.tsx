"use client";
import React from "react";

import Editor from "@monaco-editor/react";

const CodeBlock = ({ children }: { children: string }) => {
  // const editorRef = useRef(null);

  // function handleEditorDidMount(editor, monaco) {
  //   editorRef.current = editor;
  // }

  // function showValue() {
  //   alert(editorRef.current.getValue());
  // }

  return (
    <>
      {/* <button onClick={showValue}>Show value</button> */}
      <div className="w-full">
        <Editor
          height="90vh"
          width="80vw"
          defaultLanguage="python"
          defaultValue={children.trim()}
          // onMount={handleEditorDidMount}
          theme="vs-dark"
          className="mx-auto"
          options={{
            fontSize:16,
            minimap:{
                enabled:false
            },
            contextmenu:false,
            readOnly:true,
            scrollBeyondLastLine: false,
          }}
          
        />
      </div>
    </>
  );
};

export default CodeBlock;
