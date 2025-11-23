import {
  FileText,
  HelpCircle,
  MoreVertical,
  Plus,
  User as UserIcon,
  Video,
} from "lucide-react";
import Link from "next/link";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <main className="p-8 max-w-7xl mx-auto space-y-8">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">
            David님, MelodyVision에 오신 것을 환영합니다!
          </h1>
          <p className="text-gray-400">새로운 뮤직비디오를 만들어볼까요?</p>
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Link href="/create/step-1">
              <Plus className="mr-2 h-4 w-4" /> 새 프로젝트 시작하기
            </Link>
          </Button>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Projects & Characters */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">최근 프로젝트</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Cosmic Dream",
                    date: "수정: 2일 전",
                    color: "bg-gradient-to-r from-blue-500 to-purple-500",
                  },
                  {
                    title: "Neon City Groove",
                    date: "수정: 5일 전",
                    color: "bg-gradient-to-r from-pink-500 to-orange-500",
                  },
                  {
                    title: "Forest Lullaby",
                    date: "수정: 1주 전",
                    color: "bg-gradient-to-r from-green-500 to-emerald-500",
                  },
                ].map((project, i) => (
                  <Card
                    key={i}
                    className="bg-zinc-900 border-zinc-800 text-white overflow-hidden"
                  >
                    <div className={`h-32 ${project.color}`} />
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">
                        {project.title}
                      </CardTitle>
                      <p className="text-xs text-gray-400">{project.date}</p>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white w-full mr-2"
                      >
                        편집
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-zinc-800"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">내 캐릭터</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Aria",
                    role: "Cyberpunk Vocalist",
                    img: "/placeholder-1.jpg",
                  },
                  {
                    name: "Kael",
                    role: "Star Knight",
                    img: "/placeholder-2.jpg",
                  },
                ].map((char, i) => (
                  <Card
                    key={i}
                    className="bg-zinc-900 border-zinc-800 text-white flex items-center p-4"
                  >
                    <div className="h-16 w-16 rounded-full bg-zinc-800 mr-4" />
                    <div className="flex-1">
                      <h3 className="font-bold">{char.name}</h3>
                      <p className="text-xs text-gray-400">{char.role}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      관리
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar Stats & Links */}
          <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-lg">사용량 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">이번 달 사용량</span>
                  <span>15 / 50분</span>
                </div>
                <Progress value={30} className="h-2 bg-zinc-800" />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-gray-400">현재 플랜</span>
                  <span className="font-bold">Pro Plan</span>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  플랜 업그레이드
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <CardTitle className="text-lg">빠른 링크</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-zinc-800"
                >
                  <Video className="mr-2 h-4 w-4" /> 템플릿 둘러보기
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-zinc-800"
                >
                  <FileText className="mr-2 h-4 w-4" /> 튜토리얼 보기
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-zinc-800"
                >
                  <HelpCircle className="mr-2 h-4 w-4" /> 도움말
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
