import { Chip } from "@mui/material";
import type { GearAvailability } from "../../types/gear";

interface AvailabilityBadgeProps {
  availability: GearAvailability;
}

const availabilityLabels: Record<GearAvailability, string> = {
  not_for_sale: "Not for Sale",
  for_sale: "For Sale",
  open_to_trade: "Open to Trade",
};

const AvailabilityBadge = ({ availability }: AvailabilityBadgeProps) => {
  return (
    <Chip
      label={availabilityLabels[availability]}
      size="small"
      variant="outlined"
    />
  );
};

export default AvailabilityBadge;
