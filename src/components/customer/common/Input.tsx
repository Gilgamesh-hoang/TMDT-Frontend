import React, {ChangeEvent} from "react";

export default function Input(props: {
  type?: React.HTMLInputTypeAttribute
  accept?: string
  className?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  required?: boolean,
  value?: string,
}) {
  return (
    <input
      value={props.value || ""}
      type={props.type || "text"}
      accept={props.accept}
      className={`w-full p-2 border rounded ${props.className || ""}`}
      onChange={props.onChange}
      required={props.required}
    />
  )
}