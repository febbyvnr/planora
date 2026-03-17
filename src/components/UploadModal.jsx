import { X, UploadCloud, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function UploadModal({ open, onClose, folder = "Storage" }) {
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [share, setShare] = useState(false);
    const [toast, setToast] = useState(null);

    if (!open) return null;

    const handleBrowse = () => {
        fileRef.current.click();
    };

    const handleFiles = (fileList) => {
        const newFiles = Array.from(fileList).map((file) => ({
        name: file.name,
        progress: 0,
        status: "uploading",
        }));

        setFiles((prev) => [...prev, ...newFiles]);

        newFiles.forEach((f, index) => {
        let progress = 0;

        const interval = setInterval(() => {
            progress += 10;

            setFiles((prev) =>
            prev.map((file, i) =>
                i === prev.length - newFiles.length + index
                ? {
                    ...file,
                    progress,
                    status: progress >= 100 ? "ready" : "uploading",
                    }
                : file
            )
            );

            if (progress >= 100) clearInterval(interval);
        }, 200);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleUpload = (e) => {
        handleFiles(e.target.files);
    };

    const handleSubmit = () => {
        confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        });

        setToast(`Files uploaded successfully to ${folder}`);

        setTimeout(() => {
        setToast(null);
        setFiles([]);
        onClose();
        }, 2000);
    };

    return (
        <div className="fixed -top-10 left-0 right-0 bottom-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn px-4">
        <div className="bg-white w-full max-w-lg rounded-3xl max-h-[90vh] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-start shrink-0 p-4 sm:p-6 pb-2">
            <div>
                <h2 className="text-lg sm:text-xl font-bold">Upload Files</h2>
                <p className="text-gray-500 text-sm">
                Add documents to your Materials Storage
                </p>
            </div>
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 hover:rotate-90 transition-all duration-200"
                onClick={onClose}
            >
                <X size={20} />
            </button>
            </div>
            <div className="overflow-y-auto px-4 sm:px-6 pb-6">
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-indigo-400 rounded-xl p-6 sm:p-10 text-center mb-6"
            >
                <UploadCloud
                className="mx-auto mb-3 sm:mb-4 text-indigo-500"
                size={36}
                />
                <p className="font-semibold text-sm sm:text-base">
                Drag and drop files here
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">
                Support for PDF, DOCX, PNG up to 50MB
                </p>
                <button
                onClick={handleBrowse}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
                >
                Browse Files
                </button>
                <input
                ref={fileRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleUpload}
                />
            </div>
            {files.length > 0 && (
                <div className="mb-6">
                <p className="text-xs sm:text-sm text-gray-500 mb-3">
                    UPLOADING - {files.length} FILES
                </p>
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {files.map((file, i) => (
                    <div key={i} className="bg-gray-100 p-3 rounded-xl">
                        <div className="flex justify-between text-xs sm:text-sm mb-1">
                        <span className="truncate max-w-[70%]">
                            {file.name}
                        </span>
                        <span>
                            {file.status === "ready"
                            ? "Ready"
                            : `${file.progress}%`}
                        </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded">
                        <div
                            className={`h-2 rounded ${
                            file.status === "ready"
                                ? "bg-green-500"
                                : "bg-indigo-500"
                            }`}
                            style={{ width: `${file.progress}%` }}
                        />
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            )}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={share}
                    onChange={() => setShare(!share)}
                />
                Share with collaborator
                </label>
                <button
                onClick={handleSubmit}
                disabled={files.length === 0}
                className={`px-5 py-2 rounded-lg text-sm sm:text-base transition
                    ${
                    files.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                >
                Upload to {folder} →
                </button>
            </div>
            </div>
        </div>
        {toast && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-toast px-4 w-full flex justify-center">
            <div className="bg-white shadow-xl border rounded-xl px-6 py-4 flex items-center gap-3">
                <CheckCircle className="text-green-500" size={20} />
                <p className="text-sm text-gray-700 font-medium">{toast}</p>
            </div>
            </div>
        )}
        </div>
    );
}