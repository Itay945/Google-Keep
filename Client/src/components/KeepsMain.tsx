import { Link } from 'react-router-dom';
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
  | 'Transparent'
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
export default function KeepsMain({ keeps, onKeepUpdate }: KeepsMainProps) {
  const filteredKeeps = keeps.filter((keep) => !keep.isDeleted);
  const pinnedKeeps = filteredKeeps.filter((keep) => keep.pin);
  const otherKeeps = filteredKeeps.filter((keep) => !keep.pin);

  return (
    <>
      <div>
        <div className="flex flex-wrap gap-4 p-4">
          {pinnedKeeps.length > 0 && (
            <div className="">
              <h2>Pinned</h2>
              <div className="flex flex-wrap gap-4 p-4">
                {pinnedKeeps.map((keep) => (
                  <Link to={`/keeps/${keep._id}`} key={keep._id}>
                    <SingleKeep
                      key={keep._id}
                      keep={keep}
                      onKeepUpdate={onKeepUpdate}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
          {otherKeeps.length > 0 && (
            <div>
              {pinnedKeeps.length > 0 && <h2>Others</h2>}
              <div className="flex flex-wrap gap-4 p-4">
                {otherKeeps.map((keep) => (
                  <Link to={`/keeps/${keep._id}`} key={keep._id}>
                    <SingleKeep
                      key={keep._id}
                      keep={keep}
                      onKeepUpdate={onKeepUpdate}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
