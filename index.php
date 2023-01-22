<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
       
  </head>
  <body>
    <div class="slidecontainer">
      <input type="text"  id="vida" disabled>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" disabled>
        <input type="text"  id="nome" disabled>
        <input type="text"  id="sala" disabled>
    <div class="card-container"></div>
    <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)" ondragover="allowDrop(event)" ></div>
    <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)" ondragover="allowDrop(event)" ></div>
    <div id="div3" ondrop="drop(event)" ondragover="allowDrop(event)" ondragover="allowDrop(event)" ></div>


        <div id="card-modal" class="modal">
            <div class="modal-content">
              <span class="close-modal">&times;</span>
              
            </div>
          </div>
          
    <script src="server.js"></script>
    <script src="client.js"></script>
  </body>
</html>
