const catalogoProductos = [
    // {
    //     nombre: 'Cigarros Shots Classics',
    //     descripcion: '25',
    //     codigo: '75078843',
    //     categoria: '21',
    //     proveedor: '7',
    //     compra: '50',
    //     venta: '79',
    //     imagen: 'producto_3.jpeg'
    // },
    // {
    //     nombre: 'Coca-Cola',
    //     descripcion: '1.75 L',
    //     codigo: '7501055313532',
    //     categoria: '7',
    //     proveedor: '7',
    //     compra: '20',
    //     venta: '37.50',
    //     imagen: 'producto_2.jpeg'
    // },
    {
        nombre: 'Jamón',
        descripcion: 'Fud',
        codigo: '7501526',
        categoria: '5',
        proveedor: '7',
        compra: '35',
        venta: '50',
        imagen: 'producto_4.jpeg'
    },
    {
        nombre: 'Laptop Dell',
        descripcion: 'Laptop de alto rendimiento con 16GB de RAM y SSD de 512GB',
        codigo: '7506884385',
        categoria: '10',
        proveedor: '7',
        compra: '12000',
        venta: '15000',
        imagen: 'producto_5.jpeg'
    },
    {
        nombre: 'Mouse Inalámbrico',
        descripcion: 'Mouse ergonómico con conectividad Bluetooth',
        codigo: '123456789014',
        categoria: '10',
        proveedor: '7',
        compra: '150',
        venta: '250',
        imagen: 'producto_6.jpeg'
    },
    {
        nombre: 'Monitor LG',
        descripcion: 'Monitor 4K de 27 pulgadas con tecnología IPS',
        codigo: '123456789015',
        categoria: '10',
        proveedor: '7',
        compra: '5000',
        venta: '6500',
        imagen: 'producto_7.jpeg'
    },
    {
        nombre: 'Silla Ergonómica',
        descripcion: 'Silla de oficina ergonómica con soporte lumbar ajustable',
        codigo: '123456789016',
        categoria: '10',
        proveedor: '7',
        compra: '2500',
        venta: '3500',
        imagen: 'producto_8.jpeg'
    },
    {
        nombre: 'Auriculares Sony',
        descripcion: 'Auriculares inalámbricos con cancelación de ruido',
        codigo: '123456789017',
        categoria: '10',
        proveedor: '7',
        compra: '1500',
        venta: '2200',
        imagen: 'producto_9.jpeg'
    },
    {
        nombre: 'Impresora Epson',
        descripcion: 'Impresora multifuncional con Wi-Fi integrado',
        codigo: '123456789018',
        categoria: '10',
        proveedor: '7',
        compra: '3000',
        venta: '4200',
        imagen: 'producto_10.jpeg'
    },
    {
        nombre: 'Disco Duro Externo',
        descripcion: 'Disco duro de 2TB con conexión USB 3.0',
        codigo: '123456789019',
        categoria: '10',
        proveedor: '7',
        compra: '1200',
        venta: '1700',
        imagen: 'producto_11.jpeg'
    },
    {
        nombre: 'Cámara Web Logitech',
        descripcion: 'Cámara web Full HD con micrófono integrado',
        codigo: '123456789020',
        categoria: '10',
        proveedor: '7',
        compra: '700',
        venta: '1000',
        imagen: 'producto_12.jpeg'
    },
    {
        nombre: 'Cargador Universal',
        descripcion: 'Cargador universal compatible con múltiples dispositivos',
        codigo: '123456789021',
        categoria: '10',
        proveedor: '7',
        compra: '250',
        venta: '400',
        imagen: 'producto_13.jpeg'
    },
    {
        nombre: 'Dulce de Fresa',
        descripcion: '20g Dulces Karla',
        codigo: '75010628496',
        categoria: '8',
        proveedor: '7',
        compra: '5',
        venta: '10',
        imagen: 'producto_14.jpeg'
    },
    {
        nombre: 'Palillos',
        descripcion: 'Tarasquitos',
        codigo: '7503004327003',
        categoria: '8',
        proveedor: '7',
        compra: '8',
        venta: '15',
        imagen: 'producto_15.jpeg'
    },
    {
        nombre: 'Saladitas',
        descripcion: 'Gamesa 186 g',
        codigo: '7501000664221',
        categoria: '8',
        proveedor: '7',
        compra: '12',
        venta: '18',
        imagen: 'producto_16.jpeg'
    },
    {
        nombre: 'Dulce de Fresa',
        descripcion: '20g Dulces Karla',
        codigo: '1234567890',
        categoria: '8',
        proveedor: '7',
        compra: '5',
        venta: '10',
        imagen: 'producto_17.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'Limón',
        codigo: '12',
        categoria: '8',
        proveedor: '7',
        compra: '4',
        venta: '8',
        imagen: 'producto_18.jpeg'
    },
    {
        nombre: 'Dulce de Fresa',
        descripcion: '20g Dulces Karla',
        codigo: '76134',
        categoria: '8',
        proveedor: '7',
        compra: '5',
        venta: '10',
        imagen: 'producto_19.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'piña',
        codigo: '456217890',
        categoria: '8',
        proveedor: '7',
        compra: '4',
        venta: '8',
        imagen: 'producto_20.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'melón',
        codigo: '7622210572684',
        categoria: '8',
        proveedor: '7',
        compra: '4',
        venta: '8',
        imagen: 'producto_21.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'tamarindo',
        codigo: '14523639871',
        categoria: '8',
        proveedor: '7',
        compra: '4',
        venta: '8',
        imagen: 'producto_22.jpeg'
    },
    {
        nombre: 'Tang',
        descripcion: 'Fresa',
        codigo: '2155',
        categoria: '8',
        proveedor: '7',
        compra: '4',
        venta: '8',
        imagen: 'producto_23.jpeg'
    },
    {
        nombre: 'Dulce de Fresa',
        descripcion: 'Tarasquitos',
        codigo: '750688431',
        categoria: '8',
        proveedor: '7',
        compra: '5',
        venta: '10',
        imagen: 'producto_24.jpeg'
    }
];

export default catalogoProductos;
