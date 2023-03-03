import Sidebar from "../Sidebar";

export default function Layout({ children }) {
  return (
    <div className="max-w-3xl mx-auto flex justify-start gap-1">
      <header className="w-20 h-full">
        <Sidebar />
      </header>
      <main className="w-full border ml-1">{children}</main>
    </div>
  );
}
