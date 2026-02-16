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

form.onsubmit = (event) => {
  event.preventDefault(); // impede o carregamento de envio do formulário

  validateForm(); // chama a função de validação do formulário

  console.log("Formulário enviado com sucesso!"); // mensagem de sucesso (mensagem provisória);
};

function validateForm() {
  const amount = parseInt(amountInput.value);
  const initial = parseInt(initialInput.value);
  const final = parseInt(finalInput.value);

  // condições de validação: verifica se os campos estão preenchidos e se o valor inicial é menor que o valor final
  if (!amount || !initial || !final) {
    alert("Por favor, preencha todos os campos.");
    return false;
  } else if (initial >= final) {
    alert("O valor inicial deve ser menor que o valor final.");
    return false;
  } else {
    return true;
  }
}
