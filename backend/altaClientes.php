<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer el cuerpo de la solicitud
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (json_last_error() === JSON_ERROR_NONE) {
        almacenarDatos($data);
    } else {
        echo json_encode(["success" => false, "message" => "Error al decodificar el JSON: " . json_last_error_msg()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

function almacenarDatos($data) {
    // Especifica el nombre del archivo de la base de datos SQLite
    $dbFile = 'testdb.db';

    try {
        // Crea (o abre) la base de datos
        $pdo = new PDO('sqlite:' . $dbFile);
        
        // Establecer el modo de error en excepciones
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Identificar el tipo de datos y procesar en consecuencia
        if (isset($data['cliente'])) {
            $stmtCliente = $pdo->prepare("INSERT INTO cliente (nombre, direccion, telefono, correo) VALUES (:nombre, :direccion, :telefono, :correo)");
            $stmtCliente->execute([
                ':nombre' => $data['cliente']['nombre'],
                ':direccion' => $data['cliente']['direccion'],
                ':telefono' => $data['cliente']['telefono'],
                ':correo' => $data['cliente']['correo']
            ]);
            echo json_encode(["success" => true, "message" => "Cliente almacenado exitosamente."]);
        } elseif (isset($data['producto'])) {
            $stmtProducto = $pdo->prepare("INSERT INTO producto (id, nombre, descripcion, talla, precio, disponibilidad) VALUES (:id, :nombre, :descripcion, :talla, :precio, :disponibilidad)");
            $stmtProducto->execute([
                ':id' => $data['producto']['id'],
                ':nombre' => $data['producto']['nombre'],
                ':descripcion' => $data['producto']['descripcion'],
                ':talla' => $data['producto']['talla'],
                ':precio' => $data['producto']['precio'],
                ':disponibilidad' => $data['producto']['disponibilidad']
            ]);
            echo json_encode(["success" => true, "message" => "Producto almacenado exitosamente."]);
        } elseif (isset($data['pedido'])) {
            $stmtPedido = $pdo->prepare("INSERT INTO pedido (idCliente, idProducto, cantidad) VALUES (:idCliente, :idProducto, :cantidad)");
            $stmtPedido->execute([
                ':idCliente' => $data['pedido']['idCliente'],
                ':idProducto' => $data['pedido']['idProducto'],
                ':cantidad' => $data['pedido']['cantidad']
            ]);
            echo json_encode(["success" => true, "message" => "Pedido almacenado exitosamente."]);
        } elseif (isset($data['paqueteria'])) {
            $stmtPaqueteria = $pdo->prepare("INSERT INTO paqueteria (idPedido, direccion) VALUES (:idPedido, :direccion)");
            $stmtPaqueteria->execute([
                ':idPedido' => $data['paqueteria']['idPedido'],
                ':direccion' => $data['paqueteria']['direccion']
            ]);
            echo json_encode(["success" => true, "message" => "Paquetería almacenada exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Datos no reconocidos."]);
        }

    } catch (PDOException $e) {
        // Manejo de errores
        echo json_encode(["success" => false, "message" => "Error al almacenar los datos: " . $e->getMessage()]);
    }
}
?>
