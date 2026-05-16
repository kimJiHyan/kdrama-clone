import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Store user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          username: formData.username || formData.email.split("@")[0],
        })
      );
      setLocation("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLocation("/")}
          className="text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
        <h1 className="text-3xl font-bold text-white">KDRAMA</h1>
      </div>

      {/* Form Card */}
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50">
        <div className="p-8">
          <h2 className="mb-2 text-2xl font-bold text-white">
            {isLogin ? "登录" : "注册"}
          </h2>
          <p className="mb-6 text-slate-400">
            {isLogin
              ? "登录您的账户继续观看"
              : "创建新账户开始观看韩剧"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username (Register Only) */}
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  用户名
                </label>
                <Input
                  type="text"
                  placeholder="输入用户名"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="输入密码"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register Only) */}
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  确认密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="再次输入密码"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    className="rounded border-slate-600"
                  />
                  记住我
                </label>
                <a href="#" className="text-purple-500 hover:text-purple-400">
                  忘记密码？
                </a>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {loading ? "处理中..." : isLogin ? "登录" : "注册"}
            </Button>
          </form>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? "还没有账户？" : "已有账户？"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-purple-500 hover:text-purple-400"
            >
              {isLogin ? "立即注册" : "立即登录"}
            </button>
          </div>

          {/* Social Login */}
          <div className="mt-6 space-y-2">
            <p className="text-center text-xs text-slate-500">或使用以下方式登录</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>
          登录即表示您同意我们的{" "}
          <a href="#" className="text-purple-500 hover:text-purple-400">
            服务条款
          </a>{" "}
          和{" "}
          <a href="#" className="text-purple-500 hover:text-purple-400">
            隐私政策
          </a>
        </p>
      </div>
    </div>
  );
}
