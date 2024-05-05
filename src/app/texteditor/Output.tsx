import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import React from "react";
import { transform } from "@babel/standalone";
import { LogsContainer } from "./Console";
const Output = ({
  editorRef,
}: {
  editorRef: editor.IStandaloneCodeEditor | null;
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

  // const runCode = async () => {
  //   if (!editorRef) return;
  //   try {
  //     setIsLoading(true);
  //     // let res = await getLanguages();
  //     const { run: result } = await executeCode(
  //       "javascript",
  //       "1.32.3",
  //       editorRef.getValue()
  //     );
  //     setOutput(result.output);
  //   } catch (error) {
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-stretch border w-full md:w-[30%] h-[30%] md:h-auto px-4 py-2 rounded-xl">
      <div className="w-full">
        <Button onClick={() => runCode()}>Run Code</Button>
      </div>
      <LogsContainer />
    </div>
  );
};

export default Output;
