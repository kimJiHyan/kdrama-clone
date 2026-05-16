import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";

export default function Play() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const episodes = [
    { ep: 1, title: "第一集", duration: 60 },
    { ep: 2, title: "第二集", duration: 60 },
    { ep: 3, title: "第三集", duration: 60 },
    { ep: 4, title: "第四集", duration: 60 },
    { ep: 5, title: "第五集", duration: 60 },
  ];

  const recommendations = [
    {
      id: 1,
      title: "鬼怪",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    },
    {
      id: 2,
      title: "来自星星的你",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    },
    {
      id: 3,
      title: "爱的迫降",
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="flex-1 text-center text-lg font-semibold text-white">
            太阳的后裔 - 第{currentEpisode}集
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Video Player */}
      <section className="container py-6">
        <div className="relative mb-6 overflow-hidden rounded-lg bg-black">
          <div className="relative pt-[56.25%]">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
              {/* Mock Video Player */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-6xl text-slate-600">▶</div>
                  <p className="text-slate-400">
                    视频播放器 - 第{currentEpisode}集
                  </p>
                </div>
              </div>

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* Progress Bar */}
                  <div className="mb-3 h-1 bg-slate-700">
                    <div className="h-full w-1/3 bg-purple-600" />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 fill-white" />
                        )}
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </Button>

                      <span className="text-xs text-white">20:45 / 60:00</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-white">
              太阳的后裔 - 第{currentEpisode}集
            </h2>
            <p className="text-slate-400">
              军医姜暮烟和特种部队队长柳时镇在危险的战地相遇...
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2 border-slate-600"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {isFavorite ? "已收藏" : "收藏"}
            </Button>
            <Button variant="outline" className="gap-2 border-slate-600">
              <Share2 className="h-5 w-5" />
              分享
            </Button>
          </div>
        </div>

        {/* Episodes List */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-white">选择集数</h3>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-5">
            {episodes.map((ep) => (
              <Button
                key={ep.ep}
                variant={currentEpisode === ep.ep ? "default" : "outline"}
                className={`gap-2 ${
                  currentEpisode === ep.ep
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }`}
                onClick={() => setCurrentEpisode(ep.ep)}
              >
                <Play className="h-3 w-3" />
                第{ep.ep}集
              </Button>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-white">
            你可能也喜欢
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {recommendations.map((rec) => (
              <Card
                key={rec.id}
                className="group cursor-pointer overflow-hidden border-slate-700 bg-slate-800/50 transition-all hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon"
                      className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Play className="h-5 w-5 fill-white" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white">{rec.title}</h4>
                  <p className="text-sm text-slate-400">韩剧</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
