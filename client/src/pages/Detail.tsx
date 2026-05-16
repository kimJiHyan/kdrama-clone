import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Heart,
  Share2,
  ArrowLeft,
  Star,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

// Mock drama data
const dramaDetails = {
  1: {
    id: 1,
    title: "太阳的后裔",
    englishTitle: "Descendants of the Sun",
    year: 2016,
    rating: 8.9,
    votes: 125000,
    category: "爱情",
    duration: 60,
    episodeCount: 16,
    status: "已完结",
    director: "李应福",
    cast: ["宋仲基", "宋慧乔", "金智媛", "李晟敏"],
    description:
      "《太阳的后裔》是韩国KBS电视台推出的水木连续剧，由李应福导演执导，宋仲基、宋慧乔、金智媛、李晟敏主演。该剧讲述了军医姜暮烟和特种部队队长柳时镇在危险的战地相遇，在共同经历中产生爱情的故事。",
    longDescription:
      "这部剧以其精良的制作、紧凑的剧情和演员的精彩表演赢得了广泛的关注。宋仲基和宋慧乔的荧屏搭档得到了观众的一致好评，剧中的爱情线和冒险元素完美结合，创造了一个令人难忘的故事。该剧在韩国、中国和其他亚洲国家都取得了巨大的成功。",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    episodeList: [
      { ep: 1, title: "第一集", duration: 60 },
      { ep: 2, title: "第二集", duration: 60 },
      { ep: 3, title: "第三集", duration: 60 },
      { ep: 4, title: "第四集", duration: 60 },
    ],
  },
};

export default function Detail() {
  const [, setLocation] = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("episodes");

  // Get drama ID from URL or use default
  const drama = dramaDetails[1];

  if (!drama) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">剧集未找到</h1>
          <Button onClick={() => setLocation("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Button>
        </div>
      </div>
    );
  }

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
            {drama.title}
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <img
          src={drama.image}
          alt={drama.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="lg"
            className="gap-2 h-16 px-8 bg-purple-600 hover:bg-purple-700 rounded-full text-lg"
            onClick={() => setLocation(`/play/${drama.id}`)}
          >
            <Play className="h-6 w-6 fill-white" />
            立即观看
          </Button>
        </div>
      </section>

      {/* Info Section */}
      <section className="container py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h1 className="mb-2 text-4xl font-bold text-white">
                {drama.title}
              </h1>
              <p className="text-lg text-slate-400">{drama.englishTitle}</p>
            </div>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="text-lg font-semibold text-yellow-500">
                  {drama.rating}
                </span>
                <span className="text-sm text-slate-400">
                  ({drama.votes.toLocaleString()}人评分)
                </span>
              </div>
              <Badge variant="outline">{drama.status}</Badge>
              <Badge variant="secondary">{drama.category}</Badge>
              <Badge variant="outline">{drama.year}年</Badge>
            </div>

            {/* Quick Info */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">单集时长</p>
                  <p className="font-semibold text-white">{drama.duration}分钟</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">总集数</p>
                  <p className="font-semibold text-white">{drama.episodeCount}集</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">导演</p>
                  <p className="font-semibold text-white">{drama.director}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">主演</p>
                  <p className="font-semibold text-white">
                    {drama.cast.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex gap-3">
              <Button
                size="lg"
                className="gap-2 bg-purple-600 hover:bg-purple-700"
                onClick={() => setLocation(`/play/${drama.id}`)}
              >
                <Play className="h-5 w-5 fill-white" />
                播放
              </Button>
              <Button
                size="lg"
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
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-slate-600"
              >
                <Share2 className="h-5 w-5" />
                分享
              </Button>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold text-white">剧情简介</h3>
              <p className="mb-4 leading-relaxed text-slate-300">
                {drama.description}
              </p>
              <p className="leading-relaxed text-slate-400">
                {drama.longDescription}
              </p>
            </div>

            {/* Cast */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-white">主要演员</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {drama.cast.map((actor, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg bg-slate-800/50 p-3"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <div>
                      <p className="font-semibold text-white">{actor}</p>
                      <p className="text-sm text-slate-400">主演</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
              <div className="p-6">
                <img
                  src={drama.image}
                  alt={drama.title}
                  className="mb-4 w-full rounded-lg"
                />
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400">类型</p>
                    <p className="font-semibold text-white">{drama.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">首播年份</p>
                    <p className="font-semibold text-white">{drama.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">状态</p>
                    <p className="font-semibold text-white">{drama.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">总集数</p>
                    <p className="font-semibold text-white">{drama.episodeCount}集</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="episodes">集数</TabsTrigger>
            <TabsTrigger value="reviews">评论</TabsTrigger>
          </TabsList>

          <TabsContent value="episodes" className="mt-6">
            <div className="grid gap-3">
              {drama.episodeList.map((ep) => (
                <Card
                  key={ep.ep}
                  className="cursor-pointer bg-slate-800/50 border-slate-700 transition-all hover:bg-slate-700/50"
                  onClick={() => setLocation(`/play/${drama.id}?ep=${ep.ep}`)}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700">
                      <Play className="h-6 w-6 fill-purple-500 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">
                        第{ep.ep}集 - {ep.title}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {ep.duration}分钟
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="gap-2 bg-purple-600 hover:bg-purple-700"
                    >
                      <Play className="h-4 w-4 fill-white" />
                      播放
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              <div className="rounded-lg bg-slate-800/50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                  <div>
                    <p className="font-semibold text-white">用户昵称</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-500 text-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300">
                  这是一部非常精彩的韩剧，演员的表演非常出色，剧情紧凑引人入胜。强烈推荐！
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
