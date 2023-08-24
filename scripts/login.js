'use strict'

function doLogin(){
    var username = $("#usernameFld").val();
    var password =  $("#passwdFld").val();
    if(username.trim() !== "" && password != ""){
        $.ajax({
            type: "post",
            contentType: 'application/json', // Establece el Content-Type a JSON
            dataType: 'json',
            url: "http://127.0.0.1:5000/user/login",
            data: JSON.stringify({
                username: $("#usernameFld").val().toLowerCase(),
                password: $("#passwdFld").val()
            }),
            success: (data, text, xhr) => {
                console.log(data)
                if (data.success == true){
                    if(data.result != null){
                        var toastHtml = `<span>Sesión iniciada correctamente</span><button onclick="M.Toast.dismissAll();" class="btn-flat toast-action">Cerrar</button>`
                        M.toast({html: toastHtml, classes: 'rounded'})
                        localStorage.setItem('token', data.result);
                        window.location.href = "dashboard.html"
                        window.history.forward()
                    }
                }else{
                    var toastHtml = `<span>Error: ${data.message}.</span><button onclick="M.Toast.dismissAll();" class="btn-flat toast-action">Cerrar</button>`
                    M.toast({html: toastHtml, classes: 'rounded'})
                }
            },
        })
        .fail((xhr, status, thrown) => {
            if(status == 'error' && xhr == null || xhr == undefined){
                var toastHtml = `<span>Error, el servidor no responde.</span><button onclick="M.Toast.dismissAll();" class="btn-flat toast-action">Cerrar</button>`
                M.toast({html: toastHtml, classes: 'rounded'})
            }
        })
    }else{
        M.toast({html: 'No ha completado los campos'});
    }
    
}