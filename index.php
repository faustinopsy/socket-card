<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="styles.css">
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
       
  </head>
  <body>
    <div class="slidecontainer">
      <div class="row">
      <input type="text"  id="vida" disabled> <input type="text"  id="nome" disabled>
      </div>
        <input type="range" min="1" max="100" value="50" class="slider" id="myRange" disabled>
       
    <div class="card-container"></div>
      <div class="card-row">
    <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)" ondragover="allowDrop(event)" ></div>
    <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)" ondragover="allowDrop(event)" ></div>
    <div id="div3" ondrop="drop(event)" ondragover="allowDrop(event)" ondragover="allowDrop(event)" ></div>
    </div>

        <div id="myModal1" class="modal" >
            <div class="modal-content w3-container w3-center">
              <h2>Não é sua vez <span class="close">&times;</span></h2>
              
              
            </div>
          </div>
          <div id="myModal2" class="modal" >
            <div class="modal-content w3-container w3-center">
            <h2>É sua vez <span class="close">&times;</span></h2>
              
              
            </div>
          </div>
          
    <script src="app.js"></script>
  </body>
</html>
