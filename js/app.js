var MyProject = {};
$(document).ready(function () {
    $(document).foundation();
    MyProject.pull = true;
    MyProject.request = null;
    MyProject.messages = $("#chat-messages");
    var c = 0;

    //window.console.log("aqui funciona");

    function loadMessages(id) {

        MyProject.request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var scrollIsBottom = MyProject.messages.prop('scrollHeight') - MyProject.messages.prop('clientHeight') <= MyProject.messages.prop('scrollTop') + 2;
                MyProject.messages.html(MyProject.request.responseText);
                if (scrollIsBottom) {
                    MyProject.messages.scrollTop(MyProject.messages.prop('scrollHeight') - MyProject.messages.prop('clientHeight'));
                }
            }
        };
        MyProject.request.open("GET", "get_messages.php?id=" + id, true);
        MyProject.request.send(null);
    }

    function createRequest() {
        MyProject.request = null;
        if ($("#chat-header").length) {
            MyProject.pull = false;
        }
        //window.console.log("????");
        try {
            MyProject.request = new XMLHttpRequest();
        } catch (trymicrosoft) {
            try {
                MyProject.request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (othermicrosoft) {
                try {
                    MyProject.request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    MyProject.request = null;
                }
            }
        }
        //window.console.log(MyProject.pull);
        if (MyProject.pull && MyProject.request !== null) {
            setInterval(function () {
                loadMessages(1);
            }, 1000);
        }
        if (MyProject.request === null) {
            window.alert("Error creating request object!");
        }
    }

    function send(r, u, n, str) {
        MyProject.request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                $('#input').val("");
                console.log(MyProject.request.responseText);
            }
        };
        MyProject.request.open("POST", "send.php?r=" + r + "&u=" + u + "&n=" + n + "&m=" + str, true); // Arrumar isso para ajustar ao sistema de login
        MyProject.request.send(null);
    }

    function createOnClick(inter) {
        /*window.console.log('oi meu consagrado');
        if ($("div.chat-body-left.header").length) {
            window.console.log("ele existe");
        } else {
            window.console.log("ainda nao existe");
        }*/
        $("#chat-header").on("click", "div.chat-body-left.header", function () {
            clearInterval(inter);
            var id = $(this).attr('id').replace("div", "");
            var name = $(this).children("p")[0].innerHTML;
            $("#input").data("nameID", name + "_" + id);
            loadMessages(id);
            inter = setInterval(function () {
                loadMessages(id);
            }, 1000);
            /*MyProject.request.onreadystatechange = function () { // Transferir isso aqui para loadMessages() (vai precisar fazer o sistema de login basico)
                if (this.readyState === 4 && this.status === 200) {
                    var scrollIsBottom = MyProject.messages.prop('scrollHeight') - MyProject.messages.prop('clientHeight') <= MyProject.messages.prop('scrollTop') + 2;
                    MyProject.messages.html(MyProject.request.responseText);
                    if (scrollIsBottom) {
                        MyProject.messages.scrollTop(MyProject.messages.prop('scrollHeight') - MyProject.messages.prop('clientHeight'));
                    }
                }
            };
            MyProject.request.open("GET", "get_messages.php?id=" + $(this).attr('id').replace("div", ""), true);
            MyProject.request.send(null);*/
        });
    }

    function loadHeader() {
        createRequest();
        MyProject.request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                //window.alert("qtf");
                $("#chat-header").html(MyProject.request.responseText);
                var inter = setInterval(null, 0);
                createOnClick(inter);
            }
        };
        MyProject.request.open("GET", "last_messages.php", true);
        MyProject.request.send(null);
    }

    if ($("#chat-menu").length) {
        $("#chat").submit(function (event) {
            event.preventDefault();
            if ($('#input').val().trim() !== '' && $('#input').val().trim() !== null) {
                send(0, 3, "Felipe", $("#input").val().trim());
            }
        });

        $("#chat-menu").click(createRequest());

        $("#send-button").click(function (event) {
            event.preventDefault();
            if ($('#input').val().trim() !== '' && $('#input').val().trim() !== null) {
                send(0, 3, "Felipe", $('#input').val().trim());
            }
        });
    }

    if ($("#chat-header").length) {
        loadHeader();
        var nameID = null;
        $("#chat").submit(function (event) {
            event.preventDefault();
            var val = $("#input").val().trim();
            console.log(val);
            nameID = $("#input").data("nameID").split("_");
            console.log(nameID);
            if (val !== "" && val !== null) {
                send(nameID[1], 0, "Administrador", val);
            }
        });
        $("#send-button").click(function (event) {
            event.preventDefault();
            var val = $("#input").val().trim();
            console.log(val);
            nameID = $("#input").data("nameID").split("_");
            console.log(nameID);
            if (val !== "" && val !== null) {
                send(nameID[1], 0, "Administrador", val);
            }
        });
    }

    $(".tabs-title").on("click", "a[data-tabs-target]", function () {
        var target = $(this).data("tabs-target");
        if (target === "panel2") {
            MyProject.request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    $("#media-container").html(MyProject.request.responseText);
                    $("#media-container").foundation();
                }
            };
            MyProject.request.open("GET", "load_galery.php", true);
            MyProject.request.send(null);
        }
    });

    $(".tab-button").click(function () {
        var target = $(this).data("alttab-target");
        $(".alt-tab").css("display", "none");
        $("#" + target).css("display", "block");
    });

    // shows and hides filtered items
    $(".filter-simple-button").click(function () {
        var value = $(this).attr('data-filter');
        if (value === "all") {
            $('.filter-simple-item').show('1000');
        } else {
            $(".filter-simple-item").not('.' + value).hide('3000');
            $('.filter-simple-item').filter('.' + value).show('3000');
        }
    });

    // changes active class on filter buttons
    $('.filter-simple-button').click(function () {
        $(this).siblings().removeClass('is-active');
        $(this).addClass('is-active');
    });
});