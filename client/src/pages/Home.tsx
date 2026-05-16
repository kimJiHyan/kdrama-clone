import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Search, Heart, Star, User } from "lucide-react";

// Mock data for Korean dramas
const mockDramas = [
  {
    id: 1,
    title: "太阳的后裔",
    englishTitle: "Descendants of the Sun",
    category: "爱情",
    rating: 8.9,
    year: 2016,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    description: "一部关于医生和士兵的爱情故事",
    episodes: 16,
  },
  {
    id: 2,
    title: "鬼怪",
    englishTitle: "Goblin",
    category: "奇幻",
    rating: 8.8,
    year: 2016,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    description: "一个不朽的鬼怪与一个少女的故事",
    episodes: 16,
  },
  {
    id: 3,
    title: "来自星星的你",
    englishTitle: "My Love from the Star",
    category: "爱情",
    rating: 8.7,
    year: 2013,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    description: "一个外星人与女演员的爱情故事",
    episodes: 21,
  },
  {
    id: 4,
    title: "信号",
    englishTitle: "Signal",
    category: "悬疑",
    rating: 9.0,
    year: 2016,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    description: "跨越时空的警察悬疑剧",
    episodes: 16,
  },
  {
    id: 5,
    title: "梨泰院阶级",
    englishTitle: "Itaewon Class",
    category: "复仇",
    rating: 8.6,
    year: 2020,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    description: "一个出狱者的复仇之旅",
    episodes: 10,
  },
  {
    id: 6,
    title: "爱的迫降",
    englishTitle: "Crash Landing on You",
    category: "爱情",
    rating: 8.8,
    year: 2019,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-featured-poster-MP6JgbM23Usvc6YHP87hZc.webp",
    description: "一个富家女意外降落朝鲜的故事",
    episodes: 16,
  },
];

const categories = [
  "全部",
  "爱情",
  "悬疑",
  "奇幻",
  "复仇",
  "校园",
  "家庭",
  "历史",
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const filteredDramas = mockDramas.filter((drama) => {
    const matchesCategory =
      selectedCategory === "全部" || drama.category === selectedCategory;
    const matchesSearch =
      drama.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drama.englishTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
            <h1 className="text-2xl font-bold text-white">KDRAMA</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="搜索韩剧..."
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {user ? (
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300 gap-2"
                onClick={() => setLocation("/profile")}
              >
                <User className="h-4 w-4" />
                {user.username}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border-slate-700 text-slate-300"
                onClick={() => setLocation("/login")}
              >
                登录
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663665037121/jtPpyBaLJQSmp3LR4WETUG/kdrama-hero-banner-D3sg754qYUzVGZFLANPEPD.webp"
          alt="Featured"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <h2 className="mb-4 text-5xl font-bold text-white">欢迎来到 KDRAMA</h2>
          <p className="mb-8 max-w-2xl text-lg text-slate-300">
            发现最新最热的韩国电视剧，享受高清流畅的观看体验
          </p>
          <div className="flex gap-4">
            <Button
              className="gap-2 bg-purple-600 hover:bg-purple-700"
              onClick={() => setLocation("/play/1")}
            >
              <Play className="h-4 w-4" />
              立即观看
            </Button>
            <Button variant="outline" className="border-slate-600 text-white">
              了解更多
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Drama Grid */}
      <section className="container py-8">
        <h3 className="mb-6 text-2xl font-bold text-white">
          {selectedCategory === "全部" ? "热门韩剧" : selectedCategory}
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDramas.map((drama) => (
            <div
              key={drama.id}
              className="group relative overflow-hidden rounded-lg bg-slate-800 transition-all duration-300 hover:scale-105"
            >
              {/* Poster Image */}
              <div className="relative h-80 overflow-hidden bg-slate-700">
                <img
                  src={drama.image}
                  alt={drama.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Button
                    size="icon"
                    className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => setLocation(`/play/${drama.id}`)}
                  >
                    <Play className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-12 w-12 rounded-full border-white bg-transparent hover:bg-white/20"
                    onClick={() => toggleFavorite(drama.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(drama.id)
                          ? "fill-red-500 text-red-500"
                          : "text-white"
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h4
                  className="mb-1 line-clamp-2 text-sm font-semibold text-white cursor-pointer hover:text-purple-400"
                  onClick={() => setLocation(`/detail/${drama.id}`)}
                >
                  {drama.title}
                </h4>
                <p className="mb-3 line-clamp-1 text-xs text-slate-400">
                  {drama.englishTitle}
                </p>

                <div className="mb-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold text-yellow-500">
                      {drama.rating}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {drama.episodes}集
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {drama.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {drama.year}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold text-white">关于我们</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    关于 KDRAMA
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    联系我们
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">分类</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    热门剧集
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    最新更新
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">法律</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    服务条款
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">社交媒体</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 KDRAMA. 版权所有。</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
