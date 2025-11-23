"use client";

import {
  ChevronLeft,
  Download,
  Edit2,
  GripVertical,
  LogOut,
  Palette,
  Play,
  Plus,
  RotateCcw,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export default function SceneEditorPage() {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="truncate">user@melody.vision</span>
          </div>
          <Button
            asChild
            className="w-full justify-start bg-purple-600 hover:bg-purple-700 mb-2"
          >
            <Link href="/dashboard">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start bg-zinc-900 text-white"
          >
            <div className="bg-purple-600 p-1 rounded mr-2">
              <Edit2 className="h-3 w-3" />
            </div>
            Scene Editor
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-zinc-900"
          >
            <Palette className="mr-2 h-4 w-4" /> Style Guide
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-zinc-900"
          >
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-zinc-900"
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 flex items-center px-6 justify-between bg-zinc-950">
          <h1 className="text-xl font-bold">Scene Editor</h1>
          <div className="text-sm text-gray-400">Project Alpha</div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Scene List Column */}
          <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-900/50">
            <div className="p-4 border-b border-zinc-800">
              <p className="text-sm text-gray-400 mb-2">
                Drag and drop scenes to reorder.
              </p>
              <Button className="w-full border-dashed border-zinc-700 bg-transparent hover:bg-zinc-800 text-gray-400">
                <Plus className="mr-2 h-4 w-4" /> Add Scene
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((scene) => (
                  <div
                    key={scene}
                    className={`group relative rounded-lg border p-3 transition-all ${scene === 1 ? "bg-zinc-800 border-purple-500/50" : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"}`}
                  >
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 opacity-0 group-hover:opacity-100 cursor-grab">
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="pl-6">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-purple-400">
                          Scene {scene.toString().padStart(2, "0")}
                        </span>
                        <span className="text-xs text-gray-500">
                          00:00 - 00:08
                        </span>
                      </div>
                      <div className="aspect-video bg-black rounded mb-2 relative overflow-hidden">
                        {/* Thumbnail */}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-gray-400 hover:text-white"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-gray-400 hover:text-white"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-gray-400 hover:text-red-400 ml-auto"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Editor Column */}
          <div className="flex-1 flex flex-col p-6 overflow-y-auto">
            <div className="grid lg:grid-cols-2 gap-8 h-full">
              {/* Left: Controls */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">컷 #1 편집</h2>
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-400"
                  >
                    Active
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Label>컷 설명 (Prompt)</Label>
                  <Textarea
                    className="bg-zinc-900 border-zinc-800 min-h-[120px] resize-none"
                    defaultValue="A high-angle shot of a lone figure standing on a skyscraper rooftop, overlooking a vast, neon-lit cyberpunk city at night under a pouring rain. Glowing billboards reflect on the wet streets."
                  />
                </div>

                <div className="space-y-4">
                  <Label>빠른 설정 (Quick Options)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs text-gray-400">카메라 앵글</span>
                      <Input
                        defaultValue="High-angle"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-gray-400">조명</span>
                      <Input
                        defaultValue="Neon Glow"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-gray-400">스타일</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Cinematic
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-800"
                      >
                        Anime
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="mr-2 h-4 w-4" /> AI 이미지 재생성
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
                  >
                    저장
                  </Button>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="flex flex-col bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 h-full max-h-[600px]">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                  <span className="font-bold">Preview</span>
                </div>
                <div className="flex-1 bg-black relative flex items-center justify-center group">
                  {/* Video/Image Preview Placeholder */}
                  <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform backdrop-blur-sm">
                    <Play className="h-6 w-6 text-white ml-1" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                    <div className="h-full w-1/3 bg-purple-600" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-mono text-gray-400">
                    <span>00:08</span>
                    <span>00:22</span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-900 text-xs text-right text-gray-500">
                  All changes saved
                </div>
                <div className="p-4 border-t border-zinc-800">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-bold">
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Music Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
