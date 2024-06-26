import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import React from "react";
import { transform } from "@babel/standalone";
import { LogsContainer } from "./Console";
import { PlayIcon } from "@radix-ui/react-icons";
const Output = ({
  editorRef,
  open
}: {
  editorRef: editor.IStandaloneCodeEditor | null;
  open:boolean
}) => {
  function runCode() {
    const code = editorRef?.getValue() || "";

    try {
      // Transpile the code using Babel Standalone
      const transpiledCode = transform(code, { presets: ["env"] }).code ?? "";
      eval(transpiledCode);
    } catch (error) {
      // Display any errors in the console
      console.error("Error:", error);
    }
  }

  return (
    <div className={`flex flex-col items-stretch border w-full h-[30%] ${open ? "md:h-[40%]": "h-[100%]"} py-2 rounded-xl overflow-scroll chatbox`}>
      <div className="w-full flex justify-between items-center pb-2 pl-4 border-bottom-2">
        <span className="text-sm font-semibold">Console</span>
        <Button onClick={() => runCode()} variant={"ghost"} className="rounded-full"><PlayIcon/></Button>
      </div>
      <LogsContainer />
    </div>
  );
};

export default Output;
