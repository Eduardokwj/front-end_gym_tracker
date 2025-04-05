/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/exercicios';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Resposta da API:", data);
        data.exercicios.forEach(item => insertList(item.exercicio, item.series, item.repeticoes, item.peso))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputExercicio, inputSeries, inputRepeticoes, inputPeso) => {
    const formData = new FormData();
    formData.append('nome', inputExercicio);
    formData.append('series', inputSeries);
    formData.append('repeticoes', inputRepeticoes);
    formData.append('peso', inputPeso);
  
    let url = 'http://127.0.0.1:5000/exercicio';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
    const insertButton = (parent) => {
        let button = document.createElement("button");
        button.innerHTML = "Sim";
        button.className = "btn-remover";
        button.onclick = function () {
            let row = this.parentElement.parentElement;
            const nomeItem = row.getElementsByTagName('td')[0].innerHTML;
            if (confirm("Você tem certeza?")) {
                row.remove();
                deleteItem(nomeItem);
                alert("Removido!");
            }
        };
        parent.appendChild(button);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/exercicio?nome=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com nome, quantidade e valor 
    --------------------------------------------------------------------------------------
  */
  const adicionarExercicio = () => {
    let inputExercicio = document.getElementById("nome").value;
    let inputSeries = document.getElementById("series").value;
    let inputRepeticoes = document.getElementById("repeticoes").value;
    let inputPeso = document.getElementById("peso").value;
  
    if (inputExercicio === '') {
      alert("Escreva o nome de um exercício!");
    } else if (isNaN(inputSeries) || isNaN(inputPeso) || isNaN(inputRepeticoes)) {
      alert("Series, repetições e peso precisam ser números!");
    } else {
      insertList(inputExercicio, inputSeries, inputRepeticoes, inputPeso)
      postItem(inputExercicio, inputSeries, inputRepeticoes, inputPeso)
      alert("Item adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (nameExercicio, series, repeticoes, peso) => {
    var item = [nameExercicio, series, repeticoes, peso]
    var table = document.getElementById('tabela-exercicios');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("nome").value = "";
    document.getElementById("series").value = "";
    document.getElementById("repeticoes").value = "";
    document.getElementById("peso").value = "";
  
    removeElement()
  }