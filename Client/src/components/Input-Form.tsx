import { useState } from "react";

export default function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      addNote({ title, content });
      setTitle("");
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-white p-4 rounded-lg shadow-md mb-4 w-full max-w-lg"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-lg font-medium mb-2"
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm resize-none mb-4"
        rows="3"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Note
      </button>
    </form>
  );
}
