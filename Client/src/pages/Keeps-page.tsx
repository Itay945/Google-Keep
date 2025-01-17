import NoteForm from '../components/Input-Form';
import Keep from '../components/KeepMain';
export default function KeepsPage() {
  return (
    <div className="flex justify-center flex-col items-center">
      <NoteForm />
      <Keep />
    </div>
  );
}
