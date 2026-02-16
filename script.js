const dataInput = document.querySelectorAll(".input-wrapper input");
const form = document.querySelector("form");

const amountInput = document.getElementById("amount");
const initialInput = document.getElementById("initial");
const finalInput = document.getElementById("final");
const noRepeatCheckbox = document.getElementById("checkbox");

const drawingScreen = document.querySelector(".drawing-screen");
const dataDraw = document.querySelector(".data-draw");
const resultScreen = document.querySelector(".result-screen");
const titleResult = document.querySelector(".title-result");

// percorre todos os inputs da lista
dataInput.forEach((input) => {
  // observa os valores digitados pelo usuário
  input.oninput = () => {
    let value = input.value.replace(/\D/g, ""); // pega o valor digitado e remove tudo que não for número
    input.value = value.slice(0, 3); // limita o valor a no máximo 3 caracteres e atualiza o input
  };
});

// evento de envio do formulário
form.onsubmit = (event) => {
  event.preventDefault(); // impede o carregamento de envio do formulário

  // chama a função de validação do formulário e, se retornar false, interrompe a execução
  if (!validateForm()) {
    return;
  }

  // converte os valores dos inputs para números inteiros
  const amount = parseInt(amountInput.value);
  const initial = parseInt(initialInput.value);
  const final = parseInt(finalInput.value);

  const resultNumbers = generateNumbers(amount, initial, final);

  // chama a função para exibir os números sorteados
  displayNumbers(resultNumbers);
};

// função para mostrar a mensagem de alerta de erro
function showAlertMessage(message) {
  const alertMessage = document.querySelector(".alert-message");

  const alertIcon = document.createElement("img");
  alertIcon.src = "/assets/icon-error.svg";
  alertIcon.alt = "Erro";

  const closeIcon = document.createElement("img");
  closeIcon.id = "close-icon";
  closeIcon.src = "/assets/icon-close.svg";
  closeIcon.alt = "Fechar";

  alertMessage.textContent = message;
  alertMessage.classList.remove("invisible"); // torna a mensagem visível

  alertMessage.prepend(alertIcon);
  alertMessage.appendChild(closeIcon);

  // adiciona um evento de clique ao ícone de fechar para esconder a mensagem
  closeIcon.onclick = () => {
    alertMessage.classList.add("invisible");
  };

  setTimeout(() => {
    alertMessage.classList.add("invisible");
  }, 5000); // esconde a mensagem após 5 segundos
}

// função para validar o formulário
function validateForm() {
  const amount = parseInt(amountInput.value);
  const initial = parseInt(initialInput.value);
  const final = parseInt(finalInput.value);

  // condições de validação: verifica se os campos estão preenchidos e se o valor inicial é menor que o valor final
  if (!amount || !initial || !final) {
    showAlertMessage("Por favor, preencha todos os campos.");
    return false;
  } else if (initial >= final) {
    showAlertMessage("O valor inicial deve ser menor que o valor final.");
    return false;
  } else {
    return true;
  }
}

// função para gerar números aleatórios com repetição;
function generateRandomNumbers(amount, initial, final) {
  const numbers = [];
  const range = final - initial + 1;
  for (let i = 0; i < amount; i++) {
    numbers.push(Math.floor(Math.random() * range) + initial);
  }

  return numbers;
}

// função para gerar números aleatórios sem repetição;
function generateNumbers(amount, initial, final) {
  if (noRepeatCheckbox.checked) {
    const numbers = new Set();
    const range = final - initial + 1;
    if (amount > range) {
      showAlertMessage(
        "A quantidade de números excede o intervalo disponível.",
      );
      return [];
    }

    while (numbers.size < amount) {
      const randomNum = Math.floor(Math.random() * range) + initial;
      numbers.add(randomNum);
    }

    return Array.from(numbers);
  } else {
    return generateRandomNumbers(amount, initial, final);
  }
}

let DrawNumber = 0; // variável para contar o número de sorteios realizados

function displayNumbers(numbers) {
  try {
    dataDraw.classList.add("invisible"); // esconde a tela de formulario

    resultScreen.classList.remove("invisible"); // mostra a tela de resultado
    resultScreen.classList.add("grid");

    resultScreen.innerHTML = ""; // limpa o conteúdo da tela de resultado para o próximo sorteio

    // cria o título do resultado dinamicamente para cada sorteio
    const titleResult = document.createElement("header");
    titleResult.classList.add("title-result", "flex");
    titleResult.innerHTML = `<h2>Resultado do sorteio:</h2>`;

    const numberResults = document.createElement("p");
    numberResults.textContent = `${DrawNumber + 1}° resultado`;
    titleResult.appendChild(numberResults);
    resultScreen.prepend(titleResult);

    const numbersContainer = document.createElement("div");
    numbersContainer.classList.add("number-container");
    resultScreen.append(numbersContainer); // adiciona o container de números à tela de resultado

    // adiciona o container de números ao container principal

    // variável para controlar o índice do número a ser exibido
    let indexNum = 0;

    const showNumbers = () => {
      // verifica se ainda há números para exibir
      if (indexNum < numbers.length) {
        // cria os elementos para exibir o número sorteado
        const numberContent = document.createElement("div");
        numberContent.classList.add("number-content");

        const boxNumber = document.createElement("div");
        boxNumber.classList.add("box-number");

        const numberSorted = document.createElement("output");
        numberSorted.classList.add("draw-result");
        numberSorted.setAttribute("aria-live", "polite");
        numberSorted.textContent = numbers[indexNum]; // exibe o número sorteado atual

        numberContent.appendChild(boxNumber);
        numbersContainer.append(numberContent);
        numberContent.append(numberSorted);
        indexNum++;
        setTimeout(showNumbers, 3500); // Método que exibirá os números com um atraso para a animação
      } else {
        const buttonNewDraw = document.createElement("div");
        buttonNewDraw.classList.add("button-new-draw");
        const button = document.createElement("button");
        const playIcon = document.createElement("img");
        const circleIcon = document.createElement("img");
        button.type = "submit";
        button.textContent = "Sortear novamente";
        playIcon.src = "/assets/play.svg";
        playIcon.alt = "Play";
        circleIcon.src = "/assets/circle.svg";
        circleIcon.alt = "Circle";
        buttonNewDraw.style.opacity = 0;

        button.appendChild(playIcon);
        button.appendChild(circleIcon);
        buttonNewDraw.appendChild(button);
        resultScreen.append(buttonNewDraw);

        setTimeout(() => {
          buttonNewDraw.style.opacity = 1;
        }, 400);

        button.onclick = () => {
          // limpa a tela de resultado para o próximo sorteio
          numbersContainer.innerHTML = "";
          displayNumbers(numbers); // chama a função para exibir os números novamente
        };
      }
    };

    showNumbers(); // inicia a exibição dos números sorteado
    DrawNumber++; // incrementa o número do sorteio para o próximo resultado
  } catch (error) {
    showAlertMessage(
      "Ocorreu um erro ao exibir os números. Por favor, tente novamente.",
    );
    console.error("Erro ao exibir os números:", error);
  }
}
