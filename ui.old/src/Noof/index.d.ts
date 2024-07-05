import type { SelectHTMLAttributes } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { TextareaHTMLAttributes } from 'vue';
import type { InputHTMLAttributes } from 'vue';

export interface NoofShared<EleAttr = HTMLAttributes> {
  /** Require the ID for label mapping. */
  id: string;
  /** The optional label to add above this input. Entire line is omitted of not present. */
  label?: string;
  /** An optional string indicating the presence of an error, described by the message. */
  errorMsg?: string;

  /** The optional additional props to pass to this element. */
  eleProps?: EleAttr;
}

export interface NoofInputProps extends NoofShared</* @vue-ignore */ InputHTMLAttributes> {}

export interface NoofTextareaProps extends NoofShared</* @vue-ignore */ TextareaHTMLAttributes> {}

export interface NoofSelectProps extends NoofShared</* @vue-ignore */ SelectHTMLAttributes> {}
