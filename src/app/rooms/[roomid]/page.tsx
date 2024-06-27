"use client";
import ChatRoom from "@/components/ChatRoom";
import React, { useEffect, useRef, useState } from "react";

import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

import darkTheme from "monaco-themes/themes/Blackboard.json";
import lightTheme from "monaco-themes/themes/GitHub.json";
import Output from "@/app/texteditor/Output";
import { useObjectVal } from "react-firebase-hooks/database";
import { onDisconnect, onValue, ref, set, update } from "firebase/database";
import { rdb, db } from "@/lib/firebase/clientApp";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import RoomMembers from "@/components/RoomMembers";
import { Button } from "@/components/ui/button";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { UserAuth } from "@/app/context/AuthContext";
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
  const {user} = UserAuth();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [open, setOpen] = useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  const { theme, setTheme } = useTheme();
  const [roomInfo, roomLoading, roomError] = useDocument(
    doc(db, "rooms", params.roomid)
  );
  const [code, codeLoading, codeError] = useObjectVal(
    ref(rdb, "rooms/" + roomInfo?.data()?.codeRef + "/code")
  ) as [any, boolean, Error];
  const [value, setValue] = useState("");
  const presenceRef = ref(
    rdb,
    "rooms/" + roomInfo?.data()?.codeRef + "/members/" + user.uid + "/isOnline"
  );
  const connectedRef = ref(rdb, ".info/connected");
  useEffect(() => {
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
        set(presenceRef, true).then(
          () => {
            onValue(ref(rdb,"rooms/" + roomInfo?.data()?.codeRef + "/members/" + user.uid), (snap) => {
              let data ={
                memberName: user.displayName,
                isOnline: true,
                memberId: user.uid,
                isAdmin: false
              }
              if (snap.val().isAdmin === true ) {
                data.isAdmin = true;
              }
              set(ref(rdb,"rooms/" + roomInfo?.data()?.codeRef + "/members/" + user.uid),data );
            });
          }
        );
        // When I disconnect, remove this device1
        const onDisconnectRef = onDisconnect(presenceRef);
        onDisconnectRef.set(false);
      }
    })
    return () => {
      set(presenceRef, false);
    }
  });

  const handleUploadCode = (value: string) => {
    const updates: { [key: string]: any } = {};
    updates["/rooms/" + roomInfo?.data()?.codeRef + "/code"] = value;
    update(ref(rdb), updates);
    setValue(value);
  };

  useEffect(() => {
    if (roomInfo) {
      setValue(code || "");
    }
  }, [code]);

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
  if (roomLoading || codeLoading)
    return (
      <section className="h-[85vh]">
        <Skeleton className="border pl-4 rounded-md flex justify-between items-center my-2 h-[1.75rem]"></Skeleton>

        <div className="w-full h-full flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
          <Skeleton className="w-full md:w-[70%] h-[70%] md:h-auto drop-shadow-md border-background-foreground rounded-xl overflow-y-auto"></Skeleton>
          <Skeleton className="flex flex-col items-stretch border w-full md:w-[30%] h-[30%] md:h-auto py-2 rounded-xl overflow-scroll chatbox"></Skeleton>
        </div>
      </section>
    );
  else if (roomError || codeError || roomInfo?.data() === undefined)
    return <div className="text-center mt-10 text-2xl">Room doesn't exist</div>;
  return (
    <section className="h-[85vh]">
      <div className="border pl-4 rounded-md flex justify-between items-center my-2">
        <span className="text-lg font-semibold">
          {roomInfo?.data()?.roomName}
        </span>
        <div>
          <RoomMembers roomId={params.roomid} />
          <Button onClick={handleOpen} variant={"ghost"}>
            <ChatBubbleIcon />
          </Button>
        </div>
      </div>

      <div className="w-full h-full flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
        <div className="w-full md:w-[70%] h-[70%] md:h-auto drop-shadow-md border-background-foreground rounded-xl overflow-y-auto">
          <Editor
            width="100%"
            loading={
              <Skeleton className="w-full md:w-[70%] h-[70%] md:h-auto" />
            }
            language="javascript"
            value={value}
            onChange={(value) => handleUploadCode(value || "")}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>
        <div className=" w-full md:w-[30%] h-[30%] md:h-auto flex flex-col gap-2">
          <Output editorRef={editorRef.current} open={open} />
          <ChatRoom roomId={params.roomid} open={open} />
        </div>
      </div>
    </section>
  );
};

export default Page;
