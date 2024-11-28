import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { auth } from "@/auth";
import Error from "@/components/Error";
import { Calendar, HomeIcon, InboxIcon, SearchIcon, SettingsIcon, ShieldXIcon } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AdminNav from "@/components/admin/AdminNav";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Asbaaq | HSB Secunderabad",
  description: "Module for managing asbaaq and activities related to asbaaq.",
};

export const poppins =Poppins({
subsets: ["latin"],
weight: "500",
})
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (session?.user.role !== "ADMIN" && session?.user.role !== "SUPERADMIN") {
    metadata.title = "Unauthorized Access";
    metadata.description = "You are not authorized to access this page.";
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <Error
          title={
            <div className="flex flex-row items-center justify-center gap-x-3 w-full text-center text-red-700 font-bold">
              <ShieldXIcon className="h-8 w-8" />
              <p>Access Denied!</p>
            </div>
          }
          description={
            <p className="text-lg">
              You don't have sufficient permissions to access this page.
              <br />
              <strong>
                If you think this is an error, please contact the Administrator.
              </strong>
            </p>
          }
          footer={
            <code className="font-bold">
              ERROR CODE : PERMISSION_ROLE_{session?.user.role}
            </code>
          }
        />
      </main>
    );
  }

  // Menu items.
  const superAdmin = [
    {
      title: "Home",
      url: "#",
      icon: <HomeIcon/>,
    },
    {
      title: "Inbox",
      url: "#",
      icon: <InboxIcon/>,
    },
    {
      title: "Calendar",
      url: "#",
      icon: <Calendar/>,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon/>,
    },
    {
      title: "Settings",
      url: "#",
      icon: <SettingsIcon/>,
    },
  ]


  const admin = [
    {
      title: "Home",
      url: "#",
      icon: <HomeIcon/>,
    },
    {
      title: "Settings",
      url: "#",
      icon: <SettingsIcon/>,
    },
  ]
  

  return (
    <SidebarProvider>
    <AppSidebar navItems={session.user.role === 'ADMIN' ? admin : superAdmin}/>
    <main className={cn("w-full flex flex-col p-10", poppins.className)}>
        <AdminNav/>
      {children}
    </main>
  </SidebarProvider>
  );
}