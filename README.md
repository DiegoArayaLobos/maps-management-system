# Sistema de Gestión de Mapas

https://maps-management-system.web.app/

User: admin@mms.com
Pass: Admin@1234

## Descripción

Sistema de creación de codigos QR para visualizar zonas turisticas a través de un mapa. Proyecto creado en ReactJS con Typescript, Styled-components, Google-map-react, Redux, Firebase y QRCode.React.

## Arquitectura de aplicación web.

### Carpeta contenedora de componentes: components.

Cada subcarpeta dentro de la carpeta raíz significa una sección dentro de la aplicación web. Estas carpetas divisoras de secciones tienen subcarpetas que son las carpetas contenedoras de cada componente. Las carpetas contenedoras de componentes por lo general tienen 3 archivo:

-   index.tsx // Archivo raíz para llamar por defecto al componente en la carpeta.
-   {nombre del componente}.tsx // Archivo del componente.
-   {nombre del componente}styled.tsx // Diseño en css-in-js del componente.

```
components 
├──auth 
│ └──Login 
├──QrList 
│ ├──Root 
│ ├──List 
│ ├──Search 
│ └──QrPreview 
├──QrProduction 
│ ├──Root 
│ ├──Map 
│ ├──Panel 
│ ├──MarkerModal 
│ ├──MarkerTypes 
│ ├──MarkerPreview 
│ └──MarkerConfirm 
├──MapView 
│ ├──Root 
│ ├──Map 
│ ├──MarkerTypes 
│ ├──MarkerPreview 
│ └──Navbar 
├──layout 
│ ├──Navbar 
│ ├──Modal 
│ ├──Input 
│ ├──Button 
│ ├──File 
│ ├──TextArea 
│ ├──Select 
│ └──Card 
├──route 
│ ├──Public 
│ └──Private 
╹
```

### Carpeta contenedora de la configuración de firebase: config.

```
config 
╹
```

### Carpeta contenedora de diseños generales en la aplicación web: design.

La carpeta raíz contiene dos subcarpetas:

-   config: carpeta encargada de tener las variables globales con los diseños.
-   core: carpeta contenedora de estilos globales.

```
design 
├──config 
├──core 
╹
```

### Carpeta contenedora de archivos de almacenamiento: store.

La carpeta raíz contiene 3 subcarpeta:

- actions: carpeta contenedora de funciones globales.
- reducers: carpeta contenedora de reducers en la app web.
- storage: carpeta contenedora de archivos con datos estaticos para la app web.

```
store 
├──actions 
├──reducers 
├──storage 
╹
```

### Carpeta contenedora de archivos iconos: svg.

```
svg
╹
```
