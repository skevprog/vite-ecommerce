import { Product } from "../../types";

interface ProductsProps {
  products: Product[];
  categoryName: string;
}

function Products({ products, categoryName }: ProductsProps): JSX.Element {
  return (
    <>
      <h2>{categoryName}</h2>
      {!products.length ? (
        <h3>Category empty</h3>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Available</th>
              <th>Quantity</th>
            </tr>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.available ? "Yes" : "No"}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Products;
