import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Step2Page() {
  return (
    <div className="space-y-8">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold">사용할 캐릭터를 선택하세요</h2>
        <p className="text-gray-400">
          뮤직비디오에 등장할 주인공을 골라주세요.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Create New Card */}
        <Card className="aspect-[3/4] flex flex-col items-center justify-center gap-4 border-dashed border-zinc-700 bg-transparent hover:bg-zinc-900 cursor-pointer transition-colors">
          <div className="p-3 rounded-full bg-zinc-800">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <span className="text-sm font-medium text-gray-400">
            새 캐릭터 만들기
          </span>
        </Card>

        {/* Character Cards */}
        {[
          { name: "Aria", selected: false },
          { name: "Zen", selected: true },
          { name: "Luna", selected: false },
          { name: "Kai", selected: false },
        ].map((char, i) => (
          <Card
            key={i}
            className={`relative aspect-[3/4] bg-zinc-800 border-0 overflow-hidden cursor-pointer group ${
              char.selected ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            {/* Placeholder for image */}
            <div className="w-full h-full bg-zinc-700" />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="font-bold text-white">{char.name}</span>
            </div>

            {char.selected && (
              <div className="absolute top-2 right-2 bg-purple-600 rounded-full p-1">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          asChild
          className="border-zinc-700 text-gray-300 hover:text-white hover:bg-zinc-800"
        >
          <Link href="/create/step-1">이전</Link>
        </Button>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/create/step-3">다음</Link>
        </Button>
      </div>
    </div>
  );
}
