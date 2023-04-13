import Sidebar from "../Sidebar";
import BottomBar from "@/components/BottomBar";

export default function Layout({ children }) {
  return (
    <div className="max-w-3xl mx-auto flex justify-start gap-1">
      <header className="w-20 h-full hidden md:block">
        <Sidebar />
      </header>
      <main className="w-full border md:ml-1">{children}</main>
      <footer>
        <BottomBar />
      </footer>
    </div>
  );
}
