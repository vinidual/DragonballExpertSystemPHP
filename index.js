var attributes;
var instances;
var current_question;

$(document).ready(function(){

    $('img').hide();
    $('#restart').hide();

    $('#start').click(function(){start();});
    $('#restart').click(function(){restart();});

    document.getElementById('audio').volume = 0.2;

    $('.question_div').hide();

    $('#sim').click(function(){updateData(1);});
    $('#nao').click(function(){updateData(-1);});

    getChars = function(){
        $.ajax({
            url: 'index.php',
            method: 'post',
            data: {value: 'characters'},
            success: function(data){
                $('.div_characters').html(data);
            },
            error: function(e){
                console.log(e);
            }
        });
    };

    getChars();

    function start(){
        $.ajax({
            url: 'index.php',
            method: 'post',
            data: {value: 'start'},
            success: function(data){
                attributes = JSON.parse(data);
                $('.start_div').fadeOut(function(){
                    $('.question_div').fadeIn();
                });
                $('.div_characters').fadeOut();
                console.log(attributes)
                instances();
            },
            error: function(e){
                console.log(e);
            }
        });
    }

    function restart(){
        location.href = 'http://localhost/dragonball/';
    }

    function instances(){
        $.ajax({
            url: 'index.php',
            method: 'post',
            data: {value: 'instances'},
            success: function(data){
                instances = JSON.parse(data);
                getQuestion();
                console.log(instances);
            },
            error: function(e){
                console.log(e);
            }
        });
    }

    function getQuestion(){
        $.ajax({
            url: 'index.php',
            method: 'post',
            data: {
                value: 'question',
                attributes: attributes,
                instances: instances
            },
            success: function(data){
                var vec = data.split('0');
                if(vec[1] == null){
                    var aux = "O personagem " + data + "?";
                    current_question = data;
                    $('.info1').text(aux);
                }
                else {
                    $('.info1').text("Eu acho que seu personagem é:");
                    $('.info2').text(vec[0]);
                    getImage(vec[0]);
                    $('#sim').fadeOut();
                    $('#nao').fadeOut();
                }
            },
            error: function(e){
                console.log(e);
            }
        });
    }

    function updateData(value){
        attributes['attributes'][current_question] = value;
        if(value == -1){
            $.ajax({
                url: 'index.php',
                method: 'post',
                async: false,
                data: {
                    value: 'skipInstances',
                    instances: instances,
                    question: current_question
                },
                success: function(data){
                    instances = JSON.parse(data);
                },
                error: function(e){
                    console.log(e);
                }
            });
        }
        getQuestion();
    }

    function getImage(name){
        if(name == 'Bills')
            name = 'img/bills.jpg';
        else if(name == 'Bulma')
            name = 'img/bulma.jpg';
        else if(name == 'Cell')
            name = 'img/cell.jpg';
        else if(name == 'Chaos')
            name = 'img/chaos.jpg';
        else if(name == 'Chi-Chi')
            name = 'img/chichi.jpg';
        else if(name == 'Dende')
            name = 'img/dende.jpg';
        else if(name == 'Freeza')
            name = 'img/freeza.jpg';
        else if(name == 'Son Gohan Adulto')
            name = 'img/gohanA.jpg';
        else if(name == 'Son Gohan Criança')
            name = 'img/gohanC.jpg';
        else if(name == 'Son Goku Adulto')
            name = 'img/gokuA.jpg';
        else if(name == 'Son Goku Criança')
            name = 'img/gokuC.jpg';
        else if(name == 'Son Goten')
            name = 'img/goten.jpg';
        else if(name == 'Kaio Do Norte')
            name = 'img/kaiodonorte.jpg';
        else if(name == 'Kuririn')
            name = 'img/kuririn.jpg';
        else if(name == 'Majin Boo Gordo')
            name = 'img/majinboogordo.jpg';
        else if(name == 'Majin Boo Magro')
            name = 'img/majinboomagro.jpg';
        else if(name == 'Mestre-Kame')
            name = 'img/mestrekame.jpg';
        else if(name == 'Mr. Satan')
            name = 'img/mrsatan.jpg';
        else if(name == 'Nappa')
            name = 'img/nappa.jpg';
        else if(name == 'Numero 16')
            name = 'img/numero16.jpg';
        else if(name == 'Numero 17')
            name = 'img/numero17.jpg';
        else if(name == 'Numero 18')
            name = 'img/numero18.jpg';
        else if(name == 'Oolong')
            name = 'img/oolong.jpg';
        else if(name == 'Pan')
            name = 'img/pan.jpg';
        else if(name == 'Piccolo')
            name = 'img/piccolo.jpg';
        else if(name == 'Pual')
            name = 'img/pual.jpg';
        else if(name == 'Raditz')
            name = 'img/raditz.jpg';
        else if(name == 'Shenlong')
            name = 'img/shenlong.jpg';
        else if(name == 'Tenshinhan')
            name = 'img/tenshinhan.jpg';
        else if(name == 'Trunks Adulto')
            name = 'img/trunksA.jpg';
        else if(name == 'Trunks Criança')
            name = 'img/trunksC.jpg';
        else if(name == 'Vegeta')
            name = 'img/vegeta.jpg';
        else if(name == 'Videl')
            name = 'img/videl.jpg';
        else if(name == 'Yajirobe')
            name = 'img/yajirobe.jpg';
        else
            name = 'img/404.jpg';
        $('#img').attr('src',name);
        $('#sim').fadeOut();
        $('#nao').fadeOut(function(){
            $('#img').fadeIn(function(){
                $('#restart').fadeIn();
            });
        });
    }

});
