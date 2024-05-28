
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
              <td colspan="" style="font-size: 120%; font-weight: bold;">VENTA DE PRODUCTOS ({{$fechaInicio}} - {{$fechaFinal}})</strong></td>
          </tr>
        </thead>
      </table>   
      <br>

      <table align="center"  border="1" >
        <thead>
          
          <tr style="background-color: #2c52fc; color: rgb(255, 255, 255);font-weight: bold; font-size: 15px;" class='content' id="cabeza">
            <th style="font-size: 85%;" align="center">N°</th>
            <th style="font-size: 85%;" align="center">CLIENTE</th>
            <th style="font-size: 85%;" align="center">PRODUCTOS - CANTIDAD - PRECIO - TOTAL</th>
            <th style="font-size: 85%;" align="center">TOTAL VENTA</th>
            <th style="font-size: 85%;" align="center">FECHA</th>
            <th style="font-size: 85%;" align="center">ESTADO</th>
          </tr>
        </thead>  
        <tbody>
            @php($count=1)
            @foreach ($ventas as  $value)
                <tr class='content'>
                    <td style="font-size: 80%;">{{$count++}}</td>
                    <td style="font-size: 80%;">{{$value->nombre}}  {{$value->apellidos}}</td>
                    <td style="font-size: 80%;font-size: 12px">
                      @foreach ($value->productos as  $value1)
                        <span style="font-size: 12px">{{$value1->nombreProducto}} - {{$value1->cantidad}} - {{$value1->precioUnitario}} - {{$value1->totalVenta}}</span><br>
                      @endforeach

                    </td>
                    <td style="font-size: 80%;">{{$value->totalVenta}}</td>
                    <td style="font-size: 80%;">{{$value->fecha}}</td>
                    <td style="font-size: 80%;font-size: 8px" align="center">  
                      @if($value->estadoVenta == 0)
                        ANULADO
                      @elseif($value->estadoVenta == 1)
                        VENTA
                      @else
                        PENDIENTE
                      @endif
                     
                    </td>
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




















































