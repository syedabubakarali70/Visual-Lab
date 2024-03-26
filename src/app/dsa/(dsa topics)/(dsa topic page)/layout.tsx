import React from "react";
import TopicListNav from "@/components/TopicListNav";
import { Toaster } from "@/components/ui/sonner";

const DSATopicPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="px-4 flex flex-col">
      <TopicListNav />
      <div className="w-full">{children}</div>
      <Toaster />
    </section>
  );
};

export default DSATopicPageLayout;
