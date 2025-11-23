import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Step3Page() {
  const templates = [
    { title: "사이버펑크 나이트", tags: ["#미래적", "#K-Pop"], selected: true },
    { title: "숲 속의 요정", tags: ["#신비로운", "#발라드"], selected: false },
    { title: "레트로 필름", tags: ["#감성적인", "#80년대"], selected: false },
    { title: "몽환의 춤", tags: ["#몽환적인", "#퍼포먼스"], selected: false },
    { title: "네온 퓨처", tags: ["#힙합", "#강렬한"], selected: false },
    { title: "시네마틱 메모리", tags: ["#빈티지", "#발라드"], selected: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">
          어떤 스타일의 뮤직비디오를 만들고 싶으신가요?
        </h2>
        <p className="text-gray-400">
          음악의 분위기와 가장 잘 어울리는 비주얼 템플릿을 선택하세요.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          K-Pop X
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
        >
          몽환적인 X
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template, i) => (
          <Card
            key={i}
            className={`relative aspect-[4/5] bg-zinc-800 border-0 overflow-hidden cursor-pointer group ${
              template.selected ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            {/* Placeholder for image */}
            <div
              className={`w-full h-full ${
                i === 0 ? "bg-purple-900/40" : "bg-zinc-700"
              }`}
            />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-bold text-white mb-2">{template.title}</h3>
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {template.selected && (
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
          <Link href="/create/step-2">이전</Link>
        </Button>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/create/step-4">다음</Link>
        </Button>
      </div>
    </div>
  );
}
