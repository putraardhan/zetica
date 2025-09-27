export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ❌ Jangan import Sidebar atau komponen global di sini
  // ✅ Cuma return children apa adanya
  return <>{children}</>;
}
