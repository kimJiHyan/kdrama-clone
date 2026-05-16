import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";

const mockPlans = [
  {
    id: 1,
    name: "免费版",
    price: "¥0",
    duration: "永久",
    features: ["基础功能", "标清播放"],
    users: 1234,
  },
  {
    id: 2,
    name: "标准版",
    price: "¥9.99",
    duration: "每月",
    features: ["高清播放", "离线下载", "无广告"],
    users: 456,
  },
  {
    id: 3,
    name: "高级版",
    price: "¥19.99",
    duration: "每月",
    features: ["4K播放", "多设备同时观看", "优先客服"],
    users: 234,
  },
];

export default function SubscriptionManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">订阅套餐管理</h2>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4" />
          新增套餐
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <Card key={plan.id} className="bg-slate-800/50 border-slate-700 p-6 relative">
            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Plan Info */}
            <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
            <div className="mb-4">
              <p className="text-3xl font-bold text-purple-400">
                {plan.price}
                <span className="text-sm text-slate-400 ml-2">/{plan.duration}</span>
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-3">功能特性</p>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Users */}
            <div className="pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400">订阅用户</p>
              <p className="text-2xl font-bold text-white">{plan.users}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Orders Summary */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">订单统计</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-slate-400">本月订单</p>
            <p className="text-3xl font-bold text-white mt-2">234</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">本月收入</p>
            <p className="text-3xl font-bold text-green-400 mt-2">¥12,450</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">待处理订单</p>
            <p className="text-3xl font-bold text-yellow-400 mt-2">12</p>
          </div>
        </div>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">最近订单</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">订单号</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">用户</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">套餐</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">金额</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">状态</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-400">日期</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "ORD001", user: "李明", plan: "高级版", amount: "¥19.99", status: "已完成", date: "2024-05-16" },
                { id: "ORD002", user: "王芳", plan: "标准版", amount: "¥9.99", status: "已完成", date: "2024-05-15" },
                { id: "ORD003", user: "张三", plan: "高级版", amount: "¥19.99", status: "待支付", date: "2024-05-15" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
                  <td className="px-6 py-4 text-white font-mono text-sm">{order.id}</td>
                  <td className="px-6 py-4 text-slate-400">{order.user}</td>
                  <td className="px-6 py-4 text-slate-400">{order.plan}</td>
                  <td className="px-6 py-4 text-white font-semibold">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "已完成"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
