<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    obtenerDatos();
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

function obtenerDatos() {
    // Especifica el nombre del archivo de la base de datos SQLite
    $dbFile = 'testdb.db';

    try {
        // Crea (o abre) la base de datos
        $pdo = new PDO('sqlite:' . $dbFile);
        
        // Establecer el modo de error en excepciones
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Consultar datos de todas las tablas
        $clientes = $pdo->query("SELECT * FROM cliente")->fetchAll(PDO::FETCH_ASSOC);
        $productos = $pdo->query("SELECT * FROM producto")->fetchAll(PDO::FETCH_ASSOC);
        $pedidos = $pdo->query("SELECT * FROM pedido")->fetchAll(PDO::FETCH_ASSOC);
        $paqueterias = $pdo->query("SELECT * FROM paqueteria")->fetchAll(PDO::FETCH_ASSOC);

        // Devolver los datos en formato JSON
        echo json_encode([
            "success" => true,
            "clientes" => $clientes,
            "productos" => $productos,
            "pedidos" => $pedidos,
            "paqueterias" => $paqueterias
        ]);

    } catch (PDOException $e) {
        // Manejo de errores
        echo json_encode(["success" => false, "message" => "Error al obtener los datos: " . $e->getMessage()]);
    }
}
?>
