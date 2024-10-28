import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import { AppDispatch } from "../app/store";
import { clearCart, selectCartItems } from "../app/features/cartSlice";
import { IProductItem } from "../interfaces";
import CartDrawerItem from "./CartDrawerItem";

function CartDrawer() {
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const cartItems: Array<IProductItem> = useSelector(selectCartItems);
  console.log(cartItems);
  const btnRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const onClose = () => dispatch(onCloseCartDrawerAction());
  const clearHandler = () => {
    dispatch(clearCart());
  };
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
            {cartItems.length ? (
              cartItems.map((item) => {
                // console.log(item);
                return <CartDrawerItem key={item.id} {...item} />;
              })
            ) : (
              <Text fontSize={"lg"}>Your Cart Is Empty, Add Items</Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={clearHandler}
              colorScheme="red"
            >
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default CartDrawer;
