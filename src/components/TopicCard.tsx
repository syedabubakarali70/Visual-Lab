import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const TopicCard = ({ info }: { info: { name: string; link: string } }) => {
  return (
    <Card className=" block w-full md:w-[45%]">
        <Link href={`dsa/${info.link}`} >
        <CardHeader>
          <CardTitle className="text-center">{info.name}</CardTitle>
        </CardHeader>
    </Link>
      </Card>
  );
};

export default TopicCard;
