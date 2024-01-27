import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookingCreate } from "../../../types/BookingCreate";
import { InvoiceItem } from "../../../types/InvoiceItem";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import PriceDisplay from "../../../components/PriceDisplay";
import formatDateTime from "../../../utils/FormatDateTime";
import "./_invoice-item-display.scss";

type InvoiceItemDisplayProps = {
  item: InvoiceItem;
  onDelete: (booking: BookingCreate) => void;
};

export default function InvoiceItemDisplay({
  item,
  onDelete,
}: InvoiceItemDisplayProps) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] =
    useState<boolean>(false);

  const showConfirmationDialog = () => {
    setConfirmDeleteVisible(true);
  };

  const handleDelete = () => {
    onDelete(item.booking);
    setConfirmDeleteVisible(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
  };

  const getTripDescription = () => {
    return `${item.trip?.route.startStation.name} to ${item.trip?.route.endStation.name}`;
  };

  useEffect(() => {}, []);

  return (
    <div className="invoice-item-display">
      <Typography>
        <Box className="invoice-item-display__description" mb={1}>
          {getTripDescription()}
        </Box>
        <Box mb={2}>
          <Typography>{formatDateTime(item.trip.departure)}</Typography>
        </Box>
        <Box mb={1}>Total Seats: {item.booking.bookingSeats?.length}</Box>
        <Box mb={1}>
          <PriceDisplay value={item.price}></PriceDisplay>
        </Box>

        <Link to={`/trip-detail/${item.trip.tripId}`}>
          <Stack direction="row" alignItems="center" marginBottom={1} gap={1}>
            <EditIcon />
            <Typography>Edit</Typography>
          </Stack>
        </Link>
        <div>
          <DeleteIcon
            className="invoice-item-display__delete-icon"
            onClick={showConfirmationDialog}
          ></DeleteIcon>
        </div>
      </Typography>
      <ConfirmationDialog
        open={confirmDeleteVisible}
        onConfirm={handleDelete}
        onClose={handleCancelDelete}
        title="Delete Trip?"
        text={`Are you sure you want to delete your trip from ${getTripDescription()}?`}
        confirmText="Delete"
        cancelText="Cancel"
      ></ConfirmationDialog>
    </div>
  );
}
