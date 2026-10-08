const catalogoProductos = [
    // {
    //         nombre: 'Cigarros Shots Classics',
    //         descripcion: '25 Rojos',
    //         codigo: '75078843',
    //         categoria: '21',
    //         proveedor: '1',
    //         compra: '50',
    //         venta: '79',
    //         imagen: 'producto_3.jpeg'
    // },
    // {
    //         nombre: 'Coca-Cola',
    //         descripcion: '3 L',
    //         codigo: '7501055313532',
    //         categoria: '7',
    //         proveedor: '1',
    //         compra: '20',
    //         venta: '37.50',
    //         imagen: 'producto_2.jpeg'
    // },
    // {
    //     nombre: 'Papas Sabritas',
    //     descripcion: 'Sabor original 55 g',
    //     codigo: '7501011122004',
    //     categoria: '8',
    //     proveedor: '1',
    //     compra: '15',
    //     venta: '22',
    //     imagen: 'producto_4.jpeg'
    // },
    // {
    //     nombre: 'Galletas Oreo',
    //     descripcion: '132 g',
    //     codigo: '7501035912374',
    //     categoria: '8',
    //     proveedor: '1',
    //     compra: '18',
    //     venta: '28',
    //     imagen: 'producto_5.jpeg'
    // },
    // {
    //     nombre: 'Leche Lala',
    //     descripcion: 'Entera 1 L',
    //     codigo: '7501020512345',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '21',
    //     venta: '29',
    //     imagen: 'producto_6.jpeg'
    // },
    // {
    //     nombre: 'Pan Bimbo',
    //     descripcion: 'Blanco grande 500 g',
    //     codigo: '7501000104012',
    //     categoria: '8',
    //     proveedor: '1',
    //     compra: '28',
    //     venta: '38',
    //     imagen: 'producto_7.jpeg'
    // },
    // {
    //     nombre: 'Epura',
    //     descripcion: '1.5 L',
    //     codigo: '7501068510234',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '9',
    //     venta: '15',
    //     imagen: 'producto_8.jpeg'
    // },
    // {
    //     nombre: 'Arroz Morelos',
    //     descripcion: '1 kg',
    //     codigo: '7501105012348',
    //     categoria: '5',
    //     proveedor: '1',
    //     compra: '24',
    //     venta: '36',
    //     imagen: 'producto_9.jpeg'
    // },
    // {
    //     nombre: 'Atún Dolores',
    //     descripcion: 'En agua 140 g',
    //     codigo: '7501085102223',
    //     categoria: '5',
    //     proveedor: '1',
    //     compra: '17',
    //     venta: '25',
    //     imagen: 'producto_10.jpeg'
    // },
    // {
    //     nombre: 'Cochinita Pibil',
    //     descripcion: 'Empaquetada',
    //     codigo: '7501020712345',
    //     categoria: '5',
    //     proveedor: '1',
    //     compra: '48',
    //     venta: '70',
    //     imagen: 'producto_11.jpeg'
    // },
    // {
    //     nombre: 'Bonafont',
    //     descripcion: '1 L',
    //     codigo: '758104100422',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '8',
    //     venta: '13',
    //     imagen: 'producto_12.jpeg'
    // },
    // {
    //     nombre: 'Salchichas',
    //     descripcion: 'Pavo FUD',
    //     codigo: '8866737048637',
    //     categoria: '5',
    //     proveedor: '1',
    //     compra: '28',
    //     venta: '40',
    //     imagen: 'producto_13.jpeg'
    // },
    // {
    //     nombre: 'Alpura Vaquita',
    //     descripcion: 'Fresa 200 ml',
    //     codigo: '7501055915682',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '7',
    //     venta: '12',
    //     imagen: 'producto_14.jpeg'
    // },
    // {
    //     nombre: 'Alpura Vaquita',
    //     descripcion: 'Vainilla 200 ml',
    //     codigo: '7501055915705',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '7',
    //     venta: '12',
    //     imagen: 'producto_15.jpeg'
    // },
    // {
    //     nombre: 'Caguama Modelo',
    //     descripcion: 'Clara Mega 1 L',
    //     codigo: '7501064198519',
    //     categoria: '9',
    //     proveedor: '1',
    //     compra: '42',
    //     venta: '58',
    //     imagen: 'producto_16.jpeg'
    // },
    // {
    //     nombre: 'Fanta',
    //     descripcion: '2 L',
    //     codigo: '7501055303878',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '18',
    //     venta: '28',
    //     imagen: 'producto_17.jpeg'
    // },
    // {
    //     nombre: 'Electrolit',
    //     descripcion: 'Fresa Kiwi 625 ml',
    //     codigo: '7501125149221',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '22',
    //     venta: '34',
    //     imagen: 'producto_18.jpeg'
    // },
    // {
    //     nombre: 'Tang',
    //     descripcion: 'Melón',
    //     codigo: '7622210572684',
    //     categoria: '8',
    //     proveedor: '1',
    //     compra: '4',
    //     venta: '8',
    //     imagen: 'producto_19.jpeg'
    // },
    // {
    //     nombre: 'Tang',
    //     descripcion: 'Horchata',
    //     codigo: '7622210572288',
    //     categoria: '8',
    //     proveedor: '1',
    //     compra: '4',
    //     venta: '8',
    //     imagen: 'producto_20.jpeg'
    // },
    // {
    //     nombre: 'Electrolit',
    //     descripcion: 'Ponche de Frutas 625 ml',
    //     codigo: '7503046131224',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '22',
    //     venta: '34',
    //     imagen: 'producto_21.jpeg'
    // },
    // {
    //     nombre: 'Electrolit',
    //     descripcion: 'Mora Azul 625 ml',
    //     codigo: '7501125174797',
    //     categoria: '7',
    //     proveedor: '1',
    //     compra: '22',
    //     venta: '34',
    //     imagen: 'producto_22.jpeg'
    // },
    {
        nombre: 'Sidral Mundet',
        descripcion: '3 L',
        codigo: '7501055340422',
        categoria: '7',
        proveedor: '1',
        compra: '25',
        venta: '39',
        imagen: 'producto_23.jpeg'
    },
    {
        nombre: 'Pepsi',
        descripcion: '3 L',
        codigo: '7501031310098',
        categoria: '7',
        proveedor: '1',
        compra: '25',
        venta: '38',
        imagen: 'producto_24.jpeg'
    },
    {
        nombre: 'Laptop Dell',
        descripcion: 'Laptop de alto rendimiento con 16GB de RAM y SSD de 512GB',
        codigo: '7506884385',
        categoria: '18',
        proveedor: '1',
        compra: '1000',
        venta: '5000.00',
        imagen: 'producto_25.jpeg'
    },
    {
        nombre: 'Mouse Inalámbrico',
        descripcion: 'Mouse ergonómico con conectividad Bluetooth',
        codigo: '123456789014',
        categoria: '18',
        proveedor: '1',
        compra: '350',
        venta: '400.00',
        imagen: 'producto_26.jpeg'
    },
    {
        nombre: 'Monitor LG',
        descripcion: 'Monitor 4K de 27 pulgadas con tecnología IPS',
        codigo: '123456789015',
        categoria: '18',
        proveedor: '1',
        compra: '120',
        venta: '150.00',
        imagen: 'producto_27.jpeg'
    },
    {
        nombre: 'Silla Ergonómica',
        descripcion: 'Silla de oficina ergonómica con soporte lumbar ajustable',
        codigo: '123456789016',
        categoria: '8',
        proveedor: '1',
        compra: '250',
        venta: '300.00',
        imagen: 'producto_28.jpeg'
    },
    {
        nombre: 'Auriculares Sony',
        descripcion: 'Auriculares inalámbricos con cancelación de ruido',
        codigo: '123456789017',
        categoria: '2',
        proveedor: '1',
        compra: '200',
        venta: '250.00',
        imagen: 'producto_29.jpeg'
    },
    {
        nombre: 'Impresora Epson',
        descripcion: 'Impresora multifuncional con Wi-Fi integrado',
        codigo: '123456789018',
        categoria: '10',
        proveedor: '1',
        compra: '70',
        venta: '90.00',
        imagen: 'producto_30.jpeg'
    },
    {
        nombre: 'Disco Duro Externo',
        descripcion: 'Disco duro de 2TB con conexión USB 3.0',
        codigo: '123456789019',
        categoria: '18',
        proveedor: '1',
        compra: '60',
        venta: '75.00',
        imagen: 'producto_31.jpeg'
    },
    {
        nombre: 'Cámara Web Logitech',
        descripcion: 'Cámara web Full HD con micrófono integrado',
        codigo: '123456789020',
        categoria: '18',
        proveedor: '1',
        compra: '15',
        venta: '25.00',
        imagen: 'producto_32.jpeg'
    },
    {
        nombre: 'Cargador Universal',
        descripcion: 'Cargador universal compatible con múltiples dispositivos',
        codigo: '123456789021',
        categoria: '18',
        proveedor: '1',
        compra: '2.50',
        venta: '5.50',
        imagen: 'producto_33.jpeg'
    },
    {
        nombre: 'Dulce de Fresa',
        descripcion: '20g Dulces Karla',
        codigo: '75010628496',
        categoria: '3',
        proveedor: '1',
        compra: '4',
        venta: '7.00',
        imagen: 'producto_34.jpeg'
    },
    {
        nombre: 'Palillos',
        descripcion: 'Tarasquitos',
        codigo: '7503004327003',
        categoria: '8',
        proveedor: '1',
        compra: '2.50',
        venta: '5.50',
        imagen: 'producto_35.jpeg'
    },
    {
        nombre: 'Saladitas',
        descripcion: 'Gamesa 186 g',
        codigo: '7501000664221',
        categoria: '3',
        proveedor: '1',
        compra: '12.30',
        venta: '17.32',
        imagen: 'producto_36.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'Limón',
        codigo: '12',
        categoria: '6',
        proveedor: '1',
        compra: '12.03',
        venta: '20.32',
        imagen: 'producto_37.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'piña',
        codigo: '456217890',
        categoria: '6',
        proveedor: '1',
        compra: '4.5',
        venta: '7.00',
        imagen: 'producto_38.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'tamarindo',
        codigo: '14523639871',
        categoria: '6',
        proveedor: '1',
        compra: '4.50',
        venta: '7.00',
        imagen: 'producto_39.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'Fresa',
        codigo: '2155',
        categoria: '6',
        proveedor: '1',
        compra: '12.36',
        venta: '14.50',
        imagen: 'producto_40.jpeg'
    },
    {
        nombre: 'Queso',
        descripcion: 'Panela',
        codigo: '72546980',
        categoria: '1',
        proveedor: '1',
        compra: '150',
        venta: '200.00',
        imagen: 'producto_41.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'Coco',
        codigo: '5412336',
        categoria: '6',
        proveedor: '1',
        compra: '4',
        venta: '8',
        imagen: 'producto_42.jpeg'
    }

];

export default catalogoProductos;