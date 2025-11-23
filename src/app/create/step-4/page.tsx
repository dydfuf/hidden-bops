"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Step4Page() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsGenerating(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Finalize Your Music Video
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>AI Video Model</Label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-800 rounded-lg">
                  <Button
                    variant="ghost"
                    className="bg-zinc-700 text-white hover:bg-zinc-600 hover:text-white"
                  >
                    Standard
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white hover:bg-zinc-700"
                  >
                    High Quality
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Resolution</Label>
                  <Select defaultValue="1080p">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="Resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                      <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Frame Rate (FPS)</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                      <SelectValue placeholder="FPS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 fps</SelectItem>
                      <SelectItem value="60">60 fps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <div className="flex items-center gap-2 p-3 bg-zinc-800 rounded-md border border-zinc-700 text-sm text-gray-300">
                  <div className="h-4 w-6 border border-gray-400 rounded-sm" />
                  16:9 (Landscape)
                  <span className="ml-auto text-xs text-gray-500">
                    Based on project settings
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-800 rounded-xl p-6 space-y-4">
            <h3 className="font-bold">Preview & Cost</h3>
            <div className="aspect-video bg-zinc-900 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-blue-900/20" />
              {/* Preview Image Placeholder */}
            </div>

            <div className="flex justify-between items-center py-2 border-b border-zinc-700">
              <span className="text-gray-400">Estimated Cost</span>
              <span className="text-xl font-bold">25 Credits</span>
            </div>

            {!isGenerating ? (
              <Button
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700 font-bold"
                onClick={handleGenerate}
              >
                Start Generation
              </Button>
            ) : (
              <Button
                disabled
                size="lg"
                className="w-full bg-zinc-700 text-gray-400"
              >
                Generating...
              </Button>
            )}
            <p className="text-xs text-center text-gray-500">
              Your credits will be deducted upon starting.
            </p>
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-xl font-bold">
            AI is generating your music video...
          </h3>
          <p className="text-gray-400">
            Feel free to keep this tab open. We'll notify you when it's
            complete.
          </p>

          <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
            {/* Circular Progress Mockup */}
            <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
            <div className="absolute inset-0 rounded-full border-4 border-purple-600 border-t-transparent animate-spin" />
            <span className="text-2xl font-bold">{progress}%</span>
          </div>

          <div className="space-y-1">
            <p className="font-medium">
              Current Task: Processing Scene 12 / 16
            </p>
            <p className="text-sm text-gray-500">
              Time Remaining: Approx. 2 min 45 sec
            </p>
          </div>

          <Button
            variant="outline"
            className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={() => setIsGenerating(false)}
          >
            Cancel Generation
          </Button>
        </div>
      )}

      {progress === 100 && !isGenerating && (
        <div className="flex justify-end">
          <Button
            asChild
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Link href="/projects/123">View Result</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
