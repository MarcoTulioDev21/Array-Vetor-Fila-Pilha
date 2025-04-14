function checkCredenciais(){
    // Resgatando as credenciais preenchidas pelo usuário através do formulário
    var registroUsuario = document.forms["credenciais"]["user-register"].value;
    var registroSenha = document.forms["credenciais"]["password-register"].value;
    var registroCpf = document.forms["credenciais"]["cpf-register"].value;

    if(registroUsuario == ""){
        alert("Preencha o campo usuário!");
        return false;
    }
    if(registroSenha == ""){
        alert("Preencha o campo senha!");
        return false;
    }
    if(registroCpf == ""){
        alert("Preencha o campo telefone!");
        return false;
    }else if (!validarCPF(registroCpf)){
        alert("O CPF deve conter 11 dígitos.");
        return false;
    }
    // Condição para verificar se os campos estão preenchidos e para validar o CPF.

    localStorage.setItem("user-register", registroUsuario);
    localStorage.setItem("password-register", registroSenha);
    localStorage.setItem("cpf-register", registroCpf);
    alert("Você se registrou com sucesso!");
    return true;
    // Armazenando os dados no LocalStorage, e exibindo uma mensagem caso tudo ok
}

function validarCPF(cpf){
    return cpf.length >= 11 && /^[0-9]{11}$/.test(cpf);
}
// Criando uma função para validar se CPF do paciente possui 11 digitos.

function checkLogin(){
    let infoUsuario = document.getElementById("user-info").value;
    let infoSenha = document.getElementById("password-info").value;
    let usuarioGuardado = localStorage.getItem("user-register");
    let senhaGuardado = localStorage.getItem("password-register");
    // puxando os dados

    if(infoUsuario.trim() === usuarioGuardado.trim() && infoSenha.trim() === senhaGuardado) {
        // Corrigindo bugs com trim e verificando se é correspondente ao que está no localStorage
        alert("Você obteve êxito ao realizar o login! :)");
        window.location.href = "#";
    }else{
        alert("Tivemos um problema. Suas credenciais podem estar inválidas.");
    }
}
// Função para validar as credenciais do usuário, verificar se é correspondente ao que está armazenado, para efetur o login.

// Abaixo API para login com Google
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "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",
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
            type: "standard",
            shape: "rectangular",
            theme: "outline",
            text: "signin_with",
            size: "large",
            locale: "pt-BR"
        }
    );
}
// Código API disponibilizado pela Google, com alterações somente acrescentando meu cliente id
