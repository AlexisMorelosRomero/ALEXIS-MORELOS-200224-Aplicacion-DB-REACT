import React, { useState, useEffect } from "react";
import axios from 'axios';
import ClientesTable from "./Clientes";
import ProductosTable from "./Productos";
import PedidosTable from "./Pedidos";
import PaqueteriasTable from "./Paqueteria";

export const Altas = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    correo: "",
  });

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    talla: "",
    precio: 0,
    disponibilidad: false,
  });

  const [pedido, setPedido] = useState({
    id: "",
    idCliente: "",
    idProducto: "",
    cantidad: 0,
  });

  const [paqueteria, setPaqueteria] = useState({
    id: "",
    idPedido: "",
    direccion: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [paqueterias, setPaqueterias] = useState([]);

  useEffect(() => {
    const clientesData = localStorage.getItem("clientes");
    if (clientesData) {
      setClientes(JSON.parse(clientesData));
    }
    const productosData = localStorage.getItem("productos");
    if (productosData) {
      setProductos(JSON.parse(productosData));
    }
    const pedidosData = localStorage.getItem("pedidos");
    if (pedidosData) {
      setPedidos(JSON.parse(pedidosData));
    }
    const paqueteriasData = localStorage.getItem("paqueterias");
    if (paqueteriasData) {
      setPaqueterias(JSON.parse(paqueteriasData));
    }
  }, []);

  const guardarDatos = (key, data) => {
    //localStorage.setItem(key, JSON.stringify(data));
  };

  const handleClienteChange = (event) => {
    const { name, value } = event.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleProductoChange = (event) => {
    const { name, value } = event.target;
    setProducto({ ...producto, [name]: value });
  };

  const handlePedidoChange = (event) => {
    const { name, value } = event.target;
    setPedido({ ...pedido, [name]: value });
  };

  const handlePaqueteriaChange = (event) => {
    const { name, value } = event.target;
    setPaqueteria({ ...paqueteria, [name]: value });
  };

  const enviarDatosAlBackend = async (endpoint, datos) => {
    try {
      const res = await axios.post(endpoint, datos);
      return res.data;
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
      return { success: false, message: "Error al enviar datos al backend" };
    }
  };

  const handleSubmitCliente = async (event) => {
    event.preventDefault();
    const nuevoCliente = { ...cliente, id: Date.now().toString() };
    const nuevosClientes = [...clientes, nuevoCliente];
    setClientes(nuevosClientes);
    guardarDatos("clientes", nuevosClientes);
    setCliente({ nombre: "", direccion: "", telefono: "", correo: "" });
    setMensaje("Cliente agregado correctamente.");

    const resultado = await enviarDatosAlBackend("http://localhost:3000/backend/altaClientes.php", { cliente: nuevoCliente });
    if (resultado.success) {
      setMensaje("Cliente y datos almacenados correctamente en el servidor.");
    } else {
      setMensaje(resultado.message);
    }
  };

  const handleSubmitProducto = async (event) => {
    event.preventDefault();
    const nuevoProducto = { ...producto, id: Date.now().toString() };
    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    guardarDatos("productos", nuevosProductos);
    setProducto({ id: "", nombre: "", descripcion: "", talla: "", precio: 0, disponibilidad: false });
    setMensaje("Producto agregado correctamente.");

    const resultado = await enviarDatosAlBackend("http://localhost:3000/backend/altaClientes.php", { producto: nuevoProducto });
    if (resultado.success) {
      setMensaje("Producto y datos almacenados correctamente en el servidor.");
    } else {
      setMensaje(resultado.message);
    }
  };

  const handleSubmitPedido = async (event) => {
    event.preventDefault();
    const nuevoPedido = { ...pedido, id: Date.now().toString() };
    const nuevosPedidos = [...pedidos, nuevoPedido];
    setPedidos(nuevosPedidos);
    guardarDatos("pedidos", nuevosPedidos);
    setPedido({ idCliente: "", idProducto: "", cantidad: 0 });
    setMensaje("Pedido agregado correctamente.");

    const resultado = await enviarDatosAlBackend("http://localhost:3000/backend/altaClientes.php", { pedido: nuevoPedido });
    if (resultado.success) {
      setMensaje("Pedido y datos almacenados correctamente en el servidor.");
    } else {
      setMensaje(resultado.message);
    }
  };

  const handleSubmitPaqueteria = async (event) => {
    event.preventDefault();
    const nuevaPaqueteria = { ...paqueteria, id: Date.now().toString() };
    const nuevasPaqueterias = [...paqueterias, nuevaPaqueteria];
    setPaqueterias(nuevasPaqueterias);
    guardarDatos("paqueterias", nuevasPaqueterias);
    setPaqueteria({ idPedido: "", direccion: "" });
    setMensaje("Paquetería agregada correctamente.");

    const resultado = await enviarDatosAlBackend("http://localhost:3000/backend/altaClientes.php", { paqueteria: nuevaPaqueteria });
    if (resultado.success) {
      setMensaje("Paquetería y datos almacenados correctamente en el servidor.");
    } else {
      setMensaje(resultado.message);
    }
  };

  return (
    <div className="w3-container">
      {mensaje && <p>{mensaje}</p>}

      <form className="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin" onSubmit={handleSubmitCliente}>
        <h2 className="w3-text-teal">Agregar Cliente</h2>
        <p>
          <label className="w3-text-black">
            <b>Nombre del cliente</b>
          </label>
          <input
            name="nombre"
            type="text"
            value={cliente.nombre}
            onChange={handleClienteChange}
            className="w3-input w3-border w3-round-large"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Dirección</b>
          </label>
          <input
            name="direccion"
            type="text"
            value={cliente.direccion}
            onChange={handleClienteChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Teléfono</b>
          </label>
          <input
            name="telefono"
            type="text"
            value={cliente.telefono}
            onChange={handleClienteChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Correo electrónico</b>
          </label>
          <input
            name="correo"
            type="email"
            value={cliente.correo}
            onChange={handleClienteChange}
            className="w3-input w3-border"
          />
        </p>
        <button type="submit" className="w3-btn w3-black w3-margin-top">
          Agregar Cliente
        </button>
      </form>

      <form className="w3-container w3-card-4 w3-light-grey w3-text-green w3-margin" onSubmit={handleSubmitProducto}>
        <h2 className="w3-text-teal">Agregar Producto</h2>
        <p>
          <label className="w3-text-black">
            <b>Nombre del producto</b>
          </label>
          <input
            name="nombre"
            type="text"
            value={producto.nombre}
            onChange={handleProductoChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Descripción</b>
          </label>
          <input
            name="descripcion"
            type="text"
            value={producto.descripcion}
            onChange={handleProductoChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Talla</b>
          </label>
          <input
            name="talla"
            type="text"
            value={producto.talla}
            onChange={handleProductoChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Precio</b>
          </label>
          <input
            name="precio"
            type="number"
            value={producto.precio}
            onChange={handleProductoChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Disponibilidad</b>
          </label>
          <input
            name="disponibilidad"
            type="checkbox"
            checked={producto.disponibilidad}
            onChange={(e) => setProducto({ ...producto, disponibilidad: e.target.checked })}
            className="w3-check"
          />
        </p>
        <button type="submit" className="w3-btn w3-black w3-margin-top">
          Agregar Producto
        </button>
      </form>

      <form className="w3-container w3-card-4 w3-light-grey w3-text-red w3-margin" onSubmit={handleSubmitPedido}>
        <h2 className="w3-text-teal">Agregar Pedido</h2>
        <p>
          <label className="w3-text-black">
            <b>ID Cliente</b>
          </label>
          <input
            name="idCliente"
            type="text"
            value={pedido.idCliente}
            onChange={handlePedidoChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>ID Producto</b>
          </label>
          <input
            name="idProducto"
            type="text"
            value={pedido.idProducto}
            onChange={handlePedidoChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Cantidad</b>
          </label>
          <input
            name="cantidad"
            type="number"
            value={pedido.cantidad}
            onChange={handlePedidoChange}
            className="w3-input w3-border"
          />
        </p>
        <button type="submit" className="w3-btn w3-black w3-margin-top">
          Agregar Pedido
        </button>
      </form>

      <form className="w3-container w3-card-4 w3-light-grey w3-text-purple w3-margin" onSubmit={handleSubmitPaqueteria}>
        <h2 className="w3-text-teal">Agregar Paquetería</h2>
        <p>
          <label className="w3-text-black">
            <b>ID Pedido</b>
          </label>
          <input
            name="idPedido"
            type="text"
            value={paqueteria.idPedido}
            onChange={handlePaqueteriaChange}
            className="w3-input w3-border"
          />
        </p>
        <p>
          <label className="w3-text-black">
            <b>Dirección</b>
          </label>
          <input
            name="direccion"
            type="text"
            value={paqueteria.direccion}
            onChange={handlePaqueteriaChange}
            className="w3-input w3-border"
          />
        </p>
        <button type="submit" className="w3-btn w3-black w3-margin-top">
          Agregar Paquetería
        </button>
      </form>

      <ClientesTable clientes={clientes} />
      <ProductosTable productos={productos} />
      <PedidosTable pedidos={pedidos} />
      <PaqueteriasTable paqueterias={paqueterias} />
    </div>
  );
};
