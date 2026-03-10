import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function FileItem({
  icon,
  name,
  time,
  iconBg = "bg-gray-200",
  iconColor = "text-gray-700",
  onEdit,
  onDelete,
  isUpload = false,
  onUploadClick
}) {

  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (isUpload) {
    return (
      <div
        onClick={onUploadClick}
        className="flex items-center gap-4 px-6 py-5 rounded-3xl border border-dashed border-[#44444461] bg-gray-50 hover:border-gray-50 shadow-md transition cursor-pointer"
      >

        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200">
          <Plus size={24} className="text-gray-500" />
        </div>

        <div>
          <p className="font-semibold text-gray-700">
            Drop files here
          </p>
          <p className="text-sm text-gray-500">
            or click to browse
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-white px-6 py-5 rounded-3xl hover:shadow-md transition">

      <div className="flex items-center gap-4">

        <div className={`w-14 h-14 flex items-center justify-center rounded-full ${iconBg}`}>
          <div className={iconColor}>{icon}</div>
        </div>

        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>

      </div>

      <div ref={menuRef} className="relative">

        <button onClick={() => setMenu(!menu)}>
          <MoreHorizontal size={18}/>
        </button>

        {menu && (
          <div className="absolute right-0 bg-white border rounded-xl shadow w-32">

            <button
              onClick={() => {
                setMenu(false);
                onEdit && onEdit();
              }}
              className="flex gap-2 p-2 text-sm hover:bg-gray-100 w-full"
            >
              <Pencil size={16}/> Rename
            </button>

            <button
              onClick={() => {
                setMenu(false);
                onDelete && onDelete();
              }}
              className="flex gap-2 p-2 text-sm text-red-500 hover:bg-red-50 w-full"
            >
              <Trash2 size={16}/> Delete
            </button>

          </div>
        )}

      </div>

    </div>
  );
}