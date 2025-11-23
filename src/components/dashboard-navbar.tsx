"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, User, Music } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardNavbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "프로젝트", href: "/dashboard" },
    { name: "캐릭터", href: "/characters" },
    { name: "플랜", href: "/plans" },
  ];

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b border-white/10 bg-zinc-950 text-white">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center">
            <Music className="h-5 w-5 text-white" />
          </div>
          <span>MelodyVision</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-white ${
                pathname === item.href ? "text-white" : "text-gray-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">David</p>
                <p className="text-xs leading-none text-muted-foreground">
                  david@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>프로필 설정</DropdownMenuItem>
            <DropdownMenuItem>결제 관리</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>로그아웃</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

