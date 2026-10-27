import type { FormEvent } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";

import type { CollectionItem } from "../../types/collection";

interface InstrumentFormDialogProps {
  open: boolean;
  instrument: CollectionItem | null;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDelete?: (id: string) => void;
  isSubmitting?: boolean;
  error?: string;
}

const InstrumentFormDialog = ({
  open,
  instrument,
  onClose,
  onSubmit,
  onDelete,
  isSubmitting = false,
  error,
}: InstrumentFormDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {instrument ? "Edit Instrument" : "Add Instrument"}
      </DialogTitle>

      <DialogContent>
        <Stack
          component="form"
          key={instrument?.id ?? "new"}
          id="instrument-form"
          spacing={2}
          sx={{ pt: 1 }}
          onSubmit={onSubmit}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            name="brand"
            label="Brand"
            defaultValue={instrument?.brand ?? ""}
            required
            fullWidth
          />

          <TextField
            name="model"
            label="Model"
            defaultValue={instrument?.model ?? ""}
            required
            fullWidth
          />

          <TextField
            name="category"
            label="Category"
            select
            defaultValue={instrument?.category ?? "guitar"}
            required
            fullWidth
          >
            <MenuItem value="guitar">Guitar</MenuItem>
            <MenuItem value="amp">Amplifier</MenuItem>
            <MenuItem value="pedal">Pedal</MenuItem>
          </TextField>

          <TextField
            name="year"
            label="Year"
            type="number"
            defaultValue={instrument?.year ?? ""}
            fullWidth
          />

          <TextField
            name="finish"
            label="Finish"
            defaultValue={instrument?.finish ?? ""}
            fullWidth
          />

          <TextField
            name="serialNumber"
            label="Serial Number"
            defaultValue={instrument?.serialNumber ?? ""}
            fullWidth
          />

          <TextField
            name="imageUrl"
            label="Image URL (Optional)"
            placeholder="https://example.com/guitar.jpg"
            helperText="Paste a direct image link, or leave this blank."
            defaultValue={instrument?.imageUrl ?? ""}
            fullWidth
          />

          <TextField
            name="availability"
            label="Availability"
            select
            defaultValue={instrument?.availability ?? "not_for_sale"}
            fullWidth
          >
            <MenuItem value="not_for_sale">Not for sale</MenuItem>
            <MenuItem value="for_sale">For sale</MenuItem>
            <MenuItem value="open_to_trade">Open to trade</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        {instrument && onDelete && (
          <Button
            type="button"
            size="small"
            color="error"
            disabled={isSubmitting}
            onClick={() => onDelete(instrument.id)}
            sx={{ mr: "auto", textTransform: "none" }}
          >
            Delete Instrument
          </Button>
        )}

        <Button onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>

        <Button
          variant="contained"
          type="submit"
          form="instrument-form"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : instrument
              ? "Save Changes"
              : "Save Instrument"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstrumentFormDialog;
