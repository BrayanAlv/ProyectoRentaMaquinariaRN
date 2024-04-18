<?php
require_once 'configBD.php';
require_once './vendor/autoload.php'; // Asegúrate de que la ruta es correcta
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"));

if(isset($data->username) && isset($data->password)) {
    $correo = $data->username;
    $contrasena = $data->password;

    $sql = "SELECT nickname, correo, contrasena, tipo_Usu FROM usuarios WHERE nickname = ? or correo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $correo, $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($contrasena === $row["contrasena"]) {
            //id cl
            $dataset = mysqli_query($conn,"select codigo FROM clientes WHERE usuario = '".$row["nickname"]."';");
            while ($registro = mysqli_fetch_assoc($dataset)) {
                $clCod = $registro['codigo'];
            } 

            $secretKey = 'Baka123'; 
            $issuedAt = time();
            $expirationTime = $issuedAt + 3600;  // Token válido por 1 hora
            $payload = array(
                'usuario' => $row["nickname"],
                'correo' => $row["correo"],
                'type' => $row['tipo_Usu'],
                'iat' => $issuedAt,
                'exp' => $expirationTime
            );

            $jwt = JWT::encode($payload, $secretKey, 'HS256');
            http_response_code(200);
            echo json_encode(array("token" => $jwt,
                                    "idCl" =>$clCod,
                                    "nn" =>$row['nickname'],
                                    "email" => $correo,
                                    "type" => $row['tipo_Usu']));
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
