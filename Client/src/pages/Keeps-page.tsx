import NoteForm from '../components/Input-Form';
import AllKeeps from '../components/KeepMain';
import KeepsForm from '../components/KeepsForm';
export default function KeepsPage() {
  return (
    <div className="flex justify-center flex-col items-center">
      {/* <NoteForm /> */}
      <KeepsForm />
      <AllKeeps />
    </div>
  );
}
