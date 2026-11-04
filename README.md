# ☕ Aroma & Arte Cafeteria

Website responsivo e interativo desenvolvido como Trabalho Prático (TP Final) de Desenvolvimento Web na Fatec Praia Grande.

🔗 **Acesse o site online (GitHub Pages):** [https://cacique22.github.io/aroma-arte-cafeteria/](https://cacique22.github.io/aroma-arte-cafeteria/)

---

## 🚀 Demonstração e Estrutura de Páginas

O site é composto por 3 páginas completas e integradas através de hiperlinks:

* **Início (`index.html`):** Apresentação da marca, chamada principal (Hero Section), proposta de valor e diferenciais da cafeteria organizados em cards ilustrativos.
* **Cardápio & Pedidos (`cardapio.html`):** Tabela completa de preços, produtos e volumes, além de um simulador dinâmico de comanda/pedidos.
* **Contato & Localização (`contato.html`):** Dados de contato, horários de atendimento, integração com o Google Maps e formulário de mensagem com validação completa em tempo real.

---

## 📋 Requisitos Atendidos

1. **Mapa do Google:** Iframe responsivo com a localização da cafeteria em Praia Grande - SP.
2. **Tabela:** Tabela estilizada com `caption`, `thead`, `tbody`, zebrado com `:nth-child(even)` e efeito `:hover`.
3. **Imagens:** Imagens temáticas de alta qualidade com proporção consistente e atributos `alt` descritivos.
4. **Menu em todas as páginas:** Cabeçalho persistente em todas as páginas com navegação e destaque visual da página ativa (`class="ativo"`).
5. **Formulário com validação de campos:** Validação no envio e em tempo real (`blur`/`input`) com expressões regulares para nome e e-mail, checagem de telefone com DDD, campos obrigatórios e feedback visual (verde/vermelho).
6. **Comportamento dinâmico em JavaScript:**
   - **Simulador de Pedido Rápido:** Adiciona itens à comanda manipulando o DOM (`document.createElement`, `appendChild`), calcula o valor total em tempo real com formatação de moeda brasileira (`Intl.NumberFormat`), permite remoção item a item (`removeChild`) e limpeza total com laço `while(hasChildNodes())`.
   - **Menu Mobile:** Alternância da barra de navegação em telas menores (`classList.toggle`).
7. **Navegação por hiperlinks:** Interligação direta entre os arquivos HTML.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>`, `<footer>`).
- **CSS3:** Variáveis de cores (CSS Custom Properties), Flexbox, CSS Grid, animações de transição e responsividade via Media Queries (sem frameworks pesados).
- **JavaScript (Vanilla):** Manipulação direta da árvore DOM, tratamento de eventos (`addEventListener`) e lógica de negócios no cliente.

---

## 💻 Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Cacique22/aroma-arte-cafeteria.git
   ```
2. Abra o arquivo `index.html` em qualquer navegador web moderno.
