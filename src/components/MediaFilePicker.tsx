"use client";

import type { ChangeEventHandler } from "react";

export function MediaFilePicker({
  label,
  accept,
  disabled = false,
  onChange,
}: {
  label: string;
  accept: string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="media-file-picker" aria-disabled={disabled}>
      <span aria-hidden="true">{label}</span>
      <input
        type="file"
        aria-label={label}
        accept={accept}
        disabled={disabled}
        // The native input fills the button. Touch opens the OS picker directly,
        // without forwarding a label click or losing activation in async work.
        onClick={(event) => { event.currentTarget.value = ""; }}
        onChange={onChange}
      />
    </label>
  );
}
