// import { Component } from "react";
import { ComponentType, FC } from "react";
import { Pizza } from "../data/menu-items";
import { MenuItemProps } from "./MenuItem";
import { useAppSelector } from "../store/hooks";
import { CartItem, selectItemQuantity } from "../store/cartSlice";

type WithQuantityProps = {
  item: Pizza;
};

const withQuantity = (Component: ComponentType<MenuItemProps>) => {
  const WithQuantityComponenst: FC<WithQuantityProps> = (props) => {
    const { item } = props;
    const quantity = useAppSelector(selectItemQuantity(item));
    const cartItem: CartItem = {
      ...item,
      quantity,
    };
    return <Component item={cartItem} />;
  };
  return WithQuantityComponenst;
};
export default withQuantity;
