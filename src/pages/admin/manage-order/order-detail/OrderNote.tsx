import { FC } from "react";

interface OrderNoteProps {
  note: string;
}
export const OrderNote: FC<OrderNoteProps> = ({ note }) => {
  return (
    <div className="rounded-2xl border p-2">
      <h3>Ghi chu</h3>
      <p className="whitespace-pre-line break-word">{note || "Khong co ghi chu"}</p>
    </div>
  );
};
