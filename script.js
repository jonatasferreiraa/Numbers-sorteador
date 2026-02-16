const dataInput = document.querySelectorAll(".input-wrapper input");
const form = document.querySelector("form");

const amountInput = document.getElementById("amount");
const initialInput = document.getElementById("initial");
const finalInput = document.getElementById("final");

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

  validateForm(); // chama a função de validação do formulário

  console.log(
    generateNumbers(amountInput.value, initialInput.value, finalInput.value),
  );
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

// função para gerar números com repetição
function generateNumbers(amount, initial, final) {
  const numbers = [];
  const range = final - initial + 1;
  for (let i = 0; i < amount; i++) {
    numbers.push(Math.floor(Math.random() * range) + initial);
  }

  return numbers;
}
