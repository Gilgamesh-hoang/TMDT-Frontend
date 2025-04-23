import {ChangeEvent} from "react";

export default function TextArea(props: {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  required?: boolean;
  className?: string;
  row?: number;
}) {
  return (
    <textarea
      id="reviewText"
      value={props.value}
      onChange={props.onChange}
      rows={props.row || 4}
      className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300 ${props.className || ""}`}
      required={props.required}
    ></textarea>
  )
}