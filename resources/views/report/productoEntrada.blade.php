
<!DOCTYPE html>
<html lang="es-ES">
<head>
  <meta charset="utf-8">
  <title></title>
  <style type="text/css">
  body{
    font-family: Arial;
  }

  #main-container{
    margin: 20px auto;
 
  }

  table{
    background-color: white;
    text-align: left;
    border-collapse: collapse;
    width: 100%;
  }

  th, td{
    padding: 10px;
  }



  .flex-container {
    display: flex;
    justify-content: flex-start; 
  }

</style>
</head>
<body>
  <div id="main-container">
    <div class="flex-container" style="float:left">

      </div>
      <br><br>
      <table align="center"  width="100%">
        <thead>
          <tr align="center">
              <td colspan="" style="font-size: 120%; font-weight: bold;">ENTRADAS DE PRODUCTOS ({{$fechaInicio}} - {{$fechaFinal}})</strong></td>
          </tr>
        </thead>
      </table>   
      <br>


      <table align="center"  border="1" >
        <thead>
          
          <tr style="background-color: #2c52fc; color: rgb(255, 255, 255);font-weight: bold; font-size: 15px;" class='content' id="cabeza">
            <th style="font-size: 85%;" align="center">N°</th>
            <th style="font-size: 85%;" align="center">PRODUCTO</th>
            <th style="font-size: 85%;" align="center">CATEGORIA</th>
            <th style="font-size: 85%;" align="center">CANTIDAD ENTRADA</th>
            <th style="font-size: 85%;" align="center">FECHA ENTRADA</th>
            <th style="font-size: 85%;" align="center">COSTO UNITARIO</th>
            <th style="font-size: 85%;" align="center">COSTO TOTAL</th>
          </tr>
        </thead>  
        <tbody>
            @php($count=1)
            @foreach ($productoEntradas as  $value)
                <tr class='content'>
                    <td style="font-size: 80%;">{{$count++}}</td>
                    <td style="font-size: 80%;">{{$value->producto_nombre}}</td>
                    <td style="font-size: 80%;">{{$value->categoria}}</td>
                    <td style="font-size: 80%;">{{$value->cantidad}}</td>
                    <td style="font-size: 80%;">{{$value->fecha}}</td>
                    <td style="font-size: 80%;">{{$value->costoUnitario}}</td>
                    <td style="font-size: 80%;">{{$value->costoTotal}}</td>
                </tr>
                </tr>
                </tr>
            @endforeach
        </tbody>
      </table>
      <footer>
        <br>
        <span style="font-size: 12px;float: right;">Electronica: {{ date('Y-m-d')  }}</span><br>
      </footer>
    </body>
  </div>
</html>








































