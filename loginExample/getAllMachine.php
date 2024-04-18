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
        consultaSelect($conn);
        break;
    case 'POST':
        consultaPorCodigo($conn);
        break;
    default:
        echo "Method not defined";
        break;
}


function consultaSelect($conn) {
    $sql = "SELECT * FROM v_infoMaquinas";
    $result = $conn->query($sql);

    $machines = array();
    while ($machine = $result->fetch_assoc()) {
        $machines[] = $machine;
    }
    echo json_encode($machines);
}

function consultaPorCodigo($conn) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['codigo'])) {
        $codigo = $data['codigo'];
        $sql = "SELECT * FROM v_infoMaquinas WHERE codigo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $codigo);
        $stmt->execute();
        $result = $stmt->get_result();

        $machines = array();
        while ($machine = $result->fetch_assoc()) {
            $machines[] = $machine;
        }
        echo json_encode($machines);
    } else {
        echo json_encode(array("error" => "Codigo not provided"));
    }
}
?>
