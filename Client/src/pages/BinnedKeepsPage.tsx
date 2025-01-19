import SingleKeepBinned from "../components/SingleKeepBinned";

export default function BinnedKeepsPage() {
  return (
    <>
      <div className="flex justify-center">
        Notes in the Recycle Bin are deleted after 7 days.
        <button>Empty bin</button>
      </div>
      <SingleKeepBinned />
    </>
  );
}
