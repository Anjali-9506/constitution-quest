
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Award,
  History,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/icons";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Constitution Explorer", icon: BookOpen },
  { href: "/quizzes", label: "Gamified Quizzes", icon: Award },
  { href: "/history", label: "Historical Timeline", icon: History },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { state, setOpenMobile } = useSidebar();

  const handleLinkClick = () => {
    if (state === "collapsed") return;
    setOpenMobile(false);
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="h-16 items-center justify-center p-2 text-primary group-data-[collapsible=icon]:justify-center">
        <Logo className="size-8 shrink-0" />
        <h1 className="text-xl font-headline font-bold text-primary-foreground group-data-[collapsible=icon]:hidden">
          Samvidhan Quest
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href} onClick={handleLinkClick}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
