import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <aside className="w-64 fixed left-0 top-0 h-screen bg-white border-r">
                <Sidebar />
            </aside>
            <main className="ml-64 flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}