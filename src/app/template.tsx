// الـ template بيُعاد إنشاؤه مع كل انتقال بين صفحات، فالأنيميشن بيشتغل بكل تنقّل
// (تغيير البحث أو الفلتر ما بيعيد إنشاءه، فما في وميض مع كل حرف)
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
