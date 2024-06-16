import React, { useState } from "react";
import axios from 'axios';

export const Eliminar = () => {
  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [pedidoId, setPedidoId] = useState("");
  const [paqueteriaId, setPaqueteriaId] = useState("");
  const [message, setMessage] = useState("");

  const handleIdChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const eliminarRegistro = async (tabla, id) => {
    try {
      const res = await axios({
        method: 'delete',
        url: 'http://localhost:3000/backend/eliminar.php',
        data: {
          tabla,
          id
        }
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Error al eliminar el registro: " + error.message);
    }
  };

  const handleSubmit = (tabla, idSetter, id) => async (event) => {
    event.preventDefault();
    await eliminarRegistro(tabla, id);
    idSetter("");
  };

  return (
    <div className="w3-container">
      <h2>Eliminación de Registros</h2>

      <form onSubmit={handleSubmit("cliente", setClienteId, clienteId)} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Eliminar Cliente</h3>
        <label htmlFor="clienteId" className="w3-label">ID del cliente:</label>
        <input
          id="clienteId"
          type="text"
          value={clienteId}
          onChange={handleIdChange(setClienteId)}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Eliminar</button>
      </form>

      <form onSubmit={handleSubmit("producto", setProductoId, productoId)} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Eliminar Producto</h3>
        <label htmlFor="productoId" className="w3-label">ID del producto:</label>
        <input
          id="productoId"
          type="text"
          value={productoId}
          onChange={handleIdChange(setProductoId)}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Eliminar</button>
      </form>

      <form onSubmit={handleSubmit("pedido", setPedidoId, pedidoId)} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Eliminar Pedido</h3>
        <label htmlFor="pedidoId" className="w3-label">ID del pedido:</label>
        <input
          id="pedidoId"
          type="text"
          value={pedidoId}
          onChange={handleIdChange(setPedidoId)}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Eliminar</button>
      </form>

      <form onSubmit={handleSubmit("paqueteria", setPaqueteriaId, paqueteriaId)} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Eliminar Paquetería</h3>
        <label htmlFor="paqueteriaId" className="w3-label">ID de la paquetería:</label>
        <input
          id="paqueteriaId"
          type="text"
          value={paqueteriaId}
          onChange={handleIdChange(setPaqueteriaId)}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Eliminar</button>
      </form>

      {message && <p className="w3-panel w3-pale-yellow w3-leftbar w3-border-yellow w3-margin-top">{message}</p>}
    </div>
  );
};

export default Eliminar;
