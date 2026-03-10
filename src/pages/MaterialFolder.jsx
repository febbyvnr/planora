import {
    Upload,
    FolderPlus,
    FileText,
    Image,
    FileSpreadsheet,
    Video,
    Calculator
} from "lucide-react";

import FileItem from "../components/FileItem";
import MaterialCard from "../components/MaterialCard";
import UploadModal from "../components/UploadModal";
import FolderModal from "../components/FolderModal";
import { useState, useRef } from "react";

export default function MaterialFolder() {
    const [editFile, setEditFile] = useState(null);
    const [deleteFile, setDeleteFile] = useState(null);
    const [openUpload, setOpenUpload] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editFolder, setEditFolder] = useState(null);
    const [deleteFolder, setDeleteFolder] = useState(null);

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        alert(`Uploaded: ${file.name}`);
    };

    const handleDeleteFile = () => {
        alert(`${deleteFile} deleted successfully`);
        setDeleteFile(null);
    };

    const handleSaveFolder = (data, mode) => {
        if (mode === "create") {
            alert(`Folder "${data.name}" created successfully`);
        } else {
            alert(`Folder "${data.name}" updated successfully`);
        }
    };

    const handleDeleteFolder = () => {
        alert(`${deleteFolder} folder deleted successfully`);
        setDeleteFolder(null);
    };

    return (
        <div className="space-y-10">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
            />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center">
                        <Calculator size={32} className="text-indigo-600"/>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">
                            Mathematics
                        </h1>
                        <p className="text-gray-500">
                            2 Folders | 40 Files | 165.7 MB
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                    >
                        <FolderPlus size={18}/>
                        New Folder
                    </button>
                    <button
                        onClick={() => setOpenUpload(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        <Upload size={18}/>
                        Upload File
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
                <MaterialCard
                    title="Calculus"
                    files="12"
                    size="45.2 MB"
                    color="#6385E5"
                    icon={<Calculator color="#6385E5"/>}
                    onEdit={() =>
                        setEditFolder({
                        name: "Calculus",
                        icon: "calculator",
                        color: "#6385E5"
                        })
                    }
                    onDelete={() => setDeleteFolder("Calculus")}
                />
                <MaterialCard
                    title="Algebra"
                    files="28"
                    size="120.5 MB"
                    color="#7C3AED"
                    icon={<Calculator color="#7C3AED"/>}
                    onEdit={() =>
                        setEditFolder({
                        name: "Algebra",
                        icon: "calculator",
                        color: "#7C3AED"
                        })
                    }
                    onDelete={() => setDeleteFolder("Algebra")}
                />
            </div>
            <div>
                <h2 className="text-2xl font-semibold mb-4">
                    Files
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    <FileItem
                        icon={<FileText size={24}/>}
                        name="Basic_Mathematics.pdf"
                        time="Modified 2h ago"
                        iconBg="bg-red-100"
                        iconColor="text-red-500"
                        onEdit={() => setEditFile("Basic_Mathematics.pdf")}
                        onDelete={() => setDeleteFile("Basic_Mathematics.pdf")}
                    />
                    <FileItem
                        icon={<Image size={24}/>}
                        name="Q1_Mid_Exam.png"
                        time="Modified 5h ago"
                        iconBg="bg-orange-100"
                        iconColor="text-orange-500"
                        onEdit={() => setEditFile("Q1_Mid_Exam.png")}
                        onDelete={() => setDeleteFile("Q1_Mid_Exam.png")}
                    />
                    <FileItem
                        icon={<FileSpreadsheet size={24}/>}
                        name="Data_Store.xlsx"
                        time="Modified 1d ago"
                        iconBg="bg-green-100"
                        iconColor="text-green-600"
                        onEdit={() => setEditFile("Data_Store.xlsx")}
                        onDelete={() => setDeleteFile("Data_Store.xlsx")}
                    />
                    <FileItem
                        icon={<Video size={24}/>}
                        name="Meet_Recording_12120.mp4"
                        time="Modified 3d ago"
                        iconBg="bg-purple-100"
                        iconColor="text-purple-600"
                        onEdit={() => setEditFile("Meet_Recording_12120.mp4")}
                        onDelete={() => setDeleteFile("Meet_Recording_12120.mp4")}
                    />
                    <FileItem
                        icon={<FileText size={24}/>}
                        name="Mid_Exam_Prep.pdf"
                        time="Modified 5d ago"
                        iconBg="bg-blue-100"
                        iconColor="text-blue-500"
                        onEdit={() => setEditFile("Mid_Exam_Prep.pdf")}
                        onDelete={() => setDeleteFile("Mid_Exam_Prep.pdf")}
                    />
                    <FileItem
                        isUpload
                        onUploadClick={handleUploadClick}
                    />
                </div>
            </div>
            {deleteFile && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-96">
                        <h3 className="text-lg font-semibold mb-2">
                            Delete File
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Are you sure you want to delete <b>{deleteFile}</b>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteFile(null)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteFile}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {editFile && (
                <div
                  className="fixed inset-0 bg-black/30 flex items-center justify-center"
                  onClick={() => setEditFile(null)}
                >
                    <div
                      className="bg-white rounded-2xl p-6 w-96"
                      onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-4">
                            Edit File Name
                        </h3>
                        <input
                            type="text"
                            defaultValue={editFile}
                            className="w-full border rounded-lg px-3 py-2 mb-6"
                            id="editFileInput"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditFile(null)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    const newName = document.getElementById("editFileInput").value;
                                    alert(`File renamed to ${newName}`);
                                    setEditFile(null);
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <UploadModal
                open={openUpload}
                onClose={() => setOpenUpload(false)}
                folder="Mathematics"
            />
            <FolderModal
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  mode="create"
                  onSave={(data) => handleSaveFolder(data, "create")}
            />
            <FolderModal
                  open={!!editFolder}
                  onClose={() => setEditFolder(null)}
                  mode="edit"
                  folder={editFolder}
                  onSave={(data) => handleSaveFolder(data, "edit")}
            />
            {deleteFolder && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white rounded-xl p-6 w-96">
                        <h3 className="text-lg font-semibold mb-2">
                            Delete Folder
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Are you sure you want to delete <b>{deleteFolder}</b>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteFolder(null)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteFolder}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}