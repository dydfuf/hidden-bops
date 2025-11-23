import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Zap, Sparkles, Music, Play, Film, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center">
            <Music className="h-5 w-5 text-white" />
          </div>
          <span>MelodyVision</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition-colors">기능</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">가격</Link>
          <Link href="#gallery" className="hover:text-white transition-colors">갤러리</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white">
            로그인
          </Link>
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/dashboard">회원가입</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center flex flex-col items-center justify-center space-y-8 bg-gradient-to-b from-black to-purple-950/20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl max-w-4xl leading-tight">
            당신의 음악에 생명을 불어넣는 <span className="text-purple-500">AI 뮤직비디오</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            단 몇 분 만에, 음악만으로 전문가 수준의 영상을 만들어보세요.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg h-12 px-8">
            <Link href="/dashboard">무료로 시작하기</Link>
          </Button>
        </section>

        {/* Value Props */}
        <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">MelodyVision의 핵심 가치</h2>
            <p className="text-gray-400">음악을 시각적 예술로 바꾸는 가장 빠르고 효율적인 방법.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <Rocket className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>압도적인 제작 속도</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">아이디어 구상부터 완성까지 단 몇 시간 안에 종료하세요.</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <Zap className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>합리적인 비용</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">기존 제작비의 1/10로 전문가급 퀄리티를 경험하세요.</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800 text-white">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle>한계 없는 창의성</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">다양한 비주얼 스타일을 AI로 자유롭게 구현해보세요.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-zinc-950">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-16">작동 방식: 단 3단계면 충분합니다</h2>
            <div className="space-y-12">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xl">1</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">음원 업로드</h3>
                  <p className="text-gray-400">보유하고 계신 음원 파일(MP3, WAV)을 업로드하세요.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xl">2</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">비주얼 스타일 선택</h3>
                  <p className="text-gray-400">원하는 분위기나 템플릿, 캐릭터를 선택하세요.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xl">3</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">AI 영상 생성 및 다운로드</h3>
                  <p className="text-gray-400">AI가 음악에 맞춰 영상을 생성하면 확인 후 다운로드하세요.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4">갤러리</h2>
          <p className="text-center text-gray-400 mb-12">MelodyVision으로 제작된 다양한 장르의 뮤직비디오를 감상해보세요.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white fill-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <p className="font-bold">Style Example {i}</p>
                  <p className="text-xs text-gray-300">Genre • 3:42</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto bg-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">지금 바로 당신의 첫 AI 뮤직비디오를 만들어보세요.</h2>
            <Button variant="secondary" size="lg" className="h-12 px-8 text-purple-600 font-bold">
              <Link href="/dashboard">회원가입하고 무료로 시작하기</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 text-center text-sm text-gray-500 border-t border-white/10">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-white">이용약관</a>
          <a href="#" className="hover:text-white">개인정보처리방침</a>
          <a href="#" className="hover:text-white">문의하기</a>
        </div>
        <p>© 2024 MelodyVision. All rights reserved.</p>
      </footer>
    </div>
  );
}
