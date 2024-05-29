import { TypographyH1 } from "@/components/TypographyH1";
import {TypographyP } from "@/components/TypographyP";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <section className="flex justify-center items-center flex-col gap-3 mt-5">
        <TypographyH1>Visual Lab</TypographyH1>
        <TypographyP className="text-lg">Platform to learn DSA Visually</TypographyP>
        <div className="flex gap-3">
        <Button variant="default"><Link href="/dsa">Learn DSA</Link></Button>
        <Button variant="outline"><Link href="/texteditor">Use Text Editor</Link></Button>
        </div>
      </section>
    </>
  );
}
