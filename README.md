# Gestor de Productos - Sistema de Administración

¡Bienvenido al Gestor de Productos! Este sistema te permite administrar productos y ventas. Aquí encontrarás información esencial sobre el proyecto y cómo utilizar sus funciones.

## Funcionalidades

### Usuarios

- **Empleado:**
  - Loguearse para acceder al sistema.
  - Agregar, visualizar, editar y eliminar productos.

- **Supervisor:**
  - Además de las funciones del empleado, el supervisor puede:
    - Visualizar ventas.
    - Eliminar ventas.
    - Cambiar el estado de "no entregado" a "entregado" en una venta.
   
**Credenciales**

- **Empleado:**

  - Usuario: trabajador@tudominio.com Contraseña: 123456
- **Supervisor:**

  - Usuario: supervisor@tudominio.com Contraseña: 123456
## Agregar producto

Para agregar un producto, utiliza el siguiente formato:

```plaintext
ID: 45678P
Descripción: Ilumina tu espacio con la Lámpara inteligente SmartGlow Plus. Esta lámpara cuenta con control por
voz y la capacidad de cambiar de color, permitiéndote personalizar la iluminación según tu estado de ánimo o entorno.
Con funciones programables y ajustes de brillo, el SmartGlow Plus es ideal para cualquier espacio, desde la oficina
hasta el dormitorio. Agrega un toque moderno y funcional a tu iluminación con esta lámpara inteligente.
Imagen: https://res.cloudinary.com/dsj7qtcs0/image/upload/v1704299494/Baseus_Smart_LED_L%C3%A1mpara_de_escritorio_Eye_Protect_Estudio_Regulable_Luz_de_oficina_L%C3%A1mpara_de_mesa_plegable_Brillo_inteligente_adaptativo_L%C3%A1mpara_de_noche_para_leer_-_Gris_oscuro_r9hfie.jpg
Nombre: SmartGlow Plus
Precio en Dólares: 69
Precio en Soles: 251
Stock: 30
```
```plaintext
ID: 89012Z
Descripción: Mantén tus dispositivos móviles siempre cargados con la Batería externa PowerBoost XL. Esta batería de
gran capacidad proporciona carga rápida para smartphones, tabletas y otros dispositivos USB. Su diseño delgado y portátil
te permite llevarla a todas partes, brindándote energía adicional cuando más la necesitas. No te quedes sin batería en
movimiento con el PowerBoost XL.
Imagen: https://res.cloudinary.com/dsj7qtcs0/image/upload/v1704299061/Carregador_Portatil_Celular_10000mah_Bateria_Externa_Pineng_jkfz2q.jpg
Nombre: PowerBoost XL
Precio en Dólares: 49
Precio en Soles: 179
Stock: 35
```
```plaintext
ID: 23456C
Descripción: Desplázate con estilo y rendimiento con el UltraBook Zenith. Este portátil ultradelgado presenta una pantalla
táctil de alta resolución y un diseño elegante. Equipado con potentes especificaciones, el UltraBook Zenith ofrece un
rendimiento rápido y eficiente para satisfacer tus necesidades informáticas. Su batería de larga duración te permite trabajar
o disfrutar de entretenimiento durante todo el día. Eleva tu experiencia informática con la combinación perfecta de estilo y funcionalidad.
Imagen: https://res.cloudinary.com/dsj7qtcs0/image/upload/v1704299687/The_Best_Laptops_for_2024_rvzhah.jpg
Nombre: UltraBook Zenith
Precio en Dólares: 899
Precio en Soles: 3239
Stock: 20
```
```plaintext
ID: 78901D
Descripción: Simplifica la limpieza de tu hogar con el Robot aspirador CleanBot Genius. Este dispositivo inteligente utiliza
tecnología de mapeo para navegar eficientemente por tu hogar, asegurándose de no dejar ninguna área sin limpiar. Con su potente
succión y capacidad de programación, el CleanBot Genius se encarga de la limpieza diaria de forma autónoma. Además, su diseño
delgado le permite llegar a lugares de difícil acceso. Deja que la tecnología haga el trabajo pesado por ti.
Imagen: https://res.cloudinary.com/dsj7qtcs0/image/upload/v1704300081/Robot_aspirador_CECOTEC_cu%C3%A1l_elegir____ANOVO_care_vxiwzw.jpg
Nombre: CleanBot Genius
Precio en Dólares: 349
Precio en Soles: 1259
Stock: 40
```
```plaintext
ID: 34567E
Descripción: Lleva la música contigo a todas partes con los Altavoces Bluetooth AquaBeats 2000. Estos altavoces resistentes al
agua te permiten disfrutar de un sonido potente y claro en cualquier entorno. Con una batería de larga duración y conectividad
Bluetooth, los AquaBeats 2000 son ideales para fiestas al aire libre, actividades deportivas o simplemente relajarte en casa.
Además, su diseño robusto garantiza durabilidad y resistencia a salpicaduras. Sumérgete en la mejor experiencia auditiva.
Imagen: https://res.cloudinary.com/dsj7qtcs0/image/upload/v1704300249/solid_wood_speaker_%E6%9F%9A%E6%9C%A8_%E5%AF%A6%E6%9C%A8%E5%96%87%E5%8F%AD_%E5%AF%A6%E6%9C%A8%E9%9F%B3%E9%9F%BF_a1gp5k.jpg
Nombre: AquaBeats 2000
Precio en Dólares: 79
Precio en Soles: 287
Stock: 60
```
## Actualizar producto

Para actualizar un producto, ingresa un ID, recuerda que el ID debe constar de 5 números y una letra en mayuscula.

```plaintext
ID: 11223L
```
```plaintext
ID: 34567E
```
## Eliminar producto

Para eliminar un producto, ingresa un ID, recuerda que el ID debe constar de 5 números y una letra en mayuscula.

```plaintext
ID: 11223L
```
```plaintext
ID: 34567E
```
## Tecnologías

- React
- Firebase
  - Firebase Authentication
  - Firestore Database 
- Redux
- React Hook Form
