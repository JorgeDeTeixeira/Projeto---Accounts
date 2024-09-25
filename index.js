// ======================================
// Módulos Externos
// ======================================

// Inquirer: para interações de prompt no terminal
const inquirer = require("inquirer");
// Chalk: para colorir o terminal
const chalk = require("chalk");

// ======================================
// Módulos Internos
// ======================================

// fs: para manipulçao do sistema de arquivos (leitura e escrita de arquivos)
const fs = require("fs");

// ======================================
// Início da Aplicação
// ======================================

// Inicia a operação principal do sistema
operation();

// Função principal que exibe o menu de operações e direciona para a função correspondente
function operation() {
  inquirer
    .prompt([
      {
        type: "list", // Tipo de prompt: Lista de opções
        name: "action", // Nome da resposta
        message: "O que você deseja fazer?", // Mensagem exibida no terminal
        choices: [
          "Criar conta",
          "Consultar saldo",
          "Depositar",
          "Sacar",
          "Sair",
        ], // Opções disponíveis
      },
    ])
    .then((answer) => {
      const action = answer["action"]; // Obtem a ação escolhida pelo usuário

      // Usa um switch para direcionar para a função correspondente
      switch (action) {
        case "Criar conta":
          createAccount();
          break;
        case "Consultar saldo":
          getAccountBalance();
          break;
        case "Depositar":
          deposit();
          break;
        case "Sacar":
          withdraw();
          break;
        case "Sair":
          console.log(
            chalk.bgBlue.black("Obrigado por usar nosso sistema de banco!")
          );
          process.exit(); // Encerra o processo
      }
    })
    .catch((err) => {
      console.log(err); // Exibe erros que possam ocorrer durante o prompt
    });
}

// ======================================
// Funções de Operação
// ======================================

// Função para iniciar a criação de uma nova conta
function createAccount() {
  console.log(chalk.bgGreen.black("Parabéns por escolhar o nosso banco!"));
  console.log(chalk.green("Defina as opções da sua conta a seguir:"));
  buildAccount(); // Chama a função para construir a conta
}

// Função para constuir uma conta solicitando um nome ao usuário
function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName", // Nome da resposta
        message: "Digite um nome para a conta:", // Mensagem exibida no terminal
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"].trim(); // Obtém o nome e remove os espaços em branco;

      // Verifica se a pasta "accounts" não existe e cria se necessário
      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      // Verifica se já existe uma conta com o nome informado
      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("Essa conta já existe! Escolha outro nome!")
        );
        return buildAccount(); // Recursão: pede para criar a conta novamente
      }

      try {
        // Cria um arquivo JSON com o nome da conta e um saldo inicial de 0
        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}');
        console.log(
          chalk.bgGreen.black(
            `Conta criada com sucesso! Bem-vindo ao nosso banco!`
          )
        );
      } catch (err) {
        // Captura e exibe erros que possam ocorrer durante a escrita do arquivo
        console.log(chalk.bgRed.black("Erro ao criar a conta:" + err.message));
      }

      operation(); // Retorna ao menu principal
    })
    .catch((err) => {
      console.log(err.message); // Exibe erros que possam ocorrer durant o prompt
    });
}

// Função para realizar um depósito em uma conta existente
function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName", // Nome da resposta
        message: "Qual o nome da sua conta?", // Mensagem exibida no terminal
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"].trim(); // Obtém o nome e remove os espaços em branco

      // Verifica se a conta existe
      if (!checkAccount(accountName)) {
        return deposit(); // Recursão: pede para depositar novamente
      }

      // Solicita o valor a ser depositado
      inquirer
        .prompt([
          {
            name: "amount", // Nome da resposta
            message: "Quanto você deseja depositar R$:", // Mensagem exibida no terminal
          },
        ])
        .then((answer) => {
          const amount = parseFloat(answer["amount"]); // Convertendo o valor para um número de ponto flutuante

          // Valida se o valor é um número positivo ou válido
          if (isNaN(amount) || amount <= 0) {
            console.log(chalk.bgRed.black("Valor inválido! Tente novamente."));
            return deposit(); // Recursão: pede para depositar novamente
          }

          addAmount(accountName, amount); // Adiciona o valor á conta
        })
        .catch((err) => {
          console.log(err.message); // Exibe erros que possam ocorrer durante o prompt
        });
    })
    .catch((err) => {
      console.log(err); // Exibe erros que possam ocorrer durante o prompt
    });
}

