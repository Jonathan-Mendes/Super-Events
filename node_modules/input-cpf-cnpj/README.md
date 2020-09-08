# `<input-cpf-cnpj/> `

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

A simple [web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components) that wraps a &lt;input/> and validates its content against CPF and CNPJ Brazilian numbers. 

WIP (not ready for production, yet)

It has no dependencies, except it's own compilier. 

### Features:
- No [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM): put your own style
- It's an input type text (you can't change that): `<input type="text"/>`
- Validates as you type firing an event with an bolean telling if the number it's a valid CPF or CNPJ.

### To Do:
- Allows only numbers
- Activate masks by setting a prop
- Tests

### API
- There is only one custom event fired yb this component that's the one that indicates whether the number is CPF/CNPJ valid or not. 
``` typescript
<input valid=yourMethod($event)/>
```
`$event` it's a boolean. 

All other events are from the native input with text type, such as `change` and `input`. You can check [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text) the events and attributes supported by this component. The only exception, it's the `list` attribute from `<input>`, cuz it makes no sense that kind of attribute in a field that does a single text validation. 

To style this component using your own classes or from a CSS framework, use `classes` prop. Something like bellow, using `input` class from [Bulma](https://bulma.io/documentation/form/input/):

```html
<input-cpf-cnpj classes="input"></input-cpf-cnpj>
```

## Using this component

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/input-cpf-cnpj@0.0.3/dist/input-cpf-cnpj.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install input-cpf-cnpj --save`
- Put a script tag similar to this `<script src='node_modules/input-cpf-cnpj/dist/input-cpf-cnpj.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

## Em pt-br:

Um "[web component](https://developer.mozilla.org/en-US/docs/Web/Web_Components)" simples que encapsulta o `<input/>` e valida se seu conteúdo é um número válido de CPF ou CNPJ

Status: em progresso (ainda não é para usar em produção)

Não tem dependências, exceto seu próprio compilador para gerar esse componente. 

### Características:
- Sem [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM): use seu próprio CSS para estilizar o componente
- É um input do tipo "text": `<input type="text"/>`

### Tarefas a serem feitas:
- Permitir somente números
- Ativar ou não máscara para o input ativando através de uma propriedade do componente. 
- Testes

### API
Há apenas um evento personalizado acionado por esse componente que indica se o número é válido ou não pelo CPF / CNPJ.
``` typescript
<input valid=yourMethod($event)/>
```
`$event` é do tipo boolean. 

Todos os outros eventos são do `input` nativo do tipo `text`, como `change` e` input`. Você pode verificar [aqui](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text) os eventos e atributos suportados por este componente. A única exceção, é o atributo `list` de` <input> `, porque não faz sentido esse tipo de atributo em um campo que faz uma única validação de texto.