"use client";

import { ChevronLeft, Download, Play, Share2, Star } from "lucide-react";
import Link from "next/link";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectResultPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />

      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <Button
          variant="ghost"
          asChild
          className="text-gray-400 hover:text-white -ml-4"
        >
          <Link href="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            생성 완료: Project Alpha - Final Cut
          </h1>
          <p className="text-gray-400">생성 완료일: 2023년 10월 26일</p>
        </div>

        <div className="aspect-video bg-zinc-900 rounded-xl overflow-hidden relative group shadow-2xl shadow-purple-900/20">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Video Player Mockup */}
            <div className="h-20 w-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-white ml-1 fill-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between text-sm text-gray-300 font-mono">
              <span>0:37</span>
              <div className="h-1 bg-zinc-600 flex-1 mx-4 rounded-full">
                <div className="h-full w-1/3 bg-white rounded-full" />
              </div>
              <span>2:23</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 font-bold"
          >
            <Download className="mr-2 h-4 w-4" /> 고화질(HD) 다운로드
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            <Share2 className="mr-2 h-4 w-4" /> 공유하기
          </Button>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">
              생성된 비디오는 마음에 드시나요?
            </h3>
            <p className="text-gray-400 text-sm">
              MelodyVision 개선에 참여해주세요.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-300 mb-2">
                품질 평가
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    className="text-purple-500 hover:text-purple-400 transition-colors"
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-300">상세 피드백</p>
              <Textarea
                placeholder="서비스 개선을 위한 소중한 의견을 남겨주세요."
                className="bg-zinc-800 border-zinc-700 min-h-[100px] text-white resize-none focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                피드백 제출
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
