function consultaCEP() {
    var cep = document.getElementById('cep').value.replace(/\D/g, '');
    console.log(cep);
    var url = "https://viacep.com.br/ws/" + cep + "/json/";
    console.log(url);
    var request = new XMLHttpRequest();

    request.open('GET', url);
    request.onerror = (e) => {
        document.getElementById('caixa-erro').classList.toggle('fadeIn');
        document.getElementById('erro').innerHTML = 'API OFFLINE OU CEP INVÁLIDO'
    }

    request.onload = () => {
        var response = JSON.parse(request.responseText);

        if (response.erro === true) {
            document.getElementById('caixa-erro').classList.toggle('fadeIn');
            document.getElementById('erro').innerHTML = 'CEP NÃO ENCONTRADO'
        } else {
            console.log(response);
            document.getElementById('logradouro').value = response.logradouro;
            document.getElementById('bairro').value = response.bairro;
            document.getElementById('cidade').value = response.localidade;
            document.getElementById('uf').value = response.uf;
            document.getElementById('logradouro').disabled = true;
            document.getElementById('bairro').disabled = true;
            document.getElementById('cidade').disabled = true;
            document.getElementById('uf').disabled = true;
        }
    }

    request.send();

}

function cadastrar() {
    var candidato = {
        nome: document.getElementById('nome').value,
        nascimento: document.getElementById('nascimento').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero_logradouro').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('uf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        profissao: document.getElementById('profissao').value
    }
    console.log(candidato);
    let enviarCandidato = async (candidato) => {
        const rawResponse = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidato)
        });
        const content = await rawResponse.json();
        console.log(content);
    }
    enviarCandidato(candidato);
}

function mostraEndereco() {
    document.getElementById('caixa_endereco').classList.toggle('is-hidden');
}



