<?php
    //Header set Access-Control-Allow-Origin "http://localhost:8081"
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    ini_set('memory_limit', '10G');

    $host = "127.0.0.1";
    $user = "giovak";
    $password = "5445";
    $baseData = "p24";

    $conn = new mysqli($host, $user, $password, $baseData);

    if ($conn->connect_error) {
        die("Conexion no realizada" . $conn->connect_error);
    }

    header("Content-Type: application/json");

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            echo json_encode(array("data" => "Manda parametros mediante un post"));
            break;

        case 'POST':

            $precioDia = $_POST["precioDia"];
            $numSerie = $_POST["numSerie"];
            $imagen = $_POST["imagen"];
            $almacen = $_POST["almacen"];
            $modelo = $_POST["modelo"];

            $newMachine = array(
              "precioDia" => $precioDia,
              "numSerie" => $numSerie,
              "imagen" => $imagen,
              "almacen" => $almacen,
              "modelo" => $modelo,
              "estatusM" => "DISP"
            );

            addMachine($conn, $newMachine);

            break;

        case 'PUT':
            // Implement your PUT logic here
            echo "Edicion de registros - PUT";
            break;

        case 'DELETE':
            // Implement your DELETE logic here
            echo "Borrado de datos - DELETE";
            break;

        default:
            echo "Metodo no definido";
            break;
    }

    function addMachine($conn, $machine)
    {
      $sql = "INSERT INTO maquinas (precioDia, numSerie, imagen, almacen, modelo, estatusM, extraImagenes) VALUES (?, ?, ?, ?, ?, ?, ?)";

      $stmt = $conn->prepare($sql);
      $stmt->bind_param("isssiss", $machine["precioDia"], $machine["numSerie"], $machine["imagen"], $machine["almacen"], $machine["modelo"], $machine["estatusM"], $machine["extraImagenes"]);


      try {

         if ($stmt->execute() === TRUE) {
          $msg = array(
            "message" => "Maquina agregada correctamente"
          );

        } else {
          $msg = array(
            "message" => "Maquina no agregada."
          );
        } 
      } catch (Exception $e) {

        $msg = array(
        "message" => "Maquina no agregada. Por favor, verifique que los datos sean correctos.",
        "error" => $e->getMessage()
            );
      }
          echo json_encode($msg);
        
    }
?>
