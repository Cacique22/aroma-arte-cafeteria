/* ==========================================================================
   AROMA & ARTE CAFETERIA - Scripts de Interatividade (JavaScript Puro)
   Projeto acadêmico - Fatec Praia Grande
   Conteúdos aplicados:
   - Manipulação de DOM (createElement, appendChild, removeChild)
   - Escuta de Eventos (addEventListener, onclick, onsubmit)
   - Validação de formulários com Expressões Regulares (RegEx)
   - Lógica de cálculo e atualização em tempo real
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. MENU MOBILE (RESPONSIVO)
       ========================================================================== */
    const btnMobile = document.getElementById("btnMobile");
    const menuLinks = document.getElementById("menuLinks");

    if (btnMobile && menuLinks) {
        btnMobile.addEventListener("click", function () {
            // Alterna a classe que exibe/esconde o menu em telas menores
            menuLinks.classList.toggle("menu-aberto");
        });
    }

    /* ==========================================================================
       2. SIMULADOR DE PEDIDO / COMANDA RÁPIDA (Página: cardapio.html)
       Aplica o conceito de manipulação de DOM ensinado em aula:
       document.createElement(), appendChild() e removeChild().
       ========================================================================== */
    const formSimulador = document.getElementById("formSimulador");
    const selectProduto = document.getElementById("selectProduto");
    const inputQtd = document.getElementById("inputQtd");
    const listaPedido = document.getElementById("listaPedido");
    const valorTotalEl = document.getElementById("valorTotal");
    const btnLimpar = document.getElementById("btnLimparPedido");

    let totalGeral = 0.0;

    // Função utilitária para formatar valores em Real (R$)
    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    if (formSimulador && selectProduto && inputQtd && listaPedido && valorTotalEl) {
        
        // Adicionar item à lista de pedidos
        formSimulador.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Impede o recarregamento da página

            const opcaoSelecionada = selectProduto.options[selectProduto.selectedIndex];
            const nomeProduto = opcaoSelecionada.getAttribute("data-nome");
            const precoUnitario = parseFloat(opcaoSelecionada.getAttribute("data-preco"));
            const quantidade = parseInt(inputQtd.value, 10);

            // Validação simples de quantidade
            if (isNaN(quantidade) || quantidade <= 0) {
                alert("Por favor, informe uma quantidade válida (mínimo 1).");
                return;
            }

            const subtotal = precoUnitario * quantidade;
            totalGeral += subtotal;

            // Criação dinâmica dos elementos HTML (conforme AulaJsonDOM)
            const novoItem = document.createElement("li");
            novoItem.setAttribute("data-subtotal", subtotal.toFixed(2));

            // Conteúdo textual do item
            const spanTexto = document.createElement("span");
            spanTexto.textContent = `${quantidade}x ${nomeProduto} - ${formatarMoeda(subtotal)}`;

            // Botão para remover este item individual
            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.className = "btn-remover-item";
            btnRemover.type = "button";

            // Evento ao clicar em Remover item
            btnRemover.onclick = function () {
                const subtotalItem = parseFloat(novoItem.getAttribute("data-subtotal"));
                totalGeral -= subtotalItem;
                
                // Evita problemas de arredondamento em float
                if (totalGeral < 0.001) totalGeral = 0;

                // Remove o nó filho do DOM
                listaPedido.removeChild(novoItem);

                // Atualiza o valor total
                valorTotalEl.textContent = formatarMoeda(totalGeral);

                // Se a lista ficar vazia, exibe aviso
                verificarListaVazia();
            };

            // Monta o elemento no DOM
            novoItem.appendChild(spanTexto);
            novoItem.appendChild(btnRemover);
            listaPedido.appendChild(novoItem);

            // Remove aviso de "nenhum item" se existir
            const avisoVazio = document.getElementById("itemVazioAviso");
            if (avisoVazio) {
                avisoVazio.remove();
            }

            // Atualiza o display do valor total
            valorTotalEl.textContent = formatarMoeda(totalGeral);

            // Reseta a quantidade para 1
            inputQtd.value = "1";
        });

        // Botão para limpar todos os itens da comanda (uso de hasChildNodes e removeChild)
        if (btnLimpar) {
            btnLimpar.addEventListener("click", function () {
                // Loop ensinado em sala para esvaziar elementos filhos
                while (listaPedido.hasChildNodes()) {
                    listaPedido.removeChild(listaPedido.firstChild);
                }

                totalGeral = 0.0;
                valorTotalEl.textContent = formatarMoeda(totalGeral);
                verificarListaVazia();
            });
        }

        // Função que verifica se a lista está vazia e recoloca aviso amigável
        function verificarListaVazia() {
            if (!listaPedido.hasChildNodes()) {
                const itemVazio = document.createElement("li");
                itemVazio.id = "itemVazioAviso";
                itemVazio.style.color = "#8c827a";
                itemVazio.style.fontStyle = "italic";
                itemVazio.textContent = "Nenhum item selecionado até o momento.";
                listaPedido.appendChild(itemVazio);
            }
        }
    }

    /* ==========================================================================
       3. VALIDAÇÃO DE FORMULÁRIO (Página: contato.html)
       Atende ao requisito 5: Validação completa de campos via JS e HTML5.
       ========================================================================== */
    const formContato = document.getElementById("formContato");
    const avisoSucesso = document.getElementById("avisoSucesso");

    if (formContato) {
        const campoNome = document.getElementById("campoNome");
        const campoEmail = document.getElementById("campoEmail");
        const campoTelefone = document.getElementById("campoTelefone");
        const campoAssunto = document.getElementById("campoAssunto");
        const campoMensagem = document.getElementById("campoMensagem");

        // Função para exibir ou ocultar erro de um campo
        function validarCampo(campo, condicaoValida, idMensagemErro) {
            const spanErro = document.getElementById(idMensagemErro);

            if (!condicaoValida) {
                campo.classList.add("campo-invalido");
                campo.classList.remove("campo-valido");
                if (spanErro) spanErro.classList.add("visivel");
                return false;
            } else {
                campo.classList.remove("campo-invalido");
                campo.classList.add("campo-valido");
                if (spanErro) spanErro.classList.remove("visivel");
                return true;
            }
        }

        // Regras de validação individuais
        function checarNome() {
            // Mínimo de 3 caracteres e apenas letras e espaços
            const regexNome = /^[A-Za-zÀ-ÿ\s]{3,}$/;
            return validarCampo(
                campoNome,
                campoNome.value.trim() !== "" && regexNome.test(campoNome.value.trim()),
                "erroNome"
            );
        }

        function checarEmail() {
            // Expressão regular clássica para validação de formato de e-mail
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return validarCampo(
                campoEmail,
                regexEmail.test(campoEmail.value.trim()),
                "erroEmail"
            );
        }

        function checarTelefone() {
            // Aceita telefones com DDD (pelo menos 10 dígitos numéricos)
            const apenasNumeros = campoTelefone.value.replace(/\D/g, "");
            return validarCampo(
                campoTelefone,
                apenasNumeros.length >= 10,
                "erroTelefone"
            );
        }

        function checarAssunto() {
            return validarCampo(
                campoAssunto,
                campoAssunto.value !== "",
                "erroAssunto"
            );
        }

        function checarMensagem() {
            // Mínimo de 10 caracteres para mensagem
            return validarCampo(
                campoMensagem,
                campoMensagem.value.trim().length >= 10,
                "erroMensagem"
            );
        }

        // Validação em tempo real ao digitar ou sair do campo (blur)
        campoNome.addEventListener("blur", checarNome);
        campoEmail.addEventListener("blur", checarEmail);
        campoTelefone.addEventListener("blur", checarTelefone);
        campoAssunto.addEventListener("change", checarAssunto);
        campoMensagem.addEventListener("blur", checarMensagem);

        // Submissão do formulário
        formContato.addEventListener("submit", function (evento) {
            evento.preventDefault(); // Impede o envio padrão

            // Executa todas as validações
            const nomeValido = checarNome();
            const emailValido = checarEmail();
            const telValido = checarTelefone();
            const assuntoValido = checarAssunto();
            const msgValida = checarMensagem();

            // Se todos forem válidos
            if (nomeValido && emailValido && telValido && assuntoValido && msgValida) {
                // Exibe alerta de sucesso
                if (avisoSucesso) {
                    avisoSucesso.classList.add("visivel");
                }

                // Reseta os campos e classes visuais
                formContato.reset();
                [campoNome, campoEmail, campoTelefone, campoAssunto, campoMensagem].forEach(function (campo) {
                    campo.classList.remove("campo-valido");
                });

                // Oculta a mensagem de sucesso após 6 segundos
                setTimeout(function () {
                    if (avisoSucesso) {
                        avisoSucesso.classList.remove("visivel");
                    }
                }, 6000);

            } else {
                // Caso haja erro, foca no primeiro campo com erro
                const primeiroInvalido = formContato.querySelector(".campo-invalido");
                if (primeiroInvalido) {
                    primeiroInvalido.focus();
                }
            }
        });
    }

});
