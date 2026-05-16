import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockDramas = [
  {
    id: 1,
    title: "太阳的后裔",
    category: "爱情",
    episodes: 16,
    status: "已完结",
    rating: 8.9,
  },
  {
    id: 2,
    title: "鬼怪",
    category: "奇幻",
    episodes: 16,
    status: "已完结",
    rating: 8.8,
  },
  {
    id: 3,
    title: "来自星星的你",
    category: "爱情",
    episodes: 21,
    status: "已完结",
    rating: 8.7,
  },
];

export default function DramaManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    englishTitle: "",
    category: "",
    episodes: "",
    status: "completed",
    director: "",
    rating: "",
  });

  const filteredDramas = mockDramas.filter((drama) =>
    drama.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("提交剧集:", formData);
    setIsOpen(false);
    setFormData({
      title: "",
      englishTitle: "",
      category: "",
      episodes: "",
      status: "completed",
      director: "",
      rating: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="搜索剧集..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
              添加剧集
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">添加新剧集</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">剧集标题</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400">英文标题</label>
                  <Input
                    value={formData.englishTitle}
                    onChange={(e) => setFormData({ ...formData, englishTitle: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400">分类</label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val })}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="romance">爱情</SelectItem>
                      <SelectItem value="fantasy">奇幻</SelectItem>
                      <SelectItem value="action">动作</SelectItem>
                      <SelectItem value="comedy">喜剧</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-slate-400">集数</label>
                  <Input
                    type="number"
                    value={formData.episodes}
                    onChange={(e) => setFormData({ ...formData, episodes: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">导演</label>
                <Input
                  value={formData.director}
                  onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  取消
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  添加
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">标题</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">分类</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">集数</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">状态</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">评分</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-400">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDramas.map((drama) => (
                <tr key={drama.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 text-white">{drama.title}</td>
                  <td className="px-6 py-4 text-slate-400">{drama.category}</td>
                  <td className="px-6 py-4 text-slate-400">{drama.episodes}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                      {drama.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-yellow-500 font-semibold">★ {drama.rating}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
