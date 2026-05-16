import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";

const mockCategories = [
  { id: 1, name: "爱情", slug: "romance", count: 45 },
  { id: 2, name: "奇幻", slug: "fantasy", count: 32 },
  { id: 3, name: "动作", slug: "action", count: 28 },
  { id: 4, name: "喜剧", slug: "comedy", count: 51 },
];

export default function CategoryManagement() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", slug: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("提交分类:", formData);
    setIsOpen(false);
    setFormData({ name: "", slug: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">分类列表</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4" />
              添加分类
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">添加新分类</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400">分类名称</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-400">Slug</label>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-1"
                  required
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockCategories.map((category) => (
          <Card key={category.id} className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-2">Slug: {category.slug}</p>
            <p className="text-2xl font-bold text-purple-400">{category.count} 部</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
