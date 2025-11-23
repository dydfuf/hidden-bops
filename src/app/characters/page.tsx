"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { DashboardNavbar } from "@/components/dashboard-navbar";

export default function CharactersPage() {
  const characters = [
    { name: "루나 (Luna)", status: "승인됨", image: "/placeholder-1.jpg", color: "bg-green-500" },
    { name: "DJ 렉스", status: "대기 중", image: "/placeholder-2.jpg", color: "bg-yellow-500" },
    { name: "스타라이트", status: "승인됨", image: "/placeholder-3.jpg", color: "bg-green-500" },
    { name: "코스모", status: "거부됨", image: "/placeholder-4.jpg", color: "bg-red-500" },
    { name: "에코 (Echo)", status: "승인됨", image: "/placeholder-5.jpg", color: "bg-green-500" },
    { name: "네뷸라", status: "대기 중", image: "/placeholder-6.jpg", color: "bg-yellow-500" },
    { name: "레이저", status: "승인됨", image: "/placeholder-7.jpg", color: "bg-green-500" },
    { name: "엘라라", status: "승인됨", image: "/placeholder-8.jpg", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <main className="max-w-7xl mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">내 캐릭터</h1>
            <p className="text-gray-400">AI 캐릭터를 관리, 생성하고 검색하세요.</p>
          </div>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/create/step-2">
              <Plus className="mr-2 h-4 w-4" /> 새 캐릭터 생성
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="캐릭터 이름으로 검색..." 
              className="pl-10 bg-zinc-900 border-zinc-800 text-white focus:ring-purple-500"
            />
          </div>
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="all" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-gray-400">전체</TabsTrigger>
              <TabsTrigger value="approved" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-gray-400">승인됨</TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-gray-400">대기 중</TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800 data-[state=active]:text-white text-gray-400">거부됨</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800 overflow-hidden group cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">
              <div className="aspect-square bg-zinc-800 relative">
                {/* Image Placeholder */}
                <div className="absolute top-2 right-2 z-10">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      char.status === "승인됨" ? "bg-green-900 text-green-300" : 
                      char.status === "대기 중" ? "bg-yellow-900 text-yellow-300" : 
                      "bg-red-900 text-red-300"
                    } border-0`}
                  >
                    {char.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{char.name}</h3>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

