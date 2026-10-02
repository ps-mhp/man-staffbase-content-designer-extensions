# Preguntas frecuentes

**Pregunta:** En el campo de selección de formato, falta el grupo "MAN Typo Scale". ¿Qué hacer? 

Respuesta: Studio no carga la extensión hasta que hay un bloque personalizado
Y se olvida de ello cuando se vuelve a cargar la pestaña del navegador. 
Actívala como se describe en "Encender paso a paso → extensión" 
. Si el grupo sigue desaparecido después de eso, Studio
Modificado — Por favor, informa esto al equipo que mantiene los widgets. 

**Pregunta:** ¿Puedo añadir la extensión como bloque de construcción en la página? 

Respuesta: No. No tiene contenido visible y, por tanto, no aparece en
en la lista de Seleccionar bloques. Solo funciona en el campo de selección de Formato de Título y
Mensaje. 

**Pregunta:** Veo el nivel en el editor, pero no en la página publicada. 

Respuesta: Entonces el CSS personalizado con la extensión de error tipográfico falta en Studio o sí está
obsoleto. Esto es lo que establece la administración del estudio. 

**Pregunta:** Hay un paso en la página publicada, pero no en el editor. 

Respuesta: La extensión aún no está activa en la pestaña de tu navegador. Alternar
Introdúcelo y vuelve a abrir la página. 

**Pregunta:** "Pantalla L" aparece tan grande como "H1" o más pequeña de lo esperado. 

Respuesta: La tipografía temática en Studio (aspecto y tacto → tipografía) sigue siendo
no está configurado a la escala MAN. Esto lo organiza la administración del estudio. 

**Pregunta:** Tras duplicar, la copia ha perdido su etapa. 

Respuesta: Esto es conocido: La copia obtiene un nuevo identificador sin nivel. 
Reinicia el nivel de la copia. 

**Pregunta:** Tras cambiar de párrafo a H2, el encabezado es tamaño normal, aunque antes se estableció "Cuerpo L". 

Respuesta: Intencionado: Los niveles del cuerpo solo se aplican a los párrafos. Se eliminó la extensión
El nivel que ya no coincide con la próxima vez que guardes. 

**Pregunta:** ¿Cómo desactivo la extensión de depuración en mi navegador? 

Respuesta: En Studio, abre la consola de desarrolladores del navegador y escribe
'localStorage.setItem("sbt-typo-scale", "off")', luego vuelve a cargar la pestaña. 
Vuelve a encéndelo con 'localStorage.removeItem("sbt-typo-scale")'. Esto funciona
Solo en tu navegador.