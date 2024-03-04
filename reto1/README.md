# ST0263 - Tópicos Especiales de Telemática

## Estudiante
- **Nombre:** Hobarlan Uparela Arroyo
- **Correo:** huparelaa@eafit.edu.co

## Profesor
- **Nombre:** Edwin Nelson Montoya Munera
- **Correo:** emontoya@eafit.edu.co

## Reto 1 y 2 de Telemática

### 1. Breve Descripción de la Actividad
En este proyecto se abordaron los Retos 1 y 2 de Telemática, centrados en el desarrollo e implementación de un sistema de comunicación eficiente y seguro entre clientes y servidores (PClients y PServer) mediante el uso de gRPC para la comunicación entre pares y una API REST para la interacción con un servidor central. El objetivo principal fue establecer un mecanismo robusto para la carga y descarga de archivos, asegurando una comunicación efectiva entre los nodos de la red. Se buscó explorar y aplicar conceptos avanzados de telemática, incluyendo la gestión de redes, protocolos de comunicación y la implementación de servicios distribuidos, para resolver problemas prácticos relacionados con la transferencia de datos en entornos distribuidos.


### 1.1. Aspectos Cumplidos
- Se desarrolló el diagrama de arquitectura con comunicación gRPC entre PClients y PServer.
- Implementación de comunicación API REST entre PClientes y el servidor central así como también entre PServer's y el servidor central para tener control de archivos.
- Uso de patrón Singleton para manejar la configuración de IP's y puertos.

### 1.2. Aspectos No Cumplidos
- Si bien se logró usar docker para el despliegue del servidor central en una máquina virtual de AWS, no se logró el despliegue de los peers en AWS debido a limitaciones de tiempo, aunque se realizaron pruebas locales que evidencian un buen funcionamiento en entornos linux, por lo que se podría fácilmente llevar a producción.

### 2. Información General de Diseño de Alto Nivel y Arquitectura
Se planteó una comunicación entre peers utilizando gRPC para el envío y recepción de archivos dummy, y entre servidor y peer se definió una comunicación vía API REST.

![p2p](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/186c7180-9ea7-4ab1-8ac4-0391c2569450)

A nivel de buenas prácticas y patrones de diseño se implementó un singleton en el servidor central y en los PServers para el manejo de los archivos que tiene cada uno.

### 3. Ambiente de Desarrollo
#### PServer
- **Lenguaje de Programación:** JavaScript
- **Librerías y Paquetes:** NodeJS (Librerías incluidas en en el package.json)
- **Cómo Compilar y Ejecutar:**
    - Para correr el PServer sin incovenientes se recomienda tener una versión de NodeJS 20.0 o superior.
    - Luego se deben instalar las dependencias con ```npm install```.
    - Finalmente corremos el programa con el comando ```npm start```
#### PClient
- **Lenguaje de Programación:** Python
- **Librerías y Paquetes:** Se requiere Python 3.8 y las librerías listadas en `requirements.txt`.
- **Cómo Compilar y Ejecutar:**
    - Asegúrate de tener Python 3.8 o superior instalado en tu sistema.
    - Instala `grpcio-tools` para compilar archivos `.proto` a código Python ejecutando `pip install grpcio-tools`.
    - Instala otras dependencias ejecutando `pip install -r requirements.txt` en el directorio `PClient`.
    - Compila los archivos `.proto` ejecutando:
      ```
      python -m grpc_tools.protoc -I./protobufs --python_out=. --grpc_python_out=. ./protobufs/file_management.proto
      ```
      Asegúrate de que la ruta a los archivos `.proto` sea correcta.
    - Ejecuta el cliente con `python main.py`.

#### Servidor Central
- **Lenguaje de Programación:** JavaScript
- **Librerías y Paquetes:** NodeJS (Librerías incluidas en `package.json`)
- **Cómo Compilar y Ejecutar:**
    - Se recomienda tener una versión de NodeJS 20.0 o superior para ejecutar el Servidor Central sin problemas.
    - Instala las dependencias necesarias con `npm install`.
    - Inicia el servidor con `npm start`. El servidor estará escuchando en el puerto `8080` por defecto.

