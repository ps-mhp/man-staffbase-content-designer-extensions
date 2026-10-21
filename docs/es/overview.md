# Extensiones para diseñadores de contenido

Esta extensión complementa la caja de selección de formato en Content Designer de Studio
de los elementos **Título** y **Texto** alrededor de la **Escala de Errores de Ortografía HOMBRE** con 13 niveles — 
de "Display 2XL · 72" a "Body XS · 12“. No estás añadiendo un bloque de construcción
de la página: Puedes seleccionar el nivel directamente desde el título o el párrafo de texto, así como
anteriormente "Encabezado 2" o "Párrafo". 

| Nivel | Tamaño | Elemento |
| --- | --- | --- |
| Pantalla 2XL | 72 px | Título |
| Pantalla XL | 64 px | Título |
| Pantalla L | 56 px | Título |
| Pantalla M | 48 px | Título |
| Pantalla S | 40 px | Título |
| H1 | 32 px | Título |
| H2 | 28 px | Texto |
| H3 | 24 px | Texto |
| H4 | 20 px | Texto |
| Cuerpo L | 18 px | Texto |
| Cuerpo M | 16 px | Texto |
| Cuerpo S | 14 px | Texto |
| Cuerpo XS | 12 px | Texto |

La estructura de la página permanece sin cambios: un título es siempre el
El título principal de la página, de H2 a H4, son subtítulos, niveles de cuerpo
son tacones. Los niveles de la pantalla solo cambian el tamaño. 

## Alineación vertical en columnas de contenedor

Si hay columnas de diferentes longitudes una junto a otra en un **contenedor**, 
El contenido de cada columna comienza en la parte superior. Con la extensión, especificas 
ya sea **arriba**, en el **medio** o **abajo** — para todo el contenedor
y, si es necesario, de forma diferente para columnas individuales. La configuración puede encontrarse en la
Diálogo **Editar contenedor** en la pestaña de **Diseño**. 

En los smartphones, las columnas están una debajo de otra y solo están tan altas como tú
Contenido. No es necesario alinear allí y no se puede ver ninguno. 

## Lo que ven los lectores

El título o párrafo en el tamaño seleccionado y el contenido de la columna en el
orientación elegida. Para que esto funcione, hay que hacer dos cosas en el Estudio.
en torno a la cual la administración del estudio
el CSS personalizado con la extensión Typo (Content Designer → Custom CSS)
y la tipografía de temas (aspecto y tacto → tipografía). Si falta el CSS personalizado, 
Los lectores ven el tamaño normal y el contenido de las columnas para los niveles adicionales
top — el contenido en sí sigue siendo correcto. 

## Lo que ves en el editor CMS

- En el campo de selección de formato de la barra de herramientas, aparece el grupo **"MAN Typo-Scale"** 
  con tamaño y altura de línea por escalón, por ejemplo, "Cuerpo L 18/27". Lo anterior
  Las entradas están ocultas porque la escala las contiene completamente. 
- La caja de selección muestra el nivel activo, por ejemplo, "Display 2XL · 72“. 
- Los bloques con un escalón adicional tienen una etiqueta oscura en la esquina superior derecha
  nivel, por ejemplo, 'display-2XL' — para que puedas reconocerlos de un vistazo. 
- En el diálogo **Editar contenedor → diseño** se muestra bajo el
  Botones de disposición de la sección "Alineación vertical". Las columnas
  En el editor muestra la orientación seleccionada inmediatamente. 

## Cuando la expansión esté lista

Studio no carga la extensión cuando abres una página, sino solo cuando 
la primera vez que insertas un **Bloque Personalizado**, o
. Después de eso, estará disponible en todas las páginas hasta que abras la pestaña del navegador
Recargar. Cómo encenderlo específicamente se encuentra en "Paso a paso".