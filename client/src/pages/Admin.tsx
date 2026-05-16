import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Film, Tag, Users, ShoppingCart } from "lucide-react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import DramaManagement from "@/components/admin/DramaManagement";
import CategoryManagement from "@/components/admin/CategoryManagement";
import SubscriptionManagement from "@/components/admin/SubscriptionManagement";

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-purple-500" />
            <h1 className="text-2xl font-bold text-white">后台管理系统</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              欢迎，<span className="text-white font-semibold">{user.name || "管理员"}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                setLocation("/");
              }}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              退出登录
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">仪表板</span>
            </TabsTrigger>
            <TabsTrigger value="dramas" className="gap-2">
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">剧集管理</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden sm:inline">分类管理</span>
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">订阅管理</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="dramas">
            <DramaManagement />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement />
          </TabsContent>

          <TabsContent value="subscriptions">
            <SubscriptionManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
