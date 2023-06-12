const socket = io();

socket.on("products", (data) => {
  let divCode = "";
  const mainDiv = document.getElementById("idMainDiv");

  data.forEach((element) => {
    divCode += `<div class="productDiv">
                    <h3>${element.title}</h3>
                    <p>${element.description}</p>
                    <h2>$${element.price}</h2>
                    <h5>Disponible: ${element.stock}</h5>
                    <button class="btnDelete" id="idBtnDelete${element.id}">ELIMINAR</button>
                </div>`;
  });

  mainDiv.innerHTML = divCode;

  for (let i = 0; i < data.length; i++) {
    document.getElementById(`idBtnDelete${data[i].id}`).addEventListener("click", (btnData) => {
      socket.emit("delete", btnData.target.id.slice(11));
    });
  }
});

document.getElementById("idBtnAdd").addEventListener("click", () => {
  const title = document.getElementById("idInputTitle").value;
  const description = document.getElementById("idInputDescription").value;
  const price = Number(document.getElementById("idInputPrice").value);
  const stock = Number(document.getElementById("idInputStock").value);
  const code = document.getElementById("idInputCode").value;

  socket.emit("add", { title, description, price, stock, code });
});