// Função para realizar um saque de uma conta existente
function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName", // Nome da resposta
        message: "Qual o nome da sua conta?", // Mensagem exibida no terminal
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"].trim(); // Obtém o nome e remove os espaços em branco

      // Verifica se a conta existe
      if (!checkAccount(accountName)) {
        return withdraw(); // Recursão: pede para sacar novamente
      }

      // Solicita o valor do saque
      inquirer
        .prompt([
          {
            name: "amount", // Nome da resposta
            message: "Quanto você deseja sacar R$:", // Mensagem exibida no terminal
          },
        ])
        .then((answer) => {
          const amount = parseFloat(answer["amount"]); // Convertendo o valor para um número de ponto flutuante

          // Valida se o valor é um número positivo
          if (isNaN(amount) || amount <= 0) {
            console.log(chalk.bgRed.black("Valor inválido! Tente novamente."));
            return withdraw(); // Recursão: pede para sacar novamente
          }

          removeAmount(accountName, amount); // Remove o valor da conta
        })
        .catch((err) => {
          console.log(err); // Exibe erros que possam ocorrer durant o prompt
        });
    })
    .catch((err) => {
      console.log(err); // Exibe erros que possam ocorrer durant o prompt
    });
}

// Função para consultar o saldo de uma conta existente
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName", // Nome da resposta
        message: "Qual o nome da sua conta?", // Mensagem exibida no terminal
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"].trim(); // Obtém o nome e remove os espaços em branco

      // Verifica se a conta existe
      if (!checkAccount(accountName)) {
        return getAccountBalance(); // Recursão: pede para consultar o saldo novamente
      }

      const accountData = getAccount(accountName); // Obtém os dados da conta

      console.log(
        chalk.bgBlue.black(`O saldo da sua conta é de R$${accountData.balance}`)
      );
      operation(); // Retorna ao menu principal
    })
    .catch((err) => {
      console.log(err); // Exibe erros que possam ocorrer durante o prompt
    });
}

// ======================================
// Funções Auxiliares
// ======================================

/**
 * Verifica se a conta existe
 * @param {string} accountName - Nome da conta a ser verificada
 * @returns {boolean} - Retorna true se a conta existe, false caso contrário
 */
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black("Esta conta não existe! Tente novamente!"));
    return false;
  }
  return true;
}

/**
 * Obtém os dados de uma conta a partir do nome
 * @param {string} accountName - Nome da conta
 * @returns {object} - Objeto com os dados da conta
 */
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r", // Modo de leitura
  });

  return JSON.parse(accountJSON); // Converte o JSON para objeto JavaScript
}

/**
 * Adiciona um valor ao saldo da conta
 * @param {string} accountName - Nome da conta
 * @param {number} amount - Valor a ser adicionado
 */
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName); // Obtém os dados atuais da conta
  accountData.balance += amount; // Adiciona o valor ao saldo

  try {
    // Escreve os novos dados da conta no arquivo JSON
    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify(accountData)
    );
    console.log(
      chalk.green(`Foi depositado o valor de R$${amount} reais na sua conta!`)
    );
  } catch (err) {
    console.log(
      // Captura e exibe erros que possam ocorrer durante a escrita do arquivo
      chalk.bgRed.black("Erro ao depositar o valor na conta!" + err.message)
    );
  }

  operation(); // Retorna ao menu principal
}

/**
 * Remove um valor do saldo da conta
 * @param {string} accountName - Nome da conta
 * @param {*} amount - Valor a ser removido
 * @returns
 */
function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName); // Obtém os dados atuais da conta

  // Verifica se há saldo suficiente para o saque
  if (accountData.balance < amount) {
    console.log(
      chalk.bgRed.black("Valor insuficiente para o saque! Tente novamente.")
    );
    return withdraw(); // Recursão: pede para sacar novamente
  }

  accountData.balance -= amount; // Subtrai o valor do saldo

  try {
    // Escreve os novos dados da conta no arquivo JSON
    fs.writeFileSync(
      `accounts/${accountName}.json`,
      JSON.stringify(accountData)
    );
    console.log(
      chalk.green(`Foi sacado o valor de R$${amount} reais da sua conta!`)
    );
  } catch (err) {
    // Captura e exibe erros que possam ocorrer durante a escrita do arquivo
    console.log(
      chalk.bgRed.black("Erro ao sacar o valor da conta!" + err.message)
    );
  }

  operation(); // Retorna ao menu principal
}
