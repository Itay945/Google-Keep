import NoteForm from "../components/Input-Form";
import AllKeeps from "../components/KeepMain";
export default function KeepsPage() {
  return (
    <div className="flex justify-center flex-col items-center">
      <NoteForm />
      <AllKeeps />
    </div>
  );
}
