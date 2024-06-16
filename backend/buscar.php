<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['tabla']) && isset($_GET['id'])) {
        buscarRegistro($_GET['tabla'], $_GET['id']);
    } else {
        echo json_encode(["success" => false, "message" => "Parámetros inválidos."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

function buscarRegistro($tabla, $id) {
    $dbFile = 'testdb.db';

    try {
        $pdo = new PDO('sqlite:' . $dbFile);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = null;
        switch ($tabla) {
            case 'cliente':
                $stmt = $pdo->prepare("SELECT * FROM cliente WHERE id = :id");
                break;
            case 'producto':
                $stmt = $pdo->prepare("SELECT * FROM producto WHERE id = :id");
                break;
            case 'pedido':
                $stmt = $pdo->prepare("
                    SELECT pedido.*, cliente.nombre AS cliente_nombre, producto.nombre AS producto_nombre
                    FROM pedido
                    INNER JOIN cliente ON pedido.idCliente = cliente.id
                    INNER JOIN producto ON pedido.idProducto = producto.id
                    WHERE pedido.id = :id
                ");
                break;
            case 'paqueteria':
                $stmt = $pdo->prepare("
                    SELECT paqueteria.*, pedido.idCliente, pedido.idProducto, cliente.nombre AS cliente_nombre, producto.nombre AS producto_nombre
                    FROM paqueteria
                    INNER JOIN pedido ON paqueteria.idPedido = pedido.id
                    INNER JOIN cliente ON pedido.idCliente = cliente.id
                    INNER JOIN producto ON pedido.idProducto = producto.id
                    WHERE paqueteria.id = :id
                ");
                break;
            default:
                echo json_encode(["success" => false, "message" => "Tipo de tabla no válido."]);
                return;
        }

        $stmt->execute([':id' => $id]);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado) {
            echo json_encode(["success" => true, "data" => $resultado]);
        } else {
            echo json_encode(["success" => false, "message" => "Registro no encontrado."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error al buscar el registro: " . $e->getMessage()]);
    }
}
?>
