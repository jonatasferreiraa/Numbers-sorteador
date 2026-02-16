const dataInput = document.querySelectorAll(".input-wrapper input");
const form = document.querySelector("form");

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
};
