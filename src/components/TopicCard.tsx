import * as React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const TopicCard = ({ info }: { info: { name: string; link: string } }) => {
  return (
    <Link href={`dsa/${info.link}`} className="w-5/12 ">
      <Card>
        <CardHeader>
          <CardTitle>{info.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default TopicCard;
