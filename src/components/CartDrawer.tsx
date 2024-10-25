import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { AppDispatch } from "../app/store";

function CartDrawer() {
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const btnRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();

  const onClose = () => dispatch(onCloseCartDrawerAction());

  return (
    <>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={() => {
          onClose();
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder="Type here..." /> */}
            Lorem
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {}}
              colorScheme="red"
            >
              Clear All
            </Button>
            {/* <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default CartDrawer;
