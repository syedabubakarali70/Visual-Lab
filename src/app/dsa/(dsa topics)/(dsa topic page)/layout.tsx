import React from "react";
import TopicListNav from "@/components/TopicListNav";
import { Toaster } from "@/components/ui/sonner";

const DSATopicPageLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="flex flex-col lg:flex-row">
      <TopicListNav />
      <div className="w-full lg:w-[70%] m-auto">{children}</div>
      <Toaster />
    </section>
  );
};

export default DSATopicPageLayout;
