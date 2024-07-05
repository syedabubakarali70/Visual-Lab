import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const TopicCard = ({ info }: { info: { name: string; link: string } }) => {
  return (
    <Link href={`dsa/${info.link}`} className="w-full md:w-[30%] h-40 ">
      <Card className="w-full h-full flex items-center justify-center">
        <CardHeader>
          <CardTitle className="text-center">{info.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default TopicCard;
