import { CartItems } from "../Products";

interface CartProps {
  items: CartItems;
}

function Cart({ items }: CartProps): JSX.Element {
  return (
    <ul>
      {Object.keys(items).map((item) => (
        <li key={item}>
          {item}: {items[item].quantity}
        </li>
      ))}
    </ul>
  );
}

export default Cart;
