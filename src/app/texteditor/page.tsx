"use client";
import React, { useEffect, useRef, useState } from "react";

import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import { Skeleton } from "@/components/ui/skeleton";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

import darkTheme from "monaco-themes/themes/Blackboard.json";
import lightTheme from "monaco-themes/themes/GitHub.json";
import Output from "./Output";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

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
  const [output, setOutput] = useState<string>("");

  const executeCodeInWorker = (code: string) => {
    // const blob = new Blob([workerScript], { type: "application/javascript" });
    // const worker = new Worker(URL.createObjectURL(blob));
    const worker = new Worker(new URL("./workerScript.ts", import.meta.url));

    useEffect(() => {
      const handleBeforeUnload = (e:any) => {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
  
        // Customize the message
        const confirmationMessage = 'Are you sure you want to leave?';
  
        // Display the confirmation dialog
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);

    worker.onmessage = function (e) {
      if (e.data.type === "result") {
        console.log("onmessage result: ", e.data.data);
        setOutput(e.data.data);
      } else if (e.data.type === "error") {
        setOutput(`Error: ${e.data.data}`);
      }
      worker.terminate();
    };

    worker.onerror = function (e) {
      setOutput(`Worker error: ${e.message}`);
      worker.terminate();
    };

    worker.postMessage(code);
    console.log("code : ", code);
  };

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

  async function copyContent() {
    try {
      await navigator.clipboard.writeText(value);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
  return (
    <>
      <div className="w-full h-[90vh] flex flex-col md:flex-row  justify-between items-stretch box-border gap-2">
        <div className="w-full md:w-[70%] h-[70%] md:h-auto flex flex-col border rounded-md items-stretch">
        <div className="w-full flex justify-between items-center pl-4 border-bottom-2">
            <span className="text-sm flex items-center">              
                <span>Text Editor</span>
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
            value={value}
            onChange={(value) => setValue(value || "")}
            onMount={handleEditorDidMount}
            options={editorOptions}
          />
        </div>
        {/* <div className="flex items-start">
          <button onClick={() => executeCodeInWorker(value)}>Run</button>
          <div className="bg-purple-600 h-56 w-8">{output}</div>
        </div> */}
        <div className="w-full md:w-[30%] h-[30%] md:h-auto">
          <Output editorRef={editorRef.current} open={false} />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
