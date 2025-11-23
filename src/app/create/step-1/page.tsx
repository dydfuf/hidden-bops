import { Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Step1Page() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
      <div className="w-full max-w-xl text-center space-y-8">
        <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-12 bg-zinc-900/50 hover:bg-zinc-900 hover:border-purple-500 transition-colors cursor-pointer group">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 group-hover:text-purple-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                파일을 이곳으로 드래그하거나 클릭하여 업로드하세요
              </h3>
              <p className="text-sm text-gray-400">
                지원 형식: MP3, WAV, AAC, FLAC
                <br />
                최대 파일 크기: 50MB
              </p>
            </div>
            <Button variant="secondary" className="mt-4">
              컴퓨터에서 선택
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/create/step-2">다음</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
