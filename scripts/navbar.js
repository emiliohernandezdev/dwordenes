
function getMenus() {
    let data = [];
    $.ajax({
        type: "get",
        contentType: 'application/json', // Establece el Content-Type a JSON
        dataType: 'json',
        url: "http://127.0.0.1:5000/menu/menus",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (data, text, xhr) => {
            if (data.success == true) {
                data = data.result;
                buildNavbar(data);
            } else {
                M.toast({ html: 'Error: ' + data.message })
            }
        },
        error: (data, text, xhr) => {
            switch (xhr) {
                case "UNAUTHORIZED":
                    window.location.href = "index.html";
                    break;
            }
        }
    })
    return data;
}


function buildNavbar(data) {
    for (var d in data) {
        var item = data[d]
        buildMenu(item, data);
    }
    // buildAccount()
    $('.dropdown-trigger').dropdown();
    $('.modal').modal();
}

function buildMenu(item, items) {
    var nav = $("#mainMenu");
    var $li = "";
    if (item.MENUPARENT == null) {
        var hasChilds = items.some(i => i.MENUPARENT === item.MENUID);
        if (hasChilds) {
            var ul = $("<ul>").addClass('dropdown-content').attr('data-id', item.MENUID).attr('id', item.MENUID)
            
            var childs = items.filter(function(it){
                return it.MENUPARENT == item.MENUID
            });
            for(var i=0; i<childs.length; i++){
                var menuItem = childs[i];
                var li = $("<li>");
                var a = $("<a>").text(menuItem.MENUNAME);
                li.append(a);
                ul.append(li)
            }
            $('body').append(ul)
            $li = $(`<li data-id="${item.MENUID}"><a class="dropdown-trigger modal-trigger" href="#auxModal" data-target="${item.MENUID}">${item.MENUNAME}<i class="material-icons right">arrow_drop_down</i></a></li>`)
        } else {
            $li = $(`<li data-id="${item.MENUID}"><a class="modal-trigger" href="#auxModal">${item.MENUNAME}</a></li>`)
        }
        nav.append($li)
    }
}


function buildAccount(){
    $.ajax({
        type: "get",
        contentType: 'application/json', // Establece el Content-Type a JSON
        dataType: 'json',
        url: "http://127.0.0.1:5000/user/profile",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        success: (data, text, xhr) => {
            if (data.success == true) {
                console.log(data);
            } else {
                M.toast({ html: 'Error: ' + data.message })
            }
        },
        error: (data, text, xhr) => {
            switch (xhr) {
                case "UNAUTHORIZED":
                    window.location.href = "index.html";
                    break;
            }
        }
    })
}



