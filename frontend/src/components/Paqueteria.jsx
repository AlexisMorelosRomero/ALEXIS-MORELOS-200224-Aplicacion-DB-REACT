import React from "react";

const PaqueteriasTable = ({ paqueterias }) => {
  if (!paqueterias || paqueterias.length === 0) {
    return <p>No se encontraron paqueterías.</p>;
  }

  return (
    <div>
      <h2>Tabla de Paqueterías</h2>
      <table className="w3-table w3-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Pedido</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {paqueterias.map((paqueteria, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Se utiliza el índice + 1 como ID */}
              <td>{paqueteria.idPedido}</td>
              <td>{paqueteria.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaqueteriasTable;