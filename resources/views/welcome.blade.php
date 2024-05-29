<!DOCTYPE html>
<html lang="zxx">

<meta http-equiv="content-type" content="text/html;charset=utf-8" /><!-- /Added by HTTrack -->

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>electronica</title>
    <meta name="description" content="">
    

    <link rel="stylesheet" href="{{asset('assets/panel/css/plugins.min.css')}}">
    <link rel="stylesheet" href="{{asset('assets/panel/css/style.css')}}">

  
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>

    <div id="wrapper" class="wrapper">
        <div class="tm-header tm-header-sticky">

            <div class="tm-header-middlearea bg-white">
                <div class="container">
                    <div class="tm-mobilenav"></div>
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-6 order-1 order-lg-1">
                            <a href="#" class="tm-header-logo">
                                <img src="{{ asset('assets/imagen/logoe.png') }}" alt="surose">
                            </a>
                        </div>
                        <div class="col-lg-6 col-12 order-3 order-lg-2">

                        </div>
                        <div class="col-lg-3 col-6 order-2 order-lg-3">
                            <ul class="tm-header-icons">
   
                                <li><a href="#"><i class="ion-bag"></i><span>0</span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tm-header-bottomarea bg-white">
                <div class="container">
                    <nav class="tm-header-nav">
                        <ul>
                            <li><a href="{{route('welcome')}}">Principal</a></li>
                            <li><a href="{{route('producto.ver')}}">Productos</a></li>
                            @if (Route::has('login'))
                                @auth
                                    <li><a href="{{ url('/home') }}">Ingresar</a></li>
                                @else
                                @endauth
                                <li><a href="{{ route('login') }}">Login</a></li>
                          
                            @endif
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="tm-heroslider-area bg-grey">
            <div class="tm-heroslider-slider">
                <div class="tm-heroslider" data-bgimage="assets/imagen/2.png">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-7 col-md-8 col-12">
                                <div class="tm-heroslider-contentwrapper">
                                    <div class="tm-heroslider-content">
                                        <h1>Martin Cooper</h1>
                                        <p>El transistor fue probablemente el invento más importante del siglo XX.</p>
                          -
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tm-heroslider" data-bgimage="assets/imagen/1.png">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-7 col-md-8 col-12">
                                <div class="tm-heroslider-contentwrapper">
                                    <div class="tm-heroslider-content">
                                        <h1>Marshall McLuhan</h1>
                                        <p>La era electrónica ha establecido una red global que ha reemplazado el individualismo con una conciencia de grupo masiva.</p>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <main class="page-content">
            <div class="tm-section tm-feature-area bg-grey">
                <div class="container">
                    <div class="row mt-30-reverse">
                        <div class="col-lg-4 mt-30">
                            <div class="tm-feature">
                                <span class="tm-feature-icon">
                                    <img 
                                        alt="mision" src="assets/imagen/icon-free-shipping.png"
                                       >
                                </span>
                                <div class="tm-feature-content">
                                    <h6>Mision</h6>
                                    <p>Proveer tecnología electrónica de calidad con excelente servicio.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mt-30">
                            <div class="tm-feature">
                                <span class="tm-feature-icon">
                                    <img 
                                        alt="Vision" src="assets/imagen/icon-fast-delivery.png"
                                       >
                                </span>
                                <div class="tm-feature-content">
                                    <h6>Vision</h6>
                                    <p>Liderar en innovación y servicio en tecnología electrónica.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 mt-30">
                            <div class="tm-feature">
                                <span class="tm-feature-icon">
                                    <img  alt="objetivo" src="assets/imagen/icon-247-support.png">
                                </span>
                                <div class="tm-feature-content">
                                    <h6>Objetivo</h6>
                                    <p>Satisfacer las necesidades tecnológicas con calidad y servicio.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="tm-latest-products-area" class="tm-section tm-latest-products-area tm-padding-section bg-white">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-12">
                            <div class="tm-sectiontitle text-center">
                                <h3>PRODUCTOS</h3>
                                <p>Nuestor productos por categoria</p>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-50-reverse">

                        @foreach($categorias as $value)
                            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mt-50">
                                <div class="tm-product tm-scrollanim">
                                    <div class="tm-product-topside">
                                        <div class="tm-product-images">
                                            <img alt="product imdssdsdsddsdage"
                                                src="{{asset('assets/imagen/producto.png')}}">
                                        </div>
                                        <ul class="tm-product-actions">
                                            <li><a href="{{route('producto.ver',$value->id)}}"><i class="ion-android-cart"></i> Ver Productos</a></li>
                                  
                                        </ul>
                                       
                                    </div>
                                    <div class="tm-product-bottomside">
                                        <h6 class="tm-product-title"><a href="#
                                            ">{{$value->categoria}}</a></h6>
                            
                                        <span class="tm-product-price">{{ strlen($value->descripcion) > 100 ? substr($value->descripcion, 0, 100) . '...' : $value->descripcion }}</span>
                                      
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="tm-product-loadmore text-center mt-50">
                        <a href="{{route('producto.ver')}}" class="tm-button">Todos los productos</a>
                    </div>
                </div>
            </div>



        </main>
        <div class="tm-footer">
            <ul id="instafeed" class="tm-instaphotos"></ul>
            <div class="tm-footer-toparea tm-padding-section">
                <div class="container">
                    <div class="widgets widgets-footer row">
                        


                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="single-widget widget-info">
                                <a class="widget-info-logo" href="#"><img src="assets/imagen/logoe.png"
                                        alt="logo"></a>
                                <p>Contactanos a nuestra direccion llallagua</p>
                                <ul>
                                    <li><b>Celular :</b>67552149</li>
                                  
                                </ul>
                            </div>
                        </div>

                        
                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="single-widget widget-quicklinks">
                              
                                
                            </div>
                        </div>
                   
                        <div class="col-lg-3 col-md-6 col-12">
                            <div class="single-widget widget-newsletter">
                                <h6 class="widget-title">Ubicacion</h6>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.957172627113!2d-66.58494546156916!3d-18.424169644840703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93fd20109ab8ff8d%3A0xeb442917f9fd9afc!2sLlallagua!5e1!3m2!1ses!2sbo!4v1716645829245!5m2!1ses!2sbo" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tm-footer-bottomarea">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-md-7">
                            <p class="tm-footer-copyright">©
                                2024.</p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        
        <button id="back-top-top"><i class="ion-arrow-up-c"></i></button>
    </div>
    <script type="text/javascript" data-pagespeed-no-defer>
        pagespeed.lazyLoadImages.overrideAttributeFunctions();
    </script>

    <script src="{{asset('assets/panel/js/plugins.min.js')}}" ></script>
    <script src="{{asset('assets/panel/js/main.js')}}" ></script>


</body>

</html>
