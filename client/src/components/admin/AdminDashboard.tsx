import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, Film, ShoppingCart, TrendingUp } from "lucide-react";

const mockStats = [
  { label: "总用户数", value: "1,234", icon: Users, color: "text-blue-500" },
  { label: "总剧集数", value: "156", icon: Film, color: "text-purple-500" },
  { label: "订单总数", value: "89", icon: ShoppingCart, color: "text-green-500" },
  { label: "本月收入", value: "¥12,450", icon: TrendingUp, color: "text-orange-500" },
];

const chartData = [
  { name: "1月", users: 400, orders: 240 },
  { name: "2月", users: 500, orders: 320 },
  { name: "3月", users: 600, orders: 380 },
  { name: "4月", users: 750, orders: 450 },
  { name: "5月", users: 890, orders: 520 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-800/50 border-slate-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Trend */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">用户增长趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders Trend */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">订单统计</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                labelStyle={{ color: "#f1f5f9" }}
              />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">最近活动</h3>
        <div className="space-y-3">
          {[
            { action: "新用户注册", user: "李明", time: "2小时前" },
            { action: "订单完成", user: "王芳", time: "4小时前" },
            { action: "评论审核", user: "张三", time: "6小时前" },
            { action: "剧集上传", user: "系统", time: "1天前" },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
              <div>
                <p className="text-white">{activity.action}</p>
                <p className="text-sm text-slate-400">{activity.user}</p>
              </div>
              <span className="text-sm text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