### 4. Ambiente de Ejecución
- **Lenguaje de Programación y Versiones:** Especificado en el punto anterior
- **IP o Nombres de Dominio:** Dirección del servidor central:`http://18.211.60.70:8080/`.
- **Configuración de Parámetros del Proyecto:**
  - En el archivo `config.json` se pueden cambiar los parámetros para el peer
  ```json
    {
    "IP_ADDRESS": "127.0.0.1",
    "PORT": "12345",
    "SERVER_CENTRAL_ADDRESS": "http://127.0.0.1:8080/",
    "PORT_GRPC": "50051"
    }
  ```
  Se recomienda solo cambiar los puertos debido a que al ser en un entorno de pruebas local el `IP_ADDRESSS` debería mantenerse igual, a no ser que se realice el despliegue en donde se debería cambiar ese archivo de configuración indicando la `IP` de la máquina virtual.
- **Guía de Uso:**
  - Se crearon dos nuevas carpetas de peers dummies para facilitar las pruebas del sistemas P2P.
    #### Servidor central
  - Se recomienda tener una versión de NodeJS 20.0 o superior para ejecutar el Servidor Central sin problemas.
  - Instala las dependencias necesarias con `npm install`.
  - Inicia el servidor con `npm start`. El servidor estará escuchando en el puerto `8080` por defecto.
    #### Peers
  - Ubicarse en la carpeta `example_peer1` (Todo este proceso se debe realizar también en la carpeta `example_peer2`)
    - Navegar hasta la carpeta `PServer` en donde instalaremos las dependencias con el comando `npm install` y correremos el programa con el comando `npm start`, de esta forma ya tendremos nuestro PServer corriendo en los puertos indicados en su respectivo `config.json`
    - Ahora navegamos hasta la carpeta `PClient` del peer en el que estamos (`example_peer1` por ejemplo) una vez aquí corremos el comando:
    ```py
    python -m grpc_tools.protoc -I./protobufs   --python_out=. --grpc_python_out=. ./protobufs/file_management.proto
    ```
    - Ahora corremos el archivo main con el comando `python main.py`
    - Recuerda que este proceso se debe realizar
  - **Guía visual:**
    - Servidor central corriendo en el puerto 8080
      
    ![image](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/ae6b39f1-1257-4c4a-9b27-d64e78caa9be)
    - Peer1 corriendo en los puertos `54321` y `50052`
    ![image](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/e93b5ff2-7b86-4a56-80b9-961d5e08a7f3)
    - Peer2 corriendo en los puertos `12345` y `50051`
    ![image](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/be88a5d8-024b-49a6-b884-bef6a28ea1e0)
    - Aquí vemos como el peer1 (Se puede ver en la ruta) envía el archivo prueba.txt al peer2 específicamente a su pserver. La primera imagen es el PClient 1. y la segunda es el PServer 2 que recibió el archivo:
    
    ![image](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/d9e53da9-cdee-4b27-b11d-e6d9f7b86498)
    ![image](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/1cbc6e3c-48bb-4b0e-84ec-9181eff606b6)
    
    Los otros archivos fueron una prueba que se realizó mediante Postman por eso no se aprecian en la consola del peer1. Ahora, estos son los logs del server central en donde se evidencian los archivos que tiene el PServer 2:

    ![image](https://github.com/huparelaa/huparelaa-st0263/assets/81880485/1dd4a9ac-8561-4cac-8d4c-ebac6b495a22)
    
    Si recordamos el puerto del peer1 era el 54321 el cual aparece vacío debido a que efectivamente los archivos se están cargando desde él y no se debe hacer upload a sí mismo






### Referencias
- [gRPC demo](https://github.com/raynux/grpc-demo)
- [gRPC basic tutorial](https://grpc.io/docs/languages/python/basics/)
