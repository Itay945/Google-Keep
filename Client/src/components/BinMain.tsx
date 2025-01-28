// import SingleKeep from './SingleKeep';
import SingleTrash from './SingleTrash';

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

export default function BinMain({ keeps }) {
  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="">
          <div className="flex flex-wrap gap-4 p-4">
            {keeps.map((keep) => (
              <SingleTrash key={keep._id} keep={keep} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
