import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { LogOut, Plus, Edit, Trash2, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [dramas, setDramas] = useState([
    { id: 1, title: "太阳的后裔", year: 2016, episodes: 16, status: "已完结" },
    { id: 2, title: "鬼怪", year: 2016, episodes: 16, status: "已完结" },
  ]);
  const [newDrama, setNewDrama] = useState({ title: "", year: 2026, episodes: 0 });

  const handleLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setAdminPassword("");
    } else {
      alert("密码错误");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setLocation("/");
  };

  const handleAddDrama = () => {
    if (newDrama.title) {
      setDramas([
        ...dramas,
        {
          id: Math.max(...dramas.map((d) => d.id), 0) + 1,
          ...newDrama,
          status: "进行中",
        },
      ]);
      setNewDrama({ title: "", year: 2026, episodes: 0 });
      alert("剧集已添加");
    }
  };

  const handleDeleteDrama = (id: number) => {
    setDramas(dramas.filter((d) => d.id !== id));
    alert("剧集已删除");
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              管理员登录
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  管理员密码
                </label>
                <Input
                  type="password"
                  placeholder="输入管理员密码"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <p className="text-xs text-slate-400 mt-2">
                  提示：密码是 admin123
                </p>
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                登录
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-white">管理后台</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 text-slate-300 border-slate-600 hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="stats" className="text-slate-300">
              <BarChart3 className="h-4 w-4 mr-2" />
              统计
            </TabsTrigger>
            <TabsTrigger value="dramas" className="text-slate-300">
              管理剧集
            </TabsTrigger>
            <TabsTrigger value="add" className="text-slate-300">
              <Plus className="h-4 w-4 mr-2" />
              添加剧集
            </TabsTrigger>
          </TabsList>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-slate-700 p-6">
                <div className="text-slate-400 text-sm mb-2">总剧集数</div>
                <div className="text-3xl font-bold text-white">{dramas.length}</div>
              </Card>
              <Card className="bg-slate-800 border-slate-700 p-6">
                <div className="text-slate-400 text-sm mb-2">已完结</div>
                <div className="text-3xl font-bold text-green-400">
                  {dramas.filter((d) => d.status === "已完结").length}
                </div>
              </Card>
              <Card className="bg-slate-800 border-slate-700 p-6">
                <div className="text-slate-400 text-sm mb-2">进行中</div>
                <div className="text-3xl font-bold text-blue-400">
                  {dramas.filter((d) => d.status === "进行中").length}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Manage Dramas Tab */}
          <TabsContent value="dramas" className="mt-6">
            <div className="space-y-4">
              {dramas.map((drama) => (
                <Card
                  key={drama.id}
                  className="bg-slate-800 border-slate-700 p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {drama.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {drama.year} · {drama.episodes}集 · {drama.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 text-slate-300 border-slate-600 hover:bg-slate-700"
                    >
                      <Edit className="h-4 w-4" />
                      编辑
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleDeleteDrama(drama.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      删除
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Add Drama Tab */}
          <TabsContent value="add" className="mt-6">
            <Card className="bg-slate-800 border-slate-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">添加新剧集</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    剧集名称
                  </label>
                  <Input
                    placeholder="输入剧集名称"
                    value={newDrama.title}
                    onChange={(e) =>
                      setNewDrama({ ...newDrama, title: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      年份
                    </label>
                    <Input
                      type="number"
                      value={newDrama.year}
                      onChange={(e) =>
                        setNewDrama({
                          ...newDrama,
                          year: parseInt(e.target.value),
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      集数
                    </label>
                    <Input
                      type="number"
                      value={newDrama.episodes}
                      onChange={(e) =>
                        setNewDrama({
                          ...newDrama,
                          episodes: parseInt(e.target.value),
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddDrama}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  添加剧集
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
