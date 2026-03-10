import { useState, useEffect } from "react";
import { Calculator, Brain, BookOpen, Sprout, Folder, FlaskConical } from "lucide-react";

export default function FolderModal({
    open,
    onClose,
    mode = "create",
    folder = null,
    onSave
}) {

    const [name, setName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedColor, setSelectedColor] = useState("#3B82F6");
    const [openCollaborator, setOpenCollaborator] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedFriend, setSelectedFriend] = useState(null);

    useEffect(() => {
        if (mode === "edit" && folder) {
            setName(folder.name);
            setSelectedIcon(folder.icon);
            setSelectedColor(folder.color);
        }
    }, [mode, folder]);

    if (!open) return null;

    const icons = [
        { name: "calculator", component: <Calculator /> },
        { name: "brain", component: <Brain /> },
        { name: "book", component: <BookOpen /> },
        { name: "sprout", component: <Sprout /> },
        { name: "flask", component: <FlaskConical /> },
        { name: "folder", component: <Folder /> }
    ];

    const colors = [
        "#3B82F6",
        "#A855F7",
        "#22C55E",
        "#EF4444",
        "#FB923C",
        "#EC4899",
        "#60A5FA"
    ];

    const friends = [
        { username: "alexandra" },
        { username: "john_doe" },
        { username: "michelle" },
        { username: "kevin_smith" },
        { username: "diana" },
        { username: "andrew" },
        { username: "samantha" }
    ];

    const filteredFriends = friends.filter(friend =>
        friend.username.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = () => {
        const data = {
            name,
            icon: selectedIcon,
            color: selectedColor
        };
        onSave(data);
        onClose();
    };

    const handleAddCollaborator = () => {
        if (!selectedFriend) return;
        alert(`${selectedFriend.username} added as collaborator`);
        setSelectedFriend(null);
        setOpenCollaborator(false);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white w-[425px] rounded-3xl p-8 space-y-6">
                    {/* TITLE */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            {mode === "create" ? "Create Folder" : "Edit Folder"}
                        </h2>
                        {/* collaborators only for edit */}
                        {mode === "edit" ? (
                            <div className="flex items-center">
                                <div className="flex -space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-400 border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-pink-400 border-2 border-white"></div>
                                    <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white"></div>
                                    <div
                                        onClick={() => setOpenCollaborator(true)}
                                        className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-gray-200"
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setOpenCollaborator(true)}
                                className="text-gray-500"
                            >
                                Add Collaborator
                            </button>
                        )}
                    </div>

                    {/* INPUT */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">FOLDER NAME</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Folder Name..."
                            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* ICON SELECT */}
                    <div>
                        <p className="text-sm text-gray-500 mb-3">SELECT ICON</p>
                        <div className="flex gap-3 flex-wrap">
                            {icons.map((icon) => (
                                <button
                                    key={icon.name}
                                    onClick={() => setSelectedIcon(icon.name)}
                                    className={`p-3 border rounded-xl ${
                                        selectedIcon === icon.name
                                          ? "border-indigo-500 bg-indigo-50"
                                          : ""
                                    }`}
                                >
                                    {icon.component}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* COLOR */}
                    <div>
                        <p className="text-sm text-gray-500 mb-3">CHOOSE COLOR</p>
                        <div className="flex gap-3 flex-wrap">
                            {colors.map((color) => (
                              <div
                                  key={color}
                                  onClick={() => setSelectedColor(color)}
                                  className={`w-8 h-8 rounded-full cursor-pointer border-4 ${
                                      selectedColor === color
                                        ? "border-gray-300"
                                        : "border-transparent"
                                  }`}
                                  style={{ backgroundColor: color }}
                              />
                            ))}
                        </div>
                    </div>

                    {/* BUTTON */}
                    <div className="flex justify-between items-center pt-4">
                        <button
                            onClick={onClose}
                            className="text-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
                        >
                            {mode === "create" ? "Create Folder" : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ADD COLLABORATOR MODAL */}
            {openCollaborator && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white w-[400px] rounded-2xl p-6 space-y-5">
                        <h3 className="text-lg font-semibold">
                            Add Collaborator
                        </h3>
                        <input
                            type="text"
                            placeholder="Search username..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        <div className="max-h-40 overflow-y-auto space-y-2">
                            {filteredFriends.map((friend) => (
                                <div
                                    key={friend.username}
                                    onClick={() => setSelectedFriend(friend)}
                                    className={`p-2 rounded-lg cursor-pointer ${
                                      selectedFriend?.username === friend.username
                                        ? "bg-indigo-50 border border-indigo-400"
                                        : "hover:bg-gray-50"
                                    }`}
                                >
                                    {friend.username}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => setOpenCollaborator(false)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCollaborator}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}