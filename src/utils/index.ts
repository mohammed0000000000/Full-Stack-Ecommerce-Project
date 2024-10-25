import { createStandaloneToast } from '@chakra-ui/react';
import { IProductItem } from '../interfaces';

const { toast } = createStandaloneToast();

export const addItemToShoppingCart = (product: IProductItem, shoppingCartItems: Array<IProductItem>): Array<IProductItem> => {
  console.log(product);
  console.log(shoppingCartItems);
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
    title: "Add to your Cart",
    status: "success",
    duration: 2000,
    isClosable: true,
  })
  return [...shoppingCartItems, { ...product, quantity: 1 }]
}