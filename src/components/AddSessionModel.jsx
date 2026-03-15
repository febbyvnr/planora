import { useState } from "react";

export default function AddSessionModel({ close, addSession }) {

    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");

    function submit() {
        addSession(name, duration);
        close();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

        <div className="bg-white p-6 rounded-2xl w-80 space-y-4">

            <h2 className="text-xl font-bold">Add Session</h2>

            <input
            placeholder="Session Name"
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
            />

            <input
            placeholder="Duration (minutes)"
            className="w-full border p-2 rounded"
            onChange={(e) => setDuration(e.target.value)}
            />

            <div className="flex justify-end gap-3">

            <button onClick={close}>Cancel</button>

            <button
                onClick={submit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Add
            </button>

            </div>

        </div>

        </div>
    );
}