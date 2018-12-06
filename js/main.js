$(document).ready(function () {

    // Autocompleta nome
    $(function() {

        // Atribui evento e funÃ§Ã£o para limpeza dos campos
        $('#nome').on('input', limpaCampos);
    
        // Dispara o Autocomplete a partir do segundo caracter
        $( "#nome" ).autocomplete({
            minLength: 2,
            source: function( request, response ) {
                $.ajax({
                    url: "php/buscaNome.php",
                    dataType: "json",
                    data: {
                        acao: 'autocomplete',
                        parametro: $('#nome').val()
                    },
                    success: function(data) {
                       response(data);
                    }
                });
            },
            focus: function( event, ui ) {
                $("#nome").val( ui.item.nome );
                carregarDados();
                return false;
            },
            select: function( event, ui ) {
                $("#nome").val( ui.item.nome);
                         carregarDados();

                return false;
            }
        }).autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" ).append( "<a>" + item.nome + "</a><br>" ).appendTo( ul )};
        
    
           // FunÃ§Ã£o para carregar os dados da consulta nos respectivos campos
        function carregarDados(){
            var busca = $('#nome').val();
    
            if(busca != "" && busca.length >= 2){
                $.ajax({
                    url: "php/buscaNome.php",
                    dataType: "json", 
                    data: {
                        acao: 'consulta',
                        parametro: $('#nome').val()
                    },
                    success: function( data ) {
                       $('#id').val(data[0].id);
                       $('#cep').val(data[0].cep);
                       $('#endereco').val(data[0].endereco);
                       $('#numero').val(data[0].numero);
                       $('#bairro').val(data[0].bairro);
                       $('#uf').val(data[0].uf);
                       $('#cidade').val(data[0].cidade);
                       $('#email').val(data[0].email);
                       $('#telefone').val(data[0].telefone);
                       $('#celular').val(data[0].celular);
                       $('#cpf').val(data[0].cpf);
                    }
                });
            }
        }
    
        // FunÃ§Ã£o para limpar os campos caso a busca esteja vazia
        function limpaCampos(){
           var busca = $('#nome').val();
    
           if(busca == ""){
                $('#cpf').val('');
               $('#endereco').val('')
               $('#numero').val('');
               $('#bairro').val('');
               $('#uf').val('');
               $('#cidade').val('');
               $('#email').val('');
               $('#telefone').val('');
               $('#celular').val('');
           }
        }
    });
    

    // busca CEP
      

    function limpa_formulario¡rio_cep() {
        // Limpa valores do formulÃ¡rio de cep.
        $("#endereco").val("").prop("disabled", false);
        $("#bairro").val("").prop("disabled", false);
        $("#cidade").val("").prop("disabled", false);
        $("#uf").val("").prop("disabled", false);
        $("#ibge").val("").prop("disabled", false);
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function () {

        //Nova variÃ¡vel "cep" somente com dÃ­gitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //ExpressÃ£o regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#endereco").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");
                $("#ibge").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                        $("#endereco").val(dados.logradouro).prop("disabled", true);
                        $("#bairro").val(dados.bairro).prop("disabled", true);
                        $("#cidade").val(dados.localidade).prop("disabled", true);
                        $("#uf").val(dados.uf).prop("disabled", true);
                        $("#ibge").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado nÃ£o foi encontrado.
                        limpa_formulario_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep Ã© invÃ¡lido.
                limpa_formulario_cep();
                alert("Formato de CEP invalido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulÃ¡rio.
            limpa_formulario_cep();
        }
    });


    $(".adiciona-linha").click(function () {
        $("#lista").each(function () {
            var tds = '<tr>';
            jQuery.each($('tr:last td', this), function () {
                tds += '<td>' + $(this).html() + '</td>';
            });
            tds += '</tr>';
            if ($('tbody', this).length > 0) {
                $('tbody', this).append(tds);
            } else {
                $(this).append(tds);
            }
        });

    });   
});

function excluir(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}