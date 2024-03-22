export type SelectOptionType = { label: string, value: number }

export type SelectType = {
  options: SelectOptionType[];
  selected: SelectOptionType | undefined;
  handleChange: (v: SelectOptionType) => void;
  placeholder: string,
  loading: boolean,
  lastOptionRef: (node: Element | null) => void,
}