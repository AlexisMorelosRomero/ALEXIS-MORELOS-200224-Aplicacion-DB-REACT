import React, { useState } from "react";
import axios from 'axios';
import ClientesTable from "./Clientes";
import ProductosTable from "./Productos";
import PedidosTable from "./Pedidos";
import PaqueteriasTable from "./Paqueteria";

export const Buscar = () => {
  const [clienteQuery, setClienteQuery] = useState("");
  const [productoQuery, setProductoQuery] = useState("");
  const [pedidoQuery, setPedidoQuery] = useState("");
  const [paqueteriaQuery, setPaqueteriaQuery] = useState("");
  const [result, setResult] = useState(null);
  const [queryType, setQueryType] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleClienteQueryChange = (event) => {
    setClienteQuery(event.target.value);
  };

  const handleProductoQueryChange = (event) => {
    setProductoQuery(event.target.value);
  };

  const handlePedidoQueryChange = (event) => {
    setPedidoQuery(event.target.value);
  };

  const handlePaqueteriaQueryChange = (event) => {
    setPaqueteriaQuery(event.target.value);
  };

  const handleClienteSubmit = async (event) => {
    event.preventDefault();
    const cliente = await buscarRegistro("cliente", clienteQuery);
    setQueryType("cliente");
    setResult(cliente);
  };

  const handleProductoSubmit = async (event) => {
    event.preventDefault();
    const producto = await buscarRegistro("producto", productoQuery);
    setQueryType("producto");
    setResult(producto);
  };

  const handlePedidoSubmit = async (event) => {
    event.preventDefault();
    const pedido = await buscarRegistro("pedido", pedidoQuery);
    setQueryType("pedido");
    setResult(pedido);
  };

  const handlePaqueteriaSubmit = async (event) => {
    event.preventDefault();
    const paqueteria = await buscarRegistro("paqueteria", paqueteriaQuery);
    setQueryType("paqueteria");
    setResult(paqueteria);
  };

  const buscarRegistro = async (tabla, id) => {
    try {
      const res = await axios.get(`http://localhost:3000/backend/buscar.php?tabla=${tabla}&id=${id}`);
      if (res.data.success) {
        setMensaje("");
        return res.data.data;
      } else {
        setMensaje(res.data.message);
        return null;
      }
    } catch (error) {
      setMensaje("Error al buscar registro: " + error.message);
      return null;
    }
  };

  return (
    <div className="w3-container">
      <h2>Buscar</h2>

      <form onSubmit={handleClienteSubmit} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Buscar Cliente</h3>
        <label htmlFor="clienteQuery" className="w3-label">ID del cliente:</label>
        <input
          id="clienteQuery"
          type="text"
          value={clienteQuery}
          onChange={handleClienteQueryChange}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Buscar</button>
      </form>

      <form onSubmit={handleProductoSubmit} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Buscar Producto</h3>
        <label htmlFor="productoQuery" className="w3-label">ID del producto:</label>
        <input
          id="productoQuery"
          type="text"
          value={productoQuery}
          onChange={handleProductoQueryChange}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Buscar</button>
      </form>

      <form onSubmit={handlePedidoSubmit} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Buscar Pedido</h3>
        <label htmlFor="pedidoQuery" className="w3-label">ID del pedido:</label>
        <input
          id="pedidoQuery"
          type="text"
          value={pedidoQuery}
          onChange={handlePedidoQueryChange}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Buscar</button>
      </form>

      <form onSubmit={handlePaqueteriaSubmit} className="w3-container w3-card-4 w3-light-grey w3-text-black w3-margin">
        <h3 className="w3-text-teal">Buscar Paquetería</h3>
        <label htmlFor="paqueteriaQuery" className="w3-label">ID de la paquetería:</label>
        <input
          id="paqueteriaQuery"
          type="text"
          value={paqueteriaQuery}
          onChange={handlePaqueteriaQueryChange}
          className="w3-input w3-border"
        />
        <button type="submit" className="w3-btn w3-black w3-margin-top">Buscar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      {result && (
        <div>
          {queryType === "cliente" && (
            <ClientesTable clientes={[result]} />
          )}
          {queryType === "producto" && (
            <ProductosTable productos={[result]} />
          )}
          {queryType === "pedido" && (
            <div>
              <h3>Pedido</h3>
              <table className="w3-table w3-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                    <th>ID Producto</th>
                    <th>Nombre Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.id}</td>
                    <td>{result.idCliente}</td>
                    <td>{result.cliente_nombre}</td>
                    <td>{result.idProducto}</td>
                    <td>{result.producto_nombre}</td>
                    <td>{result.cantidad}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {queryType === "paqueteria" && (
            <div>
              <h3>Paquetería</h3>
              <table className="w3-table w3-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ID Pedido</th>
                    <th>ID Cliente</th>
                    <th>Nombre Cliente</th>
                    <th>ID Producto</th>
                    <th>Nombre Producto</th>
                    <th>Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{result.id}</td>
                    <td>{result.idPedido}</td>
                    <td>{result.idCliente}</td>
                    <td>{result.cliente_nombre}</td>
                    <td>{result.idProducto}</td>
                    <td>{result.producto_nombre}</td>
                    <td>{result.direccion}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!result && mensaje && (
        <div>
          {queryType === "cliente" && <p>No se encontró el cliente.</p>}
          {queryType === "producto" && <p>No se encontró el producto.</p>}
          {queryType === "pedido" && <p>No se encontró el pedido.</p>}
          {queryType === "paqueteria" && <p>No se encontró la paquetería.</p>}
        </div>
      )}
    </div>
  );
};

export default Buscar;
