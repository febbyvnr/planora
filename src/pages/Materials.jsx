import {
    Upload,
    FolderPlus,
    BookOpen,
    Sprout,
    FileText,
    Calculator,
    Brain,
    Image,
    FileSpreadsheet,
    Video, 
    CheckCircle
} from "lucide-react";

import MaterialCard from "../components/MaterialCard";
import FileItem from "../components/FileItem";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FolderModal from "../components/FolderModal";
import UploadModal from "../components/UploadModal";
import deleteImg from "../assets/images/materials-delete.png";
import footer from "../assets/images/Materials-footer.png";
import confetti from "canvas-confetti";

export default function Materials() {
    const [openModal, setOpenModal] = useState(false);
    const [editFolder, setEditFolder] = useState(null);
    const [deleteFolder, setDeleteFolder] = useState(null);
    const [editFile, setEditFile] = useState(null);
    const [deleteFile, setDeleteFile] = useState(null);
    const fileInputRef = useRef(null);
    const [openUpload, setOpenUpload] = useState(false);
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);

    const showToast = (message, conf) => {
        setToast(message);

        if (conf) {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 9999
            });
        }

        setTimeout(() => {
            setToast(null);
        }, 2000);
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        showToast(`${file.name} uploaded successfully`, true);
    };

    const handleDeleteFolder = () => {
        showToast(`${deleteFolder} folder deleted successfully`, false);
        setDeleteFolder(null);
    };

    const handleDeleteFile = () => {
        showToast(`${deleteFile} deleted successfully`, false);
        setDeleteFile(null);
    };

    const handleSaveFolder = (data, mode) => {
        if (mode === "create") {
            showToast(`Folder "${data.name}" created successfully`, true);
            setOpenModal(false);
        } else {
            showToast(`Folder "${data.name}" updated successfully`, true);
            setEditFolder(null);
        }
    };

    return (
        <div className="min-h-screen -mt-10">
            <div className="space-y-10">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                />
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Materials Storage</h1>
                        <p className="text-gray-500">
                            Organize and manage your academic resources efficiently
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
                        >
                            <FolderPlus size={18} />
                            New Folder
                        </button>
                        <button
                            onClick={() => setOpenUpload(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            <Upload size={18} />
                            Upload File
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MaterialCard
                        title="Mathematics"
                        files="12"
                        size="45.2 MB"
                        color="#6385E5"
                        icon={<Calculator color="#6385E5"/>}
                        onClick={() => navigate("/materials/mathematics")}
                        onEdit={() =>
                            setEditFolder({
                                name: "Mathematics",
                                icon: "calculator",
                                color: "#6385E5"
                            })
                        }
                        onDelete={() => setDeleteFolder("Mathematics")}
                    />
                    <MaterialCard
                        title="Psychology"
                        files="28"
                        size="120.5 MB"
                        color="#7C3AED"
                        icon={<Brain color="#7C3AED"/>}
                        onEdit={() =>
                            setEditFolder({
                                name: "Psychology",
                                icon: "brain",
                                color: "#7C3AED"
                            })
                        }
                        onDelete={() => setDeleteFolder("Psychology")}
                    />
                    <MaterialCard
                        title="History"
                        files="8"
                        size="15.8 MB"
                        color="#F59E0B"
                        icon={<BookOpen color="#F59E0B"/>}
                        onEdit={() =>
                            setEditFolder({
                                name: "History",
                                icon: "book",
                                color: "#F59E0B"
                            })
                        }
                        onDelete={() => setDeleteFolder("History")}
                    />
                    <MaterialCard
                        title="Biology"
                        files="42"
                        size="210.8 MB"
                        color="#10B981"
                        icon={<Sprout color="#10B981"/>}
                        onEdit={() =>
                            setEditFolder({
                                name: "Biology",
                                icon: "sprout",
                                color: "#10B981"
                            })
                        }
                        onDelete={() => setDeleteFolder("Biology")}
                    />
                </div>
                {/* Files inside folder */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FileItem
                        icon={<FileText size={24}/>}
                        name="Lecture_Notes.pdf"
                        time="Modified 1h ago"
                        iconBg="bg-red-100"
                        iconColor="text-red-500"
                        onEdit={() => setEditFile("Lecture_Notes.pdf")}
                        onDelete={() => setDeleteFile("Lecture_Notes.pdf")}
                    />
                    <FileItem
                        icon={<Image size={24}/>}
                        name="Diagram.png"
                        time="Modified 4h ago"
                        iconBg="bg-orange-100"
                        iconColor="text-orange-500"
                        onEdit={() => setEditFile("Diagram.png")}
                        onDelete={() => setDeleteFile("Diagram.png")}
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Recent Files</h2>
                        <button className="text-indigo-600 text-sm">
                            View All Files
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FileItem
                            icon={<FileText size={24} />}
                            name="Mid_Exam_Prep.pdf"
                            time="Modified 2h ago"
                            iconBg="bg-red-100"
                            iconColor="text-red-500"
                            onEdit={() => setEditFile("Mid_Exam_Prep.pdf")}
                            onDelete={() => setDeleteFile("Mid_Exam_Prep.pdf")}
                        />
                        <FileItem
                            icon={<Image size={24} />}
                            name="Mind_Map_Biology.png"
                            time="Modified 5h ago"
                            iconBg="bg-orange-100"
                            iconColor="text-orange-500"
                            onEdit={() => setEditFile("Mind_Map_Biology.png")}
                            onDelete={() => setDeleteFile("Mind_Map_Biology.png")}
                        />
                        <FileItem
                            icon={<FileSpreadsheet size={24} />}
                            name="Transaction_Log.xlsx"
                            time="Modified 1d ago"
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                            onEdit={() => setEditFile("Transaction_Log_February.xlsx")}
                            onDelete={() => setDeleteFile("Transaction_Log_February.xlsx")}
                        />
                        <FileItem
                            icon={<Video size={24} />}
                            name="Meet_Record.mp4"
                            time="Modified 3d ago"
                            iconBg="bg-purple-100"
                            iconColor="text-purple-600"
                            onEdit={() => setEditFile("Meet_Recording_12120.mp4")}
                            onDelete={() => setDeleteFile("Meet_Record.mp4")}
                        />
                        <FileItem
                            icon={<FileText size={24} />}
                            name="Biology_Notes.docx"
                            time="Modified 2h ago"
                            iconBg="bg-blue-100"
                            iconColor="text-blue-500"
                            onEdit={() => setEditFile("Biology_Notes.docx")}
                            onDelete={() => setDeleteFile("Biology_Notes.docx")}
                        />
                        <FileItem
                            isUpload
                            onUploadClick={handleUploadClick}
                        />
                    </div>
                </div>
                <div className="rounded-[40px] overflow-hidden mt-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                    <img
                        src={footer}
                        alt="Materials Storage Footer"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <FolderModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    mode="create"
                    onSave={(data) => handleSaveFolder(data, "create")}
                />
                {deleteFolder && (
                    <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center">
                            <img
                                src={deleteImg}
                                className="w-24 mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                                Delete Folder
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Are you sure you want to delete <b>{deleteFolder}</b>?
                            </p>
                            <div className="flex justify-center gap-3">
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
                {deleteFile && (
                    <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center">
                            <img
                                src={deleteImg}
                                className="w-24 mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                                Delete File
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Are you sure you want to delete <b>{deleteFile}</b>?
                            </p>
                            <div className="flex justify-center gap-3">
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
                <FolderModal
                    open={!!editFolder}
                    onClose={() => setEditFolder(null)}
                    mode="edit"
                    folder={editFolder}
                    onSave={(data) => handleSaveFolder(data, "edit")}
                />
                {editFile && (
                    <div
                        className="fixed -top-10 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn"
                        onClick={() => setEditFile(null)}
                    >
                        <div
                            className="bg-white rounded-2xl p-6 w-[90%] max-w-md"
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
                                        setEditFile(null);
                                        showToast(`File renamed to ${newName}`, true);
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
                    folder="Main Folder"
                />
                {toast && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-toast">
                        <div className="bg-white border shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={20}/>
                            <p className="text-sm font-medium text-gray-700">
                                {toast}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}