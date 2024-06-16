import React from "react";

const PedidosTable = ({ pedidos }) => {
  if (!pedidos || pedidos.length === 0) {
    return <p>No se encontraron pedidos.</p>;
  }

  return (
    <div>
      <h2>Tabla de Pedidos</h2>
      <table className="w3-table w3-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Cliente</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.idCliente}</td>
              <td>{pedido.idProducto}</td>
              <td>{pedido.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PedidosTable;