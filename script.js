document.getElementById('cep').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const cep = this.value.trim();
      if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
          .then(response => response.json())
          .then(data => {
            if (!data.erro) {
              document.getElementById('logradouro').value = data.logradouro;
              document.getElementById('complemento').value = data.complemento;
              document.getElementById('bairro').value = data.bairro;
              document.getElementById('localidade').value = data.localidade;
              document.getElementById('uf').value = data.uf;
            } else {
              alert('CEP não encontrado.');
              limparCampos();
            }
          })
          .catch(() => {
            alert('Erro ao buscar o CEP.');
            limparCampos();
          });
      } else {
        alert('CEP inválido. Deve conter 8 dígitos.');
        limparCampos();
      }
    }
  });
  
  function limparCampos() {
    document.getElementById('logradouro').value = '';
    document.getElementById('complemento').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('localidade').value = '';
    document.getElementById('uf').value = '';
  }
  