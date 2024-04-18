<?php
include_once 'configBD.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $fechaInicial = $data['fechaInicial'];
    $fechaFinal = $data['fechaFinal'];
    $fechaEntrega = $data['fechaEntrega'];
    $costoTransporte = $data['costoTransporte'] ?? 677; 
    $descripcion = $data['descripcion'];
    $cliente = $data['cliente'];

    $nombre = $data['nombre'];
    $apPat = $data['apPat'];
    $apMat = $data['apMat'];
    $colonia = $data['colonia'];
    $calle = $data['calle'];
    $num = $data['num'];
    $cp = $data['cp'];

    $maquinarias = $data['maquinarias']; 

    $conn->begin_transaction();
    try {
        $stmt = $conn->prepare("INSERT INTO reservas (fechaInicial, fechaFinal, fechaEntrega, costoTransporte, descripcion, cliente) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssi", $fechaInicial, $fechaFinal, $fechaEntrega, $costoTransporte, $descripcion, $cliente);
        $stmt->execute();
        $reservaID = $conn->insert_id;

        $stmt = $conn->prepare("INSERT INTO entregas (nombre, apPat, apMat, colonia, calle, num, cp, reserva) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssi", $nombre, $apPat, $apMat, $colonia, $calle, $num, $cp, $reservaID);
        $stmt->execute();

        foreach ($maquinarias as $maq) {
            $stmt = $conn->prepare("INSERT INTO re_maq (reserva, maquina, cantDias) VALUES (?, ?, ?)");
            $stmt->bind_param("iii", $reservaID, $maq['id'], $maq['cantDias']);
            $stmt->execute();
        }

        $conn->commit();
        echo json_encode(['success' => 'Reserva y entrega registradas exitosamente, maquinaria asignada.']);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['error' => 'Error en la transacción: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>
