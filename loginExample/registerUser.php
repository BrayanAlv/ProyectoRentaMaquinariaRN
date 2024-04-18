

<?php
include_once 'configBD.php';

// Allow CORS and pre-flight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
    exit();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Handling the POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    $usuario = $data["nombreDeUsuario"];
    $correo = $data["correoElectronico"];
    $contrasena = $data["password"];
    $confContrasena = $data["password"];
    $nombre = $data["nombre"];
    $apPat = $data["apellidoPaterno"];
    $apMat = $data["apellidoMaterno"];
    $numTel = $data["numeroDeTelefono"];

    if ($contrasena !== $confContrasena) {
        echo json_encode(['error' => 'La contraseña y la confirmación no son iguales.']);
        exit();
    }

    $conn->begin_transaction();
    try {
        $stmt = $conn->prepare("SELECT * FROM usuarios WHERE nickname = ? OR correo = ?");
        $stmt->bind_param("ss", $usuario, $correo);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode(['error' => 'Ya existe una cuenta con este usuario, correo electrónico o número de teléfono.']);
            $conn->rollback();
            exit();
        }

        $stmt = $conn->prepare("INSERT INTO usuarios (nickname, correo, contrasena, tipo_Usu) VALUES (?, ?, ?, 'CLI')");
        $stmt->bind_param("sss", $usuario, $correo, $contrasena);
        $stmt->execute();

        $stmt = $conn->prepare("INSERT INTO clientes (nombre, apPat, apMat, numTel, colonia, calle, num, cp, usuario) VALUES (?, ?, ?, ?, 'ejemploColonia', 'ejemploCalle', '12345', '12345', ?)");
        $stmt->bind_param("sssss", $nombre, $apPat, $apMat, $numTel, $usuario);
        $stmt->execute();

        $conn->commit();
        echo json_encode(['success' => 'Usuario registrado exitosamente.']);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['error' => 'Error en la transacción: ' . $e->getMessage()]);
    }
}
?>

