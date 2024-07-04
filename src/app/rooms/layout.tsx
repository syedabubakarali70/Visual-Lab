import { Toaster } from "@/components/ui/sonner";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section>
        {children}
      <Toaster richColors/>
    </section>
  );
};

export default Layout;