import { X, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadModal({ open, onClose, folder = "Storage" }) {

  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [share, setShare] = useState(false);

  if (!open) return null;

  const handleBrowse = () => {
    fileRef.current.click();
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      name: file.name,
      progress: 0,
      status: "uploading"
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
                  status: progress >= 100 ? "ready" : "uploading"
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
    alert(`Files uploaded successfully to ${folder}`);
    setFiles([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-[520px] rounded-3xl p-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-4">

          <div>
            <h2 className="text-xl font-bold">Upload Files</h2>
            <p className="text-gray-500 text-sm">
              Add documents to your Materials Storage
            </p>
          </div>

          <button onClick={onClose}>
            <X size={20}/>
          </button>

        </div>


        {/* Drop area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-indigo-400 rounded-xl p-10 text-center mb-6"
        >

          <UploadCloud className="mx-auto mb-4 text-indigo-500" size={36}/>

          <p className="font-semibold">
            Drag and drop files here
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Support for PDF, DOCX, PNG up to 50MB
          </p>

          <button
            onClick={handleBrowse}
            className="px-4 py-2 bg-gray-100 rounded-lg"
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


        {/* Upload list */}
        {files.length > 0 && (
          <div className="mb-6">

            <p className="text-sm text-gray-500 mb-3">
              UPLOADING - {files.length} FILES
            </p>

            <div className="space-y-3">

              {files.map((file, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-3 rounded-xl"
                >

                  <div className="flex justify-between text-sm mb-1">
                    <span>{file.name}</span>
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


        {/* Footer */}
        <div className="flex justify-between items-center">

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
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Upload to {folder} →
          </button>

        </div>

      </div>

    </div>
  );
}