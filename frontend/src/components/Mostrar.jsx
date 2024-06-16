import React, { useState, useEffect } from "react";
import axios from 'axios';

const ProductosTable = ({ productos }) => (
  <table className="w3-table w3-bordered">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Talla</th>
        <th>Precio</th>
        <th>Disponibilidad</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto) => (
        <tr key={producto.id}>
          <td>{producto.id}</td>
          <td>{producto.nombre}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.talla}</td>
          <td>{producto.precio}</td>
          <td>{producto.disponibilidad ? "Sí" : "No"}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ClientesTable = ({ clientes }) => (
  <table className="w3-table w3-bordered">
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
      {clientes.map((cliente) => (
        <tr key={cliente.id}>
          <td>{cliente.id}</td>
          <td>{cliente.nombre}</td>
          <td>{cliente.direccion}</td>
          <td>{cliente.telefono}</td>
          <td>{cliente.correo}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const PedidosTable = ({ pedidos }) => (
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
);

const PaqueteriasTable = ({ paqueterias }) => (
  <table className="w3-table w3-bordered">
    <thead>
      <tr>
        <th>ID</th>
        <th>ID Pedido</th>
        <th>Dirección</th>
      </tr>
    </thead>
    <tbody>
      {paqueterias.map((paqueteria) => (
        <tr key={paqueteria.id}>
          <td>{paqueteria.id}</td>
          <td>{paqueteria.idPedido}</td>
          <td>{paqueteria.direccion}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const Mostrar = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [paqueterias, setPaqueterias] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/backend/mostrar.php");
        if (res.data.success) {
          setClientes(res.data.clientes);
          setProductos(res.data.productos);
          setPedidos(res.data.pedidos);
          setPaqueterias(res.data.paqueterias);
        } else {
          setMensaje(res.data.message);
        }
      } catch (error) {
        setMensaje("Error al obtener datos del servidor: " + error.message);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div>
      <div className="w3-container w3-margin">
        <h2 className="w3-text-black">Clientes</h2>
        <ClientesTable clientes={clientes} />
      </div>
      <div className="w3-container w3-margin">
        <h2 className="w3-text-black">Productos</h2>
        <ProductosTable productos={productos} />
      </div>
      <div className="w3-container w3-margin">
        <h2 className="w3-text-black">Pedidos</h2>
        <PedidosTable pedidos={pedidos} />
      </div>
      <div className="w3-container w3-margin">
        <h2 className="w3-text-black">Paqueterías</h2>
        <PaqueteriasTable paqueterias={paqueterias} />
      </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Mostrar;
