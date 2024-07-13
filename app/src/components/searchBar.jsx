import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import {
  Search as SearchIcon, Clear as ClearIcon
} from "@mui/icons-material";

export default function SearchBar(props) {
  const {value, onChange, cancelHandler, ...otherProps} = props;

  return (
    <FormControl {...otherProps} variant="outlined">
      <InputLabel htmlFor="search">Recherche</InputLabel>
      <OutlinedInput
        id="search"
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              type="submit"
              aria-label={value ? "rechercher" : "annuler"}
              edge="end"
              onClick={value && cancelHandler ? cancelHandler : undefined}
            >
              {value ?
                <ClearIcon/>
                :
                <SearchIcon/>
              }
            </IconButton>
          </InputAdornment>
        }
        label="Recherche"
      />
    </FormControl>
  );
}