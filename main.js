// Selecionando os elementos HTML pelo ID para manipulação
const elemento_span = document.getElementById("pacientes_pendentes");
const elemento_h4 = document.getElementById("clientesExecucao");
const formulario = document.getElementById("form-date-clientes");

// Selecionando os elementos HTML através do ID referente ao preenchimento do usuário.
const nomeCompleto = document.getElementById('complete-name');
const endereco = document.getElementById('endereco');
const cpf = document.getElementById('cpf');
const plano = document.getElementById('plano-select');
const triagem = document.getElementById('triagem-select');

// Selecionando os botões HTML através do ID
const btnAgendar = document.getElementById('btnAgendar');
const btnExecutar = document.getElementById('btnExecutar');

// Elaborando função para validar se CPF do usuário possui 11 digitos
function validarCPF(cpf){
    return cpf.length >=10 && /[0-11]/.test(cpf)
}


// Adicionando um evento de escuta no formulário
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão de subimt do form

    // Resgatando os valores do campo do formulário
    const nome_cliente = nomeCompleto.value;
    const endereco_cliente = endereco.value;
    const cpf_cliente = cpf.value;
    const plano_cliente = plano.value;
    const triagem_cliente = triagem.value;

     // condição para verificar se o cpf do usuário possui mesmo 11 digitos
    if (!validarCPF(cpf_cliente)){
        alert("ERRO: CPF inválido. O CPF deve ter 11 dígitos.");
        return;}

    // Criando um Array para armazenar esses dados em apenas uma variável
    const oneArray_cliente = {
        nome_cliente,
        endereco_cliente,
        cpf_cliente,
        plano_cliente,
        triagem_cliente
    };

    // Abaixo verificando se todos os campos estão preenchidos.
    if (nome_cliente && endereco_cliente && cpf_cliente && plano_cliente && triagem_cliente) {
        // Verificando se existe paciemtes armazenados no localStorage
        if (localStorage.getItem("pacientes")) {
            // Recuperando a lista de pacientes 
            const pacientesEsperando = localStorage.getItem("pacientes").split(";");
            let pacientePresente = false;

            // Verificando se o paciente ja está na lista através de condições
            pacientesEsperando.forEach(paciente => { // Utilizando o forEach para percorrer as informações do Array
                const pacienteInfo = paciente.split(",");
                if (pacienteInfo[0] === oneArray_cliente.nome_cliente && pacienteInfo[1] === oneArray_cliente.endereco_cliente) {
                    pacientePresente = true;
                }
            });

            // Adicionando o paciente na lista se ele não estiver presente
            if (!pacientePresente) {
                localStorage.setItem("pacientes", localStorage.getItem("pacientes") + ";" + `${nome_cliente},${endereco_cliente},${cpf_cliente},${plano_cliente},${triagem_cliente}`);
            }
        } else {
            // Se não, cria uma nova entrada de info de pacientes
            localStorage.setItem("pacientes", `${nome_cliente},${endereco_cliente},${cpf_cliente},${plano_cliente},${triagem_cliente}`);
        }
        // Atualizando o número de pacientes esperando
        mostrarPendentes();
    }

    // Resetando o formulário e redirecionando o curso para o campo de nome
    formulario.reset();
    nomeCompleto.focus();
});

// Função para mostrar o número de pacientes pendentes
const mostrarPendentes = () => {
    let pacientes_pendentes = 0;
    // Verificando se há pacientes no localStorage
    if (localStorage.getItem("pacientes")) {
        // Recuperando a lista de pacientes e colocando no array
        const pacientesEsperando = localStorage.getItem("pacientes").split(";");
        // Contando o número de pacientes pendentes com length
        pacientesEsperando.forEach(paciente => {
            const pacienteInfo = paciente.split(",");
            if (pacienteInfo.length === 5) {
                pacientes_pendentes++;
            }
        });
    }
    // exibindo o numero de pacientes pedentes no elemento span
    elemento_span.innerText = pacientes_pendentes;
}

// Adicionando um evento de escuta para quando a página carregar (utilizando o load)
window.addEventListener("load", mostrarPendentes);

// Adicionando um evento de escuta no botão executar
btnExecutar.addEventListener("click", () => {
    // Verificando se tem pacientes pendentes
    if (!localStorage.getItem("pacientes")) {
        alert("Não há pacientes em espera!");
        return;
    }

    // Recuperando a lista de pacientes pendentes e colocando em um Array
    let pacientesPendentes = localStorage.getItem("pacientes").split(";");

    // Criando arrays separados para cada cor de triagem
    let pacienteTriagemVermelha = [];
    let pacienteTriagemAmarela = [];
    let pacienteTriagemVerde = [];

    // Divindo os pacientes de cada triagem com seus arrays e fazendo condição para adicionar na cor correspondente
    pacientesPendentes.forEach(paciente => {
        const pacienteInfo = paciente.split(",");
        if (pacienteInfo[4] === "vermelho") {
            pacienteTriagemVermelha.push(paciente);
        } else if (pacienteInfo[4] === "amarelo") {
            pacienteTriagemAmarela.push(paciente);
        } else if (pacienteInfo[4] === "verde") {
            pacienteTriagemVerde.push(paciente);
        }
    });

    // Condição executar os paciente de acordo com a triagem selecionada e definindo as prioridades com ifelse
    let proximoPaciente;
    if (pacienteTriagemVermelha.length > 0) {
        proximoPaciente = pacienteTriagemVermelha.shift();
    } else if (pacienteTriagemAmarela.length > 0) {
        proximoPaciente = pacienteTriagemAmarela.shift();
    } else if (pacienteTriagemVerde.length > 0) {
        proximoPaciente = pacienteTriagemVerde.shift();
    } else {
        alert("Não há pacientes para executar!");
        return;
    }

    // logica para exibir o proximo cliente a ser exibido na tela e suas informações armazenadas no array
    const clienteInfo = proximoPaciente.split(",");
    elemento_h4.innerText = `Nome: ${clienteInfo[0]}, Endereço: ${clienteInfo[1]}, CPF: ${clienteInfo[2]}, Plano: ${clienteInfo[3]}, Triagem: ${clienteInfo[4]}`;

    // Concatenando os arrays de triagem de pacientes em uma fila
    const fila = pacienteTriagemVermelha.concat(pacienteTriagemAmarela).concat(pacienteTriagemVerde);
    // Atualizando o localStorage com a nova lista de pacientes pendentes
    localStorage.setItem("pacientes", fila.join(";"));
    mostrarPendentes();
});
