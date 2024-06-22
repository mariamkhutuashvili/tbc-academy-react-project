import Image from "next/image";
import { Modal, Box } from "@mui/material";

export default function OpenImage({
  open,
  handleClose,
  imageUrl,
}: {
  open: boolean;
  handleClose: () => void;
  imageUrl: string;
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        <Image
          src={imageUrl}
          alt="Modal Image"
          layout="fill"
          objectFit="contain"
          className="modal-image"
        />
      </Box>
    </Modal>
  );
}
