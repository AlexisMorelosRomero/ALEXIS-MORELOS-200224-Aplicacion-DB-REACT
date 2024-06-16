import React from "react";

const ClientesTable = ({ clientes }) => {
  return (
    <div>
      <h2>Tabla de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Se utiliza el índice + 1 como ID */}
              <td>{cliente.nombre}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesTable;