<?php
require_once 'configBD.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

ini_set('memory_limit', '10G');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        consultaDetalle($conn); // Asumiendo que deseas manejar esto con GET
        break;
    case 'POST':
        consultaDetalle($conn);
        break;
    default:
        echo "Method not defined";
        break;
}

function consultaDetalle($conn) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['nickname'])) {
        $nick = $data['nickname'];
        $sql = "SELECT rv.folio AS 'Numero del pedido',
                       rv.fechaSolicitud AS 'Fecha de reserva',
                       rv.subtotal AS 'Subtotal',
                       rv.iva AS 'IVA',
                       rv.costoTransporte AS 'Costo de transporte',
                       rv.total AS 'Total de la reserva'
                FROM reservas rv
                INNER JOIN clientes cli ON rv.cliente = cli.codigo
                INNER JOIN usuarios us ON cli.usuario = us.nickname
                WHERE us.nickname = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $nick);
        $stmt->execute();
        $result = $stmt->get_result();

        $reservas = array();
        while ($reserva = $result->fetch_assoc()) {
            $reservas[] = $reserva;
        }
        echo json_encode($reservas);
    } else {
        echo json_encode(array("error" => "Nickname not provided"));
    }
}
?>
