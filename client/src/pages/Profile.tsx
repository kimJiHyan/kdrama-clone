import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  LogOut,
  Heart,
  Clock,
  Star,
  Settings,
  User,
  Mail,
  Edit2,
} from "lucide-react";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("favorites");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setLocation("/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLocation("/");
  };

  const favorites = [
    {
      id: 1,
      title: "太阳的后裔",
      rating: 8.9,
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    },
    {
      id: 2,
      title: "鬼怪",
      rating: 8.8,
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    },
    {
      id: 3,
      title: "爱的迫降",
      rating: 8.8,
      image:
        "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    },
  ];

  const watchHistory = [
    {
      id: 1,
      title: "太阳的后裔",
      episode: 5,
      progress: 45,
      lastWatch: "2小时前",
    },
    {
      id: 2,
      title: "鬼怪",
      episode: 8,
      progress: 100,
      lastWatch: "1天前",
    },
    {
      id: 3,
      title: "来自星星的你",
      episode: 3,
      progress: 20,
      lastWatch: "3天前",
    },
  ];

  if (!user) {
    return null;
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
            个人中心
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-slate-300 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Profile Section */}
      <section className="container py-8">
        <Card className="border-slate-700 bg-slate-800/50">
          <div className="p-8">
            <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="h-24 w-24 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {user.username}
                </h2>
                <div className="mb-4 space-y-2 text-slate-400">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Star className="h-4 w-4" />
                    <span>会员等级: 普通会员</span>
                  </div>
                </div>

                <div className="flex gap-2 justify-center md:justify-start">
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <Edit2 className="h-4 w-4" />
                    编辑资料
                  </Button>
                  <Button variant="outline" className="gap-2 border-slate-600">
                    <Settings className="h-4 w-4" />
                    设置
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-slate-700/50 p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">12</p>
                <p className="text-sm text-slate-400">收藏剧集</p>
              </div>
              <div className="rounded-lg bg-slate-700/50 p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">48</p>
                <p className="text-sm text-slate-400">观看时长(小时)</p>
              </div>
              <div className="rounded-lg bg-slate-700/50 p-4 text-center">
                <p className="text-2xl font-bold text-purple-500">8</p>
                <p className="text-sm text-slate-400">发布评论</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Tabs Section */}
      <section className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-slate-800/50 border-slate-700">
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              我的收藏
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              观看历史
            </TabsTrigger>
            <TabsTrigger value="ratings" className="gap-2">
              <Star className="h-4 w-4" />
              我的评分
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {favorites.map((drama) => (
                <Card
                  key={drama.id}
                  className="group cursor-pointer overflow-hidden border-slate-700 bg-slate-800/50 transition-all hover:scale-105"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={drama.image}
                      alt={drama.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                        继续观看
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 font-semibold text-white">
                      {drama.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm text-yellow-500">
                        {drama.rating}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <div className="space-y-3">
              {watchHistory.map((item) => (
                <Card
                  key={item.id}
                  className="border-slate-700 bg-slate-800/50 p-4"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-400">
                        第{item.episode}集 · {item.lastWatch}
                      </p>
                    </div>
                    <Badge variant="secondary">{item.progress}%</Badge>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Ratings Tab */}
          <TabsContent value="ratings" className="mt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-slate-700 bg-slate-800/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="font-semibold text-white">
                      太阳的后裔 - 第{i}集
                    </h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${
                            j < 4
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    这一集的剧情非常精彩，演员的表演也很出色。
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
