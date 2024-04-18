<?php
        //Header set Access-Control-Allow-Origin "http://localhost:8081"
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

    ini_set('memory_limit', '10G');

    $host = "127.0.0.1";
    $user = "root";
    $password = "";
    $baseData = "p24";
    $baseQuery = "select `maq`.`codigo` AS `codigo`,`maq`.`numSerie` AS `numSerie`,`maq`.`precioDia` AS `precioDia`,`maq`.`almacen` AS `almacen`,`maq`.`imagen` AS `imagen`,`maq`.`extraImagenes` AS `extraImagenes`,lcase(`mo`.`nombre`) AS `modelo`,lcase(`mar`.`nombre`) AS `marca`,`mo`.`descripcion` AS `descripcion`,`mo`.`anoFabricacion` AS `anio`,`mo`.`capacidadCarga` AS `capacidad`,lcase(`cat`.`nombre`) AS `categoria`,`cat`.`limiteCarga` AS `limite` from (((`p24`.`maquinas` `maq` join `p24`.`modelos` `mo` on(`maq`.`modelo` = `mo`.`num`)) join `p24`.`categorias` `cat` on(`mo`.`categoria` = `cat`.`codigo`)) join `p24`.`marcas` `mar` on(`mo`.`marca` = `mar`.`codigo`)) where `maq`.`estatusM` = 'DISP'";

    $conn = new mysqli($host, $user, $password, $baseData);

    if ($conn->connect_error) {
        die("Conexion no realizada" . $conn->connect_error);
    }

    header("Content-Type: application/json");


    if (isset($_GET['marca'])) {
      $input = $_GET['marca'];
      //$query = "select * from v_infoMaquinas where marca like '%" . $input . "%'";    
      $query = "select `maq`.`codigo` AS `codigo`,`maq`.`numSerie` AS `numSerie`,`maq`.`precioDia` AS `precioDia`,`maq`.`almacen` AS `almacen`,`maq`.`imagen` AS `imagen`,`maq`.`extraImagenes` AS `extraImagenes`,lcase(`mo`.`nombre`) AS `modelo`,lcase(`mar`.`nombre`) AS `marca`,`mo`.`descripcion` AS `descripcion`,`mo`.`anoFabricacion` AS `anio`,`mo`.`capacidadCarga` AS `capacidad`,lcase(`cat`.`nombre`) AS `categoria`,`cat`.`limiteCarga` AS `limite` from (((`p24`.`maquinas` `maq` join `p24`.`modelos` `mo` on(`maq`.`modelo` = `mo`.`num`)) join `p24`.`categorias` `cat` on(`mo`.`categoria` = `cat`.`codigo`)) join `p24`.`marcas` `mar` on(`mo`.`marca` = `mar`.`codigo`)) where `maq`.`estatusM` = 'DISP'";

    } elseif (isset($_GET['modelo'])) {
      $input = $_GET['modelo'];
      //$query = "select * from v_infoMaquinas where modelo like '%" . $input . "%'";
      $query = $baseQuery." and modelo like '%".$input."%'";

    } elseif (isset($_GET['categoria'])) {
      $input = $_GET['categoria'];
      //$query = "select * from v_infoMaquinas where categoria like '%" . $input . "%'";   
      $query = $baseQuery." and categoria like '%" . $input . "%'";

    } elseif (isset($_GET['menorCapacidad'])) {
      //$query =  "select * from v_infoMaquinas order by capacidad asc";
      $query = $baseQuery." order by capacidad asc";

    } elseif (isset($_GET['mayorCapacidad'])) {
      //$query =  "select * from v_infoMaquinas order by capacidad desc";
      $query = $baseQuery." order by capacidad desc";

    } elseif (isset($_GET['menorPrecio']) ) {
      //$query = "select * from v_infoMaquinas order by precioDia asc;";    
      $query = $baseQuery." order by precioDia asc";


    } elseif (isset($_GET['mayorPrecio'])) {
      //$query = "select * from v_infoMaquinas order by precioDia desc";    
      $query = $baseQuery." order by precioDia desc";

    }else {
      $query = $baseQuery;

    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            consultaSelect($conn, $query);
            break;

        case 'POST':
            // Implement your POST logic here
            echo "Consulta de registros - POST";
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

    function consultaSelect($conn, $query)
    {
        $sql = $query;
        $rs = $conn->query($sql);

        if (mysqli_num_rows($rs) > 0) {
          if ($rs) {
              $datos = array();
              while ($fila = $rs->fetch_assoc()) {
                  $datos[] = $fila;
              }
              echo json_encode($datos);
          }
        } else {
          $datos = array(
            "error" => "No hay datos disponibles."
          );
          echo json_encode($datos);
        }
        
    }
?>
