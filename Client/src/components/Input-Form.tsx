import { useState, useRef, useEffect } from "react";

export default function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFormVisible, setFormVisible] = useState(false); // State to control form visibility
  const formRef = useRef(null); // Reference to the form element

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() || content.trim()) {
      addNote({ title, content });
      setTitle("");
      setContent("");
      setFormVisible(false); // Close form after submit
    }
  };

  const handleInputClick = () => {
    setFormVisible(true); // Show the full form
  };

  const handleCloseForm = () => {
    setFormVisible(false); // Close the form
  };

  // Close the form if click outside of the form is detected
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mt-16">
      {/* Simple input that triggers the form to appear */}
      {!isFormVisible && (
        <input
          type="text"
          placeholder="Click to add a note"
          onClick={handleInputClick}
          className="w-full p-4 border rounded-lg shadow-md bg-white focus:outline-none focus:border-blue-500 text-lg"
        />
      )}

      {/* Full form that appears when input is clicked */}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-white p-4 rounded-lg shadow-lg mb-4 w-full"
          ref={formRef} // Attach ref to the form
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
            type="button"
            onClick={handleCloseForm} // Close form on button click
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Close
          </button>
        </form>
      )}
    </div>
  );
}
