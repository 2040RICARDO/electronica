<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table  align="center"  border="0" width="100%" style="border-collapse:collapse;">
        <tr>
            <td style="text-align: center;">REGISTRO DE VENTA</td>
        </tr> <br>

    </table>


    <table align="center"  border="1" width="100%" style="border-collapse:collapse;">
        <tr>
            <td style="font-size: 12px;height: 38px;"> <strong>FECHA DE VENTA</strong>  <br/>{{$venta->fecha}}</td>
            <td colspan="3" style="font-size: 12px;border-bottom:white 0px solid;"> <strong>COD. VENTA</strong><br>{{$venta->codigoVenta}} </td>

        </tr>
        <tr>
            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>CLIENTE</strong><br/>{{$venta->nombre}} {{$venta->apellidos}}</td>

            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>CI</strong><br/> {{$venta->ci}}</td>
      
        </tr>
        <tr>
            <td colspan="4" style="height: 30px;font-size: 12px;">PRODUCTOS</td>
        </tr>
        @foreach($venta->productos as $value)
            <tr>
                <td style="font-size: 12px;height: 38px;"> <strong>Producto</strong>  <br/>{{$value['nombreProducto']}} </td>
                <td style="font-size: 12px;"><strong>Cantidad</strong>  <br/>{{$value['cantidad']}}</td>
                <td style="font-size: 12px;"><strong>Precio Unid.</strong> <br/>{{$value['precioUnitario']}} Bs</td>
                <td style="font-size: 12px;"><strong>Total</strong>  <br/>{{$value['totalProductoVenta']}} Bs</td>
            </tr>
        @endforeach
        <tr>
            <td colspan="2" style="font-size: 12px;height: 38px;"><strong></strong><br/></td>
            <td colspan="2" style="font-size: 12px;height: 38px;text-align: right;"><strong>TOTAL VENTA</strong><br/> {{$venta->totalVenta}} Bs</td>
        </tr>
    </table>
    <br>
    <br>

    <table  align="center"  border="0" width="100%" style="border-collapse:collapse;">
        <tr>
            <tr>
                <td style="width: 320px;color: white">dsd</td>
                <td style="text-align: center;">
                    <p>...............................</p> 
                    <p style="font-size: 11px;">{{$venta->nombre}} {{$venta->apellidos}}</p>
                    <p style="font-size: 11px;">CI: {{$venta->ci}} </p>
                </td>
            </tr>
        </tr>
    </table>
</body>
</html>