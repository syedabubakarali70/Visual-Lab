"use client";
import ChatRoom from "@/components/ChatRoom";
import React, { useEffect, useRef, useState } from "react";

import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

import darkTheme from "monaco-themes/themes/Dracula.json";
import lightTheme from "monaco-themes/themes/GitHub.json";
import Output from "@/app/texteditor/Output";
import { useObjectVal } from "react-firebase-hooks/database";
import { ref, update } from "firebase/database";
import { rdb, db } from "@/lib/firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";

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
const Page = ({ params }: { params: { roomid: string } }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const { theme, setTheme } = useTheme();
  const [roomInfo, loading, error] = useDocument(
    doc(db, "rooms", params.roomid)
  );
  const [code, codeLoading, codeError] = useObjectVal(ref(rdb, "codes/" + roomInfo?.data()?.codeRef +"/codes") ) as [any, boolean, Error];
  const [value, setValue] = useState("");
  
  const handleUploadCode = (value: string) => {
    const updates: { [key: string]: any } = {};
    updates["/codes/" + roomInfo?.data()?.codeRef+'/codes'] = value;
    update(ref(rdb), updates);
    setValue(value);
    };
    
    useEffect(() => {
      if (roomInfo){ 
        setValue(code || "");}
  }, [code]);

  useEffect(() => {}, [value]);
  let codeBlockTheme = theme === "dark" ? "darkTheme" : "lightTheme";
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
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
  return (
    <section className="h-[85vh]">
    <div className="border pl-4 rounded-md flex justify-between items-center my-2">
      <span className="text-md font-semibold">{roomInfo?.data()?.roomName}</span>
      <ChatRoom roomId={params.roomid} />

    </div>

      <div className="w-full h-full flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
        <div className="w-full md:w-[70%] h-[70%] md:h-auto drop-shadow-md border-background-foreground rounded-xl overflow-y-auto">
          <Editor
            width="100%"
            loading={<Skeleton className="w-full md:w-[70%] h-[70%] md:h-auto" />}
            language="javascript"
            value={value}
            onChange={(value) => handleUploadCode(value || "")}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>
        <Output editorRef={editorRef.current} />
      </div>
    </section>
  );
};

export default Page;
