<?php
// Especifica el nombre del archivo de la base de datos SQLite
$dbFile = 'testdb.db';

try {
    // Crea (o abre) la base de datos
    $pdo = new PDO('sqlite:' . $dbFile);
    
    // Establecer el modo de error en excepciones
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "Conexión establecida exitosamente.\n";

    // Crear tabla 'cliente'
    $pdo->exec("CREATE TABLE IF NOT EXISTS cliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        direccion TEXT NOT NULL,
        telefono TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE
    )");
    echo "Tabla 'cliente' creada exitosamente.\n";

    // Crear tabla 'producto'
    $pdo->exec("CREATE TABLE IF NOT EXISTS producto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        talla TEXT NOT NULL,
        precio REAL NOT NULL,
        disponibilidad BOOLEAN NOT NULL
    )");
    echo "Tabla 'producto' creada exitosamente.\n";

    // Crear tabla 'pedido'
    $pdo->exec("CREATE TABLE IF NOT EXISTS pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idCliente INTEGER NOT NULL,
        idProducto INTEGER NOT NULL,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY (idCliente) REFERENCES cliente(id),
        FOREIGN KEY (idProducto) REFERENCES producto(id)
    )");
    echo "Tabla 'pedido' creada exitosamente.\n";

    // Crear tabla 'paqueteria'
    $pdo->exec("CREATE TABLE IF NOT EXISTS paqueteria (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        idPedido INTEGER NOT NULL,
        direccion TEXT NOT NULL,
        FOREIGN KEY (idPedido) REFERENCES pedido(id)
    )");
    echo "Tabla 'paqueteria' creada exitosamente.\n";

} catch (PDOException $e) {
    // Manejo de errores
    echo "Error en la conexión: " . $e->getMessage();
}
?>
