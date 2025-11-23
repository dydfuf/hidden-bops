"use client";

import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard-navbar";

const steps = [
  { id: 1, name: "음악 업로드", path: "/create/step-1" },
  { id: 2, name: "캐릭터 선택", path: "/create/step-2" },
  { id: 3, name: "스타일 선택", path: "/create/step-3" },
  { id: 4, name: "영상 생성", path: "/create/step-4" },
];

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStep =
    steps.find((step) => pathname.includes(step.path))?.id || 1;

  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">
          새로운 뮤직비디오 프로젝트 생성
        </h1>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-zinc-800 -z-10" />
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center bg-black px-2"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-colors ${
                      isCompleted || isCurrent
                        ? "bg-purple-600 text-white"
                        : "bg-zinc-800 text-gray-400"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span
                    className={`text-sm ${
                      isCurrent ? "text-white font-bold" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 min-h-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
