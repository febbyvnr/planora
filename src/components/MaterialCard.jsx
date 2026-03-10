import { MoreHorizontal, CircleUserRound, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";

export default function MaterialCard({
  title,
  files,
  size,
  color,
  icon,
  onEdit,
  onDelete,
  onClick
}) {

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col gap-4 hover:-translate-y-1 transition relative cursor-pointer"
      style={{
        boxShadow: `4px 4px 0px ${color}`
      }}
    >

      {/* Top */}
      <div className="flex justify-between items-start">

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>

        <div ref={menuRef} className="relative">
          <button onClick={() => setOpenMenu(!openMenu)}>
            <MoreHorizontal size={20} className="text-gray-400" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md">

              <button
               onClick={() => {
                setOpenMenu(false);
                onEdit();
              }}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-50 text-sm"
              >
                <Pencil size={16}/>
                Edit
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  onDelete();
                }}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-50 text-red-500 text-sm"
              >
                <Trash2 size={16}/>
                Delete
              </button>

            </div>
          )}
        </div>

      </div>

      {/* Title */}
      <div>
        <h3 className="font-semibold text-xl text-gray-800">
          {title}
        </h3>

        <p className="text-gray-500 text-sm">
          {files} Files | {size}
        </p>
      </div>

      {/* Users */}
      <div className="flex -space-x-3">

        <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-red-100">
          <CircleUserRound size={32} className="text-red-500"/>
        </div>

        <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-purple-100">
          <CircleUserRound size={32} className="text-purple-500"/>
        </div>

        <div className="w-8 h-8 rounded-full flex items-center justify-center border bg-blue-100">
          <CircleUserRound size={32} className="text-blue-500"/>
        </div>

      </div>

    </div>
  );
}