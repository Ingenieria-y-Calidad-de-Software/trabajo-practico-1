# Trabajo Práctico Número 1 - DeliverEat

## User story: `Realizar Pedido de “lo que sea”`

*Como* `Solicitante`

*quiero* `realizar un Pedido de “lo que sea”`

*para* `recibir algo en mi domicilio que no está disponible en los comercios adheridos`

### Criterios de Aceptación:
- Se debe indicar qué es lo que debe buscar el Cadete con un campo de texto
- Se puede adjuntar opcionalmente una foto en formato JPG con un tamaño máximo de 5 MB.
- Se debe indicar la dirección del comercio en forma textual (calle, número, ciudad y referencia opcional en formato de texto)
- Se debe indicar la dirección de entrega (calle, número, ciudad y referencia opcional en formato de texto).
- Se debe poder seleccionar la ciudad de un listado de ciudades disponibles.
- Se debe poder visualizar el total a pagar, en función de la distancia y/o del costo del producto, antes de elegir la forma de pago.
- Se debe seleccionar la forma de pago: Efectivo o Tarjeta de Débito/Crédito.
- Si paga en efectivo debe indicar el monto con el que va a pagar.
- Si paga con tarjeta debe ingresar el número de la tarjeta, nombre y apellido del Titular, fecha de vencimiento (MM/AAAA) y CVC.
- Debe ingresar cuando quiere recibirlo: “Lo antes posible” o una fecha/hora de recepción.

### Pruebas de Usuario
- Probar realizar un Pedido de “lo que sea” en efectivo “lo antes posible” (pasa)
- Probar realizar un Pedido de “lo que sea” con tarjeta “lo antes posible” (pasa)
- Probar realizar un Pedido de “lo que sea” programando la fecha/hora de entrega (pasa)
- Probar realizar un Pedido de “lo que sea” con una tarjeta inválida (falla)
- Probar realizar un Pedido de “lo que sea” con una tarjeta de crédito MasterCard (pasa)
- Probar realizar un Pedido de “lo que sea” en efectivo sin indicar el monto a pagar (falla)
- Probar realizar un Pedido de “lo que sea” programando una fecha/hora de entrega no válida (falla)
- Probar realizar un Pedido de “lo que sea” sin especificar qué buscar (falla)
- Probar realizar un Pedido de “lo que sea” adjuntando una foto (pasa)
- Probar realizar un Pedido de “lo que sea” sin indicar la dirección del comercio (falla)

## Tecnologías utilizadas

Este proyecto fue creado con [Create React App](https://create-react-app.dev/).

### Correr la aplicación

Abrir la consola/terminal y ejecutar el siguiente comando en la carpeta del proyecto:

```
npm start
```

Corre la aplicación en modo desarrollador.
Abrir [http://localhost:3000](http://localhost:3000) para ver la app en el navegador.

La página se refresca al realizar cambios.
Algunos errores y warnings aparecerán en la consola/terminal.
