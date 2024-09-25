# Sistema Bancário de Linha de Comando

# Sistema Bancário com Node.js

Este projeto é um **sistema bancário** simples desenvolvido com **Node.js**, que permite a criação de contas bancárias, depósitos, saques e consultas de saldo, tudo através de um terminal de comando interativo.

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
  - [Criar Conta](#criar-conta)
  - [Depositar](#depositar)
  - [Sacar](#sacar)
  - [Consultar Saldo](#consultar-saldo)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Considerações Importantes](#-considerações-importantes)
- [Possíveis Melhorias Futuras](#-possíveis-melhorias-futuras)

---

## 📜 Visão Geral

Este sistema permite simular operações bancárias básicas diretamente no terminal. Ele oferece a capacidade de criar contas, consultar saldos, realizar depósitos e saques. Cada conta bancária é armazenada localmente em arquivos JSON, garantindo a persistência dos dados entre execuções.

## 💡 Funcionalidades

- **Criação de Contas**: Crie uma nova conta informando apenas o nome da conta.
- **Depósitos**: Realize depósitos em contas existentes.
- **Saques**: Saque valores de contas existentes, com validação de saldo.
- **Consulta de Saldo**: Consulte o saldo atual de uma conta.
- **Armazenamento de Dados**: Todas as contas e saldos são armazenados em arquivos JSON, permitindo a persistência dos dados.
- **Interface Interativa**: Usa prompts interativos no terminal para facilitar a interação do usuário.

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina, além de um gerenciador de pacotes como o **npm** ou **yarn**.

```bash
# Para verificar se o Node.js está instalado:
node -v

# Para verificar se o npm está instalado:
npm -v
```

## ⚙️ Instalação

Siga os passos abaixo para rodar o sistema localmente:

Clone este repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```

Acesse a pasta do projeto:

```bash
cd nome-do-repositorio
```

Instale as dependências:

```bash
npm install
```

Agora, você está pronto para executar o projeto.

## 🚀 Uso

Para iniciar o sistema bancário, execute o comando abaixo no terminal:

```bash
node index.js
```

### Criar Conta

- Ao iniciar o sistema, escolha a opção "Criar conta".
- Informe um nome para sua nova conta.
- O sistema criará um arquivo JSON com saldo inicial de R$ 0,00.

### Depositar

- Escolha a opção "Depositar" no menu principal.
- Informe o nome da conta em que deseja depositar.
- Insira o valor que deseja depositar.
- O sistema validará o valor e atualizará o saldo da conta.

### Sacar

- Selecione a opção "Sacar" no menu principal.
- Informe o nome da conta da qual deseja sacar.
- Insira o valor que deseja sacar.
- O sistema validará se há saldo suficiente e subtrairá o valor do saldo da conta.

### Consultar Saldo

- Selecione "Consultar saldo" no menu principal.
- Informe o nome da conta.
- O sistema exibirá o saldo atual da conta no terminal.

## 💻 Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript utilizado para criar o sistema.
- **Inquirer.js**: Biblioteca usada para criar uma interface de linha de comando interativa.
- **Chalk**: Usado para estilizar mensagens no terminal com cores e efeitos.
- **File System (fs)**: Módulo nativo do Node.js usado para leitura e escrita de arquivos (usado para persistência de dados em JSON).

## 📂 Estrutura de Arquivos

A estrutura do projeto é simples e organizada:

```plaintext
.
├── accounts/               # Pasta onde os arquivos JSON das contas são armazenados
├── node_modules/           # Módulos instalados pelo npm
├── index.js                # Arquivo principal do sistema
├── package.json            # Arquivo de configuração do npm com dependências e scripts
├── package-lock.json       # Gerenciamento de versões das dependências
└── README.md               # Documentação do projeto
```

- **index.js**: Contém toda a lógica do sistema bancário.
- **accounts/**: Diretório onde são salvos os arquivos JSON das contas, com suas respectivas informações (saldo).

## ❗ Considerações Importantes

- Cada conta é representada por um arquivo JSON individual na pasta `accounts/`.
- O nome da conta deve ser único. O sistema não permitirá a criação de duas contas com o mesmo nome.
- O sistema de saque realiza uma validação para garantir que o saldo da conta seja suficiente para a operação. Se não houver saldo, a operação será cancelada.

## 🔧 Possíveis Melhorias Futuras

Aqui estão algumas ideias de funcionalidades que podem ser adicionadas no futuro:

- **Autenticação com senha**: Para garantir mais segurança, pode-se implementar uma autenticação com senha antes de realizar operações como saques e depósitos.
- **Histórico de Transações**: Adicionar um log de todas as transações realizadas (depósitos, saques, consultas) para cada conta.
- **Transferências**: Implementar a capacidade de transferir valores entre contas diferentes.
- **Interface Gráfica (GUI)**: Criar uma versão com interface gráfica para usuários que preferem um ambiente mais visual.
- **Relatórios de Saldo**: Gerar relatórios financeiros mensais ou anuais com base nas movimentações das contas.

Obrigado por usar o nosso sistema bancário! 🙌
