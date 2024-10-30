import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface IProps {
  isOpen: boolean;
  title: string;
  description: string;
  cancelTxt: string;
  onTxt: string;
  onClose: () => void;
  onOkHandler?: (id: number) => void;
  isLoading?: boolean;
}
const CustomAlertDialog = ({
  isOpen,
  onClose,
  title,
  description,
  cancelTxt,
  onTxt,
  onOkHandler,
  isLoading,
}: IProps) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant={"outline"}>
              {cancelTxt}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              variant={"outline"}
              onClick={onOkHandler}
              isLoading={isLoading}
            >
              {onTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomAlertDialog;
