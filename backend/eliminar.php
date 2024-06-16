<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $input = file_get_contents('php://input');

    $data = json_decode($input, true);

    if (isset($data['tabla']) && isset($data['id'])) {
        eliminarRegistro($data['tabla'], $data['id']);
    } else {
        echo json_encode(["success" => false, "message" => "Parámetros inválidos."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

function eliminarRegistro($tabla, $id) {
    $dbFile = 'testdb.db';

    try {
        $pdo = new PDO('sqlite:' . $dbFile);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = null;
        switch ($tabla) {
            case 'cliente':
                $stmt = $pdo->prepare("DELETE FROM cliente WHERE id = :id");
                break;
            case 'producto':
                $stmt = $pdo->prepare("DELETE FROM producto WHERE id = :id");
                break;
            case 'pedido':
                $stmt = $pdo->prepare("DELETE FROM pedido WHERE id = :id");
                break;
            case 'paqueteria':
                $stmt = $pdo->prepare("DELETE FROM paqueteria WHERE id = :id");
                break;
            default:
                echo json_encode(["success" => false, "message" => "Tipo de tabla no válido."]);
                return;
        }

        $stmt->execute([':id' => $id]);

        if ($stmt->rowCount() > 0) {
            echo json_encode(["success" => true, "message" => "Registro eliminado exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Registro no encontrado."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error al eliminar el registro: " . $e->getMessage()]);
    }
}
?>
