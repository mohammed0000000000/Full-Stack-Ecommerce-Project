import { createStandaloneToast } from '@chakra-ui/react';
import { IProductItem } from '../interfaces';

const { toast } = createStandaloneToast();

export const addItemToShoppingCart = (product: IProductItem, shoppingCartItems: Array<IProductItem>): Array<IProductItem> => {
  const existsItem = shoppingCartItems.find(item => item.id == product.id);
  if (existsItem) {
    toast({
      title: "Add to your Cart",
      description: "This item already exists, the quantity will be increased",
      status: "success",
      duration: 2000,
      isClosable: true,
    })
    return shoppingCartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
  }
  toast({
    title: `Add ${product.title} to your Cart`,
    status: "success",
    duration: 2000,
    isClosable: true,
  })
  return [...shoppingCartItems, { ...product, quantity: 1 }]
}
export const removeItemFromShoppingCart = (product: IProductItem, shoppingCartItems: Array<IProductItem>): Array<IProductItem> => {
  toast({
    title: `Removed ${product.title} From your Cart`,
    status: "success",
    duration: 2000,
    isClosable: true,
  })
  return shoppingCartItems.filter(item => item.id !== product.id);
}
export const decreaseQuantityItemFromShoppingCart = (product: IProductItem, shoppingCartItems: Array<IProductItem>): Array<IProductItem> => {
  const item = shoppingCartItems.find(item => item.id == product.id);
  if (item?.quantity == 1) {
    toast({
      title: `Removed ${product.title} From your Cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    })
    return shoppingCartItems.filter(item => item.id !== product.id);
  }
  else {
    toast({
      title: `Decreased Quantity of ${product.title} in your Cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    })
    return shoppingCartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);
  }
}
export const clearShoppingCartItems = (shoppingCartItems: Array<IProductItem>): Array<IProductItem> => {
  toast({
    title: `Clear YourCart`,
    status: "success",
    duration: 2000,
    isClosable: true,
  })
  shoppingCartItems.length = 0;
  return shoppingCartItems;
}