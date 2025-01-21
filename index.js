const cep = document.querySelector('#cep');
const endereco = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const mensagem = document.querySelector('#mensagem');

cep.addEventListener('focusout', async () => {
    console.log('focus out');

    try {
        const onlyNumber = /^[0-9]+$/;
        const cepValid = /^[0-9]{8}$/;

        if (!onlyNumber.test(cep.value) || !cepValid.test(cep.value)) {
            throw { cep_error: 'Cep invalid' };
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        if (!response.ok) {
            throw await response.json();
        }

        const responseCep = await response.json();

        endereco.value = responseCep.logradouro;
        bairro.value = responseCep.bairro;
        cidade.value = responseCep.localidade;


    } catch (error) {
        if (error?.error_cep) {
            mensagem.textContent = error.cep_error;
            setTimeout(() => {
                mensagem.textContent = "";
            }, 5000);
        }
        console.log(error);

    }
}
) 