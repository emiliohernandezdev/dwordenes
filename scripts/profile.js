function getProfile(){
    $.ajax({
        type: "get",
        contentType: 'application/json', // Establece el Content-Type a JSON
        dataType: 'json',
        url: "http://127.0.0.1:5000/user/profile",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (data, text, xhr) => {
            if (data.success == true){
            }else{
                alert("Error al dibujar el menú del usuario")
            }
        },
        error: (data, text, xhr) => {
          switch(xhr){
            case "UNAUTHORIZED":
              alert("El token venció");
              window.location.href = "index.html";
            break;
          }
          alert("Error desconocido: " + text)
        }
    })
}