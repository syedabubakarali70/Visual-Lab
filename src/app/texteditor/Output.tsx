import { Button } from "@/components/ui/button";
import { editor } from "monaco-editor";
import React, { useState } from "react";
import { executeCode, getLanguages } from "../api/route";
import { ReloadIcon } from "@radix-ui/react-icons";

const Output = ({
  editorRef,
}: {
  editorRef: editor.IStandaloneCodeEditor | null;
}) => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    if (!editorRef) return;
    try {
      setIsLoading(true);
      // let res = await getLanguages();
      const { run: result } = await executeCode(
        "javascript",
        "1.32.3",
        editorRef.getValue()
      );
      setOutput(result.output);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-stretch border w-full md:w-[30%] h-[30%] md:h-auto px-4 py-2 rounded-xl">
      <div className="w-full">
        <Button onClick={() => runCode()} disabled={isLoading}>
          {isLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Run Code"
          )}
        </Button>
      </div>
      <div className="w-full md:w-[30%] h-[100%] md:h-auto py-4 rounded-xl">
        {output}
      </div>
    </div>
  );
};

export default Output;
