<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "p24";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if(isset($data->correo) && isset($data->contrasena)) {
    $correo = $data->correo;
    $contrasena = $data->contrasena;

    $sql = "SELECT nickname, correo, contrasena FROM usuarios WHERE correo = '$correo'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($contrasena === $row["contrasena"]) {
            http_response_code(200);
            echo json_encode(array("mensaje" => "Inicio de sesión exitoso"));
        } else {
            http_response_code(401);
            echo json_encode(array("mensaje" => "Contraseña incorrecta"));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("mensaje" => "Usuario no encontrado"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("mensaje" => "Datos de solicitud incompletos"));
}

$conn->close();
?>
