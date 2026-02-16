const dataInput = document.querySelectorAll(".input-wrapper input");

// percorre todos os inputs da lista

dataInput.forEach((input) => {
  // observa os valores digitados pelo usuário
  input.oninput = () => {
    // pega o valor digitado e remove tudo que não for número
    let value = input.value.replace(/\D/g, "");

    // limita o valor a no máximo 3 caracteres e atualiza o input
    input.value = value.slice(0, 3);
  };
});
