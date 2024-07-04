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
import {
  child,
  get,
  onDisconnect,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";
import { rdb, db } from "@/lib/firebase/clientApp";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import RoomMembers from "@/components/RoomMembers";
import { Button } from "@/components/ui/button";
import { ChatBubbleIcon, CopyIcon } from "@radix-ui/react-icons";
import { UserAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

const Page = ({ params }: { params: { roomid: string } }) => {
  const { user } = UserAuth();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [open, setOpen] = useState(false);
  const roomId = params.roomid;

  const handleOpen = () => {
    setOpen(!open);
  };
  const { theme, setTheme } = useTheme();
  const [roomInfo, roomLoading, roomError] = useDocument(
    doc(db, "rooms", roomId)
  );
  const [typing, typingLoading, typingError] = useObjectVal(
    ref(rdb, "rooms/" + roomInfo?.data()?.codeRef + "/typing")
  ) as [string, boolean, Error];
  const [code, codeLoading, codeError] = useObjectVal(
    ref(rdb, "rooms/" + roomInfo?.data()?.codeRef + "/code")
  ) as [any, boolean, Error];
  const [canCode, canCodeLoading, canCodeError] = useObjectVal(
    ref(
      rdb,
      "rooms/" +
        roomInfo?.data()?.codeRef +
        "/members/" +
        user?.uid +
        "/canCode"
    )
  ) as [boolean, boolean, Error];
  const [canChat, canChatLoading, canChatError] = useObjectVal(
    ref(
      rdb,
      "rooms/" +
        roomInfo?.data()?.codeRef +
        "/members/" +
        user?.uid +
        "/canChat"
    )
  ) as [boolean, boolean, Error];
  const [isAdmin, isAdminLoading, isAdminError] = useObjectVal(
    ref(
      rdb,
      "rooms/" +
        roomInfo?.data()?.codeRef +
        "/members/" +
        user?.uid +
        "/isAdmin"
    )
  ) as [boolean, boolean, Error];

  const editorOptions: editor.IStandaloneDiffEditorConstructionOptions = {
    fontSize: 14,
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: true,
    ...{ readOnly: !isAdmin && !canCode },
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

  const [value, setValue] = useState("");

  const connectedRef = ref(rdb, ".info/connected");

  useEffect(() => {
    user &&
      roomInfo &&
      onValue(connectedRef, (snap) => {
        let data = {
          memberName: user.displayName,
          isOnline: true,
          memberId: user.uid,
          isAdmin: false,
          canChat: true,
          canCode: true,
        };
        if (snap.val() === true) {
          // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

          roomInfo &&
            get(
              child(
                ref(rdb),
                "rooms/" + roomInfo?.data()?.codeRef + "/members/" + user?.uid
              )
            ).then((snap) => {
              if (snap.exists()) {
                set(
                  ref(
                    rdb,
                    "rooms/" +
                      roomInfo?.data()?.codeRef +
                      "/members/" +
                      user?.uid +
                      "/isOnline"
                  ),
                  true
                );
              } else {
                update(
                  ref(
                    rdb,
                    "rooms/" +
                      roomInfo?.data()?.codeRef +
                      "/members/" +
                      user?.uid
                  ),
                  data
                );
              }
            });

          // When I disconnect, remove this device1
          const onDisconnectRef = onDisconnect(
            ref(
              rdb,
              "rooms/" +
                roomInfo?.data()?.codeRef +
                "/members/" +
                user?.uid +
                "/isOnline"
            )
          );
          onDisconnectRef.set(false);
        }
      });
    return () => {
      user &&
        roomInfo &&
        set(
          ref(
            rdb,
            "rooms/" +
              roomInfo?.data()?.codeRef +
              "/members/" +
              user?.uid +
              "/isOnline"
          ),
          false
        );
    };
  }, [user, roomInfo]);

  const handleUploadCode = (value: string) => {
    const updates: { [key: string]: any } = {};
    updates["/rooms/" + roomInfo?.data()?.codeRef + "/code"] = value;
    update(ref(rdb), updates);
    setValue(value);
  };

  useEffect(() => {
    const updates: { [key: string]: any } = {};
    if (roomInfo && user) {
      updates["/rooms/" + roomInfo?.data()?.codeRef + "/typing"] =
        user.displayName;
      update(ref(rdb), updates);
      const timeout = setTimeout(() => {
        updates["/rooms/" + roomInfo?.data()?.codeRef + "/typing"] = "";
        update(ref(rdb), updates);
      }, 2000);
      return () => clearInterval(timeout);
    }
  }, [value]);

  // useEffect(() => {
  //   if (roomInfo && user) {
  //     setValue(code || "");
  //   }
  // }, [code]);

  let codeBlockTheme = theme === "dark" ? "darkTheme" : "lightTheme";
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      monaco.editor.setTheme(codeBlockTheme);
    }
  }, [theme]);

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }

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
  else if (!user)
    return <div className="text-center mt-10 text-2xl">Please sign in</div>;
  else {
    if (roomError || codeError || roomInfo?.data() === undefined)
      return (
        <div className="text-center mt-10 text-2xl">Room doesn't exist</div>
      );
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
        <div className="w-full md:w-[70%] h-[70%] md:h-auto flex flex-col border rounded-md items-stretch">
          <div className="w-full flex justify-between items-center pl-4 border-bottom-2">
            <span className="text-sm flex items-center">
              {" "}
              {typing ? (
                <div className="flex items-center space-x-2">
                  <span>{typing} is typing</span>
                  <div className="flex space-x-1 items-end">
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-200"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>
              ) : (
                <span>Text Editor</span>
              )}
            </span>
            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
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
            width="100%"
            loading={
              <Skeleton className="w-full md:w-[70%] h-[70%] md:h-auto" />
            }
            language="javascript"
            value={code}
            onChange={(value) => handleUploadCode(value || "")}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>
        <div className=" w-full md:w-[30%] h-[30%] md:h-auto flex flex-col gap-2">
          <Output editorRef={editorRef.current} open={open} />
          <ChatRoom
            roomId={params.roomid}
            open={open}
            disabled={!isAdmin && !canChat}
          />
        </div>
      </div>
    </section>
  );
}
};

export default Page;
