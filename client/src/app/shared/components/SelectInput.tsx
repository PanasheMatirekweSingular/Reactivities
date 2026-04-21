import { FormControl, FormHelperText, InputLabel, MenuItem } from "@mui/material";
import {useController, type FieldValues,  type UseControllerProps} from "react-hook-form";
import Select, { type SelectProps } from "@mui/material/Select";

type Props<T extends FieldValues> = {
    items:{text: string, value: string}[];
    label: string;
} & UseControllerProps<T> & Partial<SelectProps>

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController(props);

  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>

      <Select
        labelId={`${props.name}-label`}
        value={field.value || ""}
        label={props.label}
        onChange={field.onChange}
        onBlur={field.onBlur}
        inputRef={field.ref}
      >
        {props.items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  )
}