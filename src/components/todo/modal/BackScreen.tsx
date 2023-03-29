export default function BackScreen({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={`back-screen fixed w-screen h-screen bg-[#0000907c] inset-0 ${
        open ? "" : "hidden"
      } cursor-auto`}
      onClick={onClose}
    />
  );
}
