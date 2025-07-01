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
 
  document.getElementById('btnSalvar').addEventListener('click', function () {
    const nome = document.getElementById('nome').value.trim();
    const cep = document.getElementById('cep').value.trim();
  
    if (nome === '' || cep.length !== 8) {
      alert('Preencha um nome válido e um CEP com 8 dígitos.');
      return;
    }
  
    localStorage.setItem(nome, cep);
    alert(`Salvo com sucesso: ${nome} => ${cep}`);
  });
  
  document.getElementById('btnListar').addEventListener('click', listarCEPsSalvos);

function listarCEPsSalvos() {
  const lista = document.getElementById('listaCeps');
  lista.innerHTML = ''; 

  if (localStorage.length === 0) {
    lista.innerHTML = '<p class="text-muted">Nenhum CEP salvo.</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.classList.add('list-group');

  for (let i = 0; i < localStorage.length; i++) {
    const nome = localStorage.key(i);
    const cep = localStorage.getItem(nome);
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `${nome} → ${cep}`;
    ul.appendChild(li);
  }

  lista.appendChild(ul);
}
