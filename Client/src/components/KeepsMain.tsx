import SingleKeep from './SingleKeep';

export type Keep = {
  _id: string;
  title: string;
  description: string;
  color: KeepColor;
  labels: string[];
  isDeleted: false;
  editedAt: Date;
  createdAt: Date;
  author: string;
  pin: boolean;
};
export type KeepColor =
  | 'Coral'
  | 'Peach'
  | 'Sand'
  | 'Mint'
  | 'Sage'
  | 'Fog'
  | 'Storm'
  | 'Dusk'
  | 'Blossom'
  | 'Clay'
  | 'Chalk';
interface KeepsMainProps {
  keeps: Keep[];
  error: string | null;
  onKeepUpdate: (keepId: string, updates: Partial<Keep>) => void;
}
export default function KeepsMain({
  error,
  keeps,
  onKeepUpdate,
}: KeepsMainProps) {
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const pinnedKeeps = keeps.filter((keep) => keep.pin);
  const otherKeeps = keeps.filter((keep) => !keep.pin);

  return (
    <>
      <div className="flex gap-4 p-4">
        {pinnedKeeps.length > 0 && (
          <div className="">
            <h2>Pinned</h2>
            {pinnedKeeps.map((keep) => (
              <SingleKeep
                key={keep._id}
                keep={keep}
                onKeepUpdate={onKeepUpdate}
              />
            ))}
          </div>
        )}
        {otherKeeps.length > 0 && (
          <div>
            {pinnedKeeps.length > 0 && <h2>Others</h2>}
            {otherKeeps.map((keep) => (
              <SingleKeep
                key={keep._id}
                keep={keep}
                onKeepUpdate={onKeepUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
