[Back to main Logbook Page](../hci_logbook.md)

---
# B. Stage 1 - Context Definition


# B.1. Competitor Identification
>	The competitor analysis will entail an identification of all competitors, with brief descriptions and a collection of the look and feel of their solutions, e.g., with screenshots, etc. It will also include a detailed analysis of the competitor deemed the best or more representative. It ends with a summary of the main findings including an HCI SWOT analysis



## B.1a. Competitors


| **Competitor**    | **Description**                             | Information repository              |
| ----------------- | ------------------------------------------- | ----------------------------------- |
| [Amazon Shoes]    | [Online platform selling shoe laces]        | [[Competitor Analysis AmazonShoes]] |
| [Fnac Atacadores] | [Smartphone app to buy and sell shoe laces] |                                     |
| ...               |                                             |                                     |




## B.1b. Detailed Competitor Analysis
>	Choose the most notable competitor and do a more thorough analysis of their interactive solution


### - Heuristic Evaluation

#### Method
[ Describe the method used for the heuristic evaluation: procedure, number of experts, heuristics, severity scale considered, how was consensus done.]


#### Individual Evaluations
<!-- For the individual heuristic evaluations by each member of the group, you can use the templates below, grouping problems by heuristic OR each evaluator can have a table listing all the detected problems with the number of the violated heuristics on the second column. Whichever your choice, you should have a list of problems, the severity, and a recommendation to mitigate it -->



- [expert1_heuristic_evaluation_workbook](heuristic_evaluations/expert1_heuristic_evaluation_workbook.md)

- [expert2_heuristic_evaluation_workbook](heuristic_evaluations/expert2_heuristic_evaluation_workbook.md)

- [expert3_heuristic_evaluation_workbook](heuristic_evaluations/expert3_heuristic_evaluation_workbook.md)


#### Consensus

>	After the individual analysis by each expert, all results should be gathered in a consensus table. If an expert has not found any of the problems found by other experts, they should analyse it, at this point, and give it a severity.

| **Issue**       | **Expert 1** | Expert 2 | Expert 3 | Recommendations                             |
| --------------- | ------------ | -------- | -------- | ------------------------------------------- |
| Something wrong | 3            | 1        | 0        | Something could be done to the button to... |
| Another thing   | 4            | 3        | 4        | Other thing to recommend                    |
| ...             |              |          |          |                                             |



---
### - Cognitive Walkthrough

#### Method
O método utilizado consistiu em dividir cada tarefa entre os elementos do grupo e, à medida que a executávamos, registávamos todos os passos realizados, guardando-os como sub-tarefas.

#### Task Selection and Task Analysis
As tarefas foram selecionadas com base nas funcionalidades mais utilizadas e na experiência inicial ao abrir a página, de modo a simular a navegação de um utilizador comum.


| Task                          | Subtasks                                |
| ----------------------------- | --------------------------------------- |
| **1. Comprar uma peça**       | Localizar tipo de peça                  |
|                               | Filtrar os resultados                   |
|                               | Escolher a peça                         |
|                               | Adicionar ao carrinho                   |
|                               | Criar conta                             |
|                               | Selecionar método de pagamento          |
|                               | Confirmar a compra                      |

| Task                          | Subtasks                                |
| ----------------------------- | --------------------------------------- |
| **2. Pesquisar por matrícula** | Localizar campo de busca da matrícula   |
|                               | Escrever uma matrícula existente no formato correto |
|                               | Clicar em pesquisar                     |

| Task                          | Subtasks                                |
| ----------------------------- | --------------------------------------- |
| **3. Pesquisar pelo modelo**  | Escolher as especificações
|                               | Clicar em pesquisar                     |

| Task                          | Subtasks                                |
| ----------------------------- | --------------------------------------- |
| **4. Criar conta**            | Localizar ícone de criar conta/iniciar sessão |
|                               | Caso já tenha conta, inserir email e password para iniciar sessão |
|                               | Para criar conta, selecionar a opção "Registe-se" |
|                               | Preencher os campos com Nome, Apelido, Email e Palavra-passe |
|                               | Efetuar o registo                       |

| Task                          | Subtasks                                |
| ----------------------------- | --------------------------------------- |
| **5. Adicionar carros à garagem** | Clicar em "Minha Garagem"             |
|                               | Escolher tipo de veículo (passageiros, camião, moto) |
|                               | Introduzir matrícula e clicar em pesquisa |

| Task                          | Subtasks                                |
| ----------------------------- | --------------------------------------- |
| **6. Procurar por peça usando a barra de pesquisa** | Localizar a barra de pesquisa no topo do site |
|                               | Inserir o número da peça ou nome        |
|                               | Clicar em pesquisar                     |



#### Results

### **Task 1: Comprar uma peça**

| Step # | Task/Action to Perform | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Notes | Is Action Successful? (Yes/No) | Suggestions for Improvement |     |
| ------ | ---------------------- | ------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- | ----- | ------------------------------ | --------------------------- | --- |
| 1      | Localizar tipo de peça   | No                                         | Ao deslizar para baixo, temos acesso ao catálogo de todas as peças        | Yes                                                                                  | É logo redirecionado para a página da peça      | Yes                      | O catálogo podia estar mais visível              |     |
| 2      | Filtrar os resultados   | Yes                                         | O menu de filtro está no local habitual       | Yes                                                                                 | O menu de filtro é atualizado       | Yes                       | Nenhuma              |     |
| 3      | Escolher a peça   | Yes                                         | As peças aparecem na mesma página      | Yes                                                                                  |       | Yes                       | Podia arranjar uma ferramenta de comparação de peças                |     |
| 5      | Adicionar ao carrinho        | Yes/No                                         | Apenas aparece o botão "Comprar", no entanto o icon de carrinho ajuda a indicar que vai haver alguma alteração no carrinho      | Yes                                                                                | Ao clicar no botão de "Comprar" aparece um pop-up no lugar do carrinho a indicar que foi adicionado       | Yes                       | Nenhuma               |     |
| 6      | Criar conta        | Yes                                        | Apesar de não ser obrigado a criar conta     | Yes                                                                                  | Na parte superior da tela, conseguimos ver os passos que faltam para finalizar a compra, sendo que este é um deles      | Yes                       | Nenhuma               |     |
| 7      | Selecionar método de pagamento        | Yes                                         |       | Yes                                                                                  | Mais uma vez a barra de progresso na parte superior da tela mostra o progresso até à compra       | Yes                       | Nenhuma               |     |
| 8      | Confirmar a compra        | Yes                                         | O utilizador tem um botão que permite confirmar a compra      | Yes                                                                                 | A página muda, mostrando uma mensagem com o número da encomenda      | Yes                      |                |     |



### **Task 2: Pesquisar por matrícula**

| Step # | Task/Action to Perform | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Notes | Is Action Successful? (Yes/No) | Suggestions for Improvement |     |
| ------ | ---------------------- | ------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- | ----- | ------------------------------ | --------------------------- | --- |
| 1      | Localizar campo de busca da matrícula   | No                                        | É a parte com mais destaque ao entrar na página      | Yes                                                                                  |       | Yes                       | Nenhuma              |     |
| 2      | Escrever uma matrícula existente no formato correto   | Yes                                         | Caso escreva uma matrícula inválida aparece uma janela pop-up a avisar      | Yes                                                                                 |      | Yes                      | Nenhuma              |     |
| 3      | Clicar em pesquisar    | Yes                                       |       | Yes                                                                                  | É redirecionado para a página do veículo      | Yes                     | Nenhuma              |     |



### **Task 3: Pesquisar pelo modelo**

| Step # | Task/Action to Perform | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Notes | Is Action Successful? (Yes/No) | Suggestions for Improvement |     |
| ------ | ---------------------- | ------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- | ----- | ------------------------------ | --------------------------- | --- |
| 1      | Escolher as especificações   | Yes                                         | É bem visível a alternativa a pesquisar por matrícula      | Yes                                                                                 |       | [Yes/No]                       | Nenhuma             |     |
| 2      | Clicar em pesquisar    | Yes                                       |       | Yes                                                                                  | É redirecionado para a página do veículo       | Yes                     | Nenhuma              |     |



### **Task 4: Criar conta**

| Step # | Task/Action to Perform | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Notes | Is Action Successful? (Yes/No) | Suggestions for Improvement |     |
| ------ | ---------------------- | ------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- | ----- | ------------------------------ | --------------------------- | --- |
| 1      | Localizar ícone de criar conta/iniciar sessão   | No                                         | O botão de iniciar sessão está no local habitual      | Yes                                                                                  |       | Yes                     | Nenhuma              |     |
| 2      | Caso já tenha conta, inserir email e password para iniciar sessão   | Yes                                         |       | Yes                                                                                  |       | Yes/No                       | Nenhuma              |     |
| 3      | Para criar conta, selecionar a opção "Registe-se"   | Yes                                        | Como de costume nas páginas de login há uma mensagem que permite criar conta      | Yes                                                                                | É apresentado um pop-up com os campos para criar conta       | Yes                     | Nenhuma              |     |
| 4      | Preencher os campos com Nome, Apelido, Email e Palavra-passe   | Yes                                        |       | Yes                                                                                 |       | Yes                      | Seria recomendável que avisasse o utilizador sobre a segurança da palavra-passe              |     |
| 5      | Efetuar o registo"   | Yes                                        |       | Yes                                                                                 | É redirecionado para o perfil      | Yes                      | Nenhuma             |     |


### **Task 5: Adicionar carros à garagem**

| Step # | Task/Action to Perform | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Notes | Is Action Successful? (Yes/No) | Suggestions for Improvement |     |
| ------ | ---------------------- | ------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- | ----- | ------------------------------ | --------------------------- | --- |
| 1      | Clicar em "Minha Garagem"    | No                                         | Não é muito intuitívo, requer que o utilizador explore um bocado as funcionalidades do site      | Yes                                                                                  | Aparece um pop-up para adicionar um veículo à garagem      | Yes                      | Indicar que é possível esta funcionalidade através de uma dica visual               |     |
| 2      | Escolher tipo de veículo (passageiros, camião, moto)   | Yes                                         |       | Yes                                                                                  | Na parte superior do pop-up aparece destacado o tipo de veículo selecionado      | Yes                      | Nenhuma             |     |
| 3      | Introduzir matrícula e clicar em pesquisa   | Yes                                         |       | Yes                                                                                  | Apenas redireciona para a página das peças daqueles veículo, não indica que foi adicionado à garagem       | Yes                       | Apresentar uma mensagem a indicar que o veículo foi adicionado à garagem            |     |



### **Task 6: Procurar por peça usando a barra de pesquisa**

| Step # | Task/Action to Perform | Will User Know What to do at this step? (Yes/No) | Notes | If the user does the right thing, will they know it is progressing towards goal? (Yes/No) | Notes | Is Action Successful? (Yes/No) | Suggestions for Improvement |     |
| ------ | ---------------------- | ------------------------------------------------ | ----- | ----------------------------------------------------------------------------------------- | ----- | ------------------------------ | --------------------------- | --- |
| 1      |  Localizar a barra de pesquisa no topo do site   | No                                      | A barra de pesquisa está no local habitual      | Yes                                                                                 | Ao clicar na barra de pesquisa o aspeto do site muda, focando-se na barra      | Yes                    | Nenhuma              |     |
| 2      | Inserir o número da peça ou nome   | Yes                                         | Em princípio, um utilizador que está a utilizar a barra de pesquisa sabe a peça específica que está a procurar, no entanto, o site apresenta na mesma um menu com os tipos de peças. Apresenta também um "Exemplo" ajudando os utilizadores como utilizar a barra.       | Yes                                                                                 | Vão aparecendo os resultados com nome similiar ao introduzido      | Yes                       | Nenhuma             |     |
| 3      | Clicar em pesquisar   | Yes                                         |       | No                                                                                  | Não há nenhum indicativo que o site está a procurar por resultados      | Yes                       | Apresentar uma mensagem 'A pesquisar...' ou um ícone que simbolize ao utilizador que o site está à procura de resultados           |     |


## B.1c. Overall Analysis

Após a análise dos concorrentes, identificámos vários aspetos positivos que podem influenciar o design da nossa solução. Algumas das principais conclusões incluem:

- ### Pesquisa por matrícula: 
Esta funcionalidade facilita a navegação e torna a pesquisa mais intuitiva para utilizadores que não têm conhecimento específico sobre peças de automóveis.

- ### Garagem virtual:
A possibilidade de guardar veículos numa garagem digital permite um acesso mais rápido e personalizado às peças adequadas de cada utilizador, tornando o processo de compra mais eficiente.

- ### Interface intuitiva:
Os componentes analisados apresentam uma estrutura clara e familiar, com menus bem organizados e filtros eficientes. O design simples e intuitivo também será essencial no nosso site.

### Conclusão
No entanto, a maior vantagem do nosso produto será a possibilidade de **marcar inspeções em diversas oficinas**, uma funcionalidade que o concorrente analisado não oferece. Além disso, iremos **incorporar os aspetos positivos** identificados na análise da concorrência e **corrigir algumas das suas limitações**, garantindo uma solução mais completa e eficiente para os utilizadores.


# Análise SWOT

# Strengths

>   - O nosso projeto oferece uma funcionalidade que outros sites como o AutoDoc não tem, sendo esta a possibilidade de agendar uma inspeção ou arranjo do carro pessoal do utilizador.
>   - Como o nosso projeto vai ser algo mais local, existe a possibilidade de estabelecer parcerias locais exclusivas com oficinas e fornecedores regionais, oferecendo um serviço mais personalizado e um atendimento mais próximo ao cliente.
>   - Como é algo mais local o nosso serviço poderá responder melhor às necessidades desse mercado do que uma plataforma global.

# Weaknesses

>   - Como já existem outras plataformas já consolidadas e com uma forte presença no mercado, inicialmente o nosso projeto necessitará de um investimento em branding e marketing para poder ganhar notoriedade.
>   - As plataformas já estabelecidas no mercado tem uma oferta muito vasta de peças e fornecedores o poderá ser difícil igualar inicialmente. Com isso poderão também surgir problemas de falta de stock o que levará ao aumento do tempo de entregas.
>   - Ter preços competitivos com outras plataformas já estabelecidas no mercado é extremamente difícil.

# Opportunities

>   - A possibilidade de integrar oficinas locais e permitir agendamentos automatizados pode transformar a plataforma numa solução completa para manutenção automóvel, indo além da simples venda de peças.
>   - O atendimento personalizado pode ser um grande fator de diferenciação. Enquanto grandes plataformas têm um suporte mais impessoal, o nosso projeto pode apostar num serviço mais próximo e especializado.
>   - Trabalhar diretamente com distribuidores e fabricantes locais pode permitir obter preços mais competitivos e oferecer uma seleção de produtos diferenciada.

# Threats

>   - A concorrência com empresas já bem estabelecidas pode dificultar a aquisição de novos clientes e o crescimento da plataforma.
>   - Empresas já estabelecidas no mercado podem recorrer a estratégias agressivas de preços e promoções.
>   - O sucesso da plataforma dependerá de uma boa rede de fornecedores e oficinas locais, a falta disso pode afetar negativamente a experiência do utilizador e a credibilidade da plataforma.
>   - Como o nosso projeto é algo mais local, o mercado-alvo é menor que o de outras empresas globais o que pode dificultar o crescimento.
>   - Os consumidores podem preferir comprar em plataformas maiores e mais conhecidas ou em marketplaces.


# B.2. Users
>	For the users, there are two goals: 1) understand the current status of users in the domain you are addressing. How do they manage, what are the main tasks they do, if they use some tool for the purpose, what are current challenges, what might be improved, what might be new features, ...


## B.2a. Method

A abordagem utilizada para a realização das entrevistas foi a interação direta e pessoal com os utilizadores. Durante as conversas, os entrevistadores procuraram manter um ambiente descontraído e amigável, observando também as expressões e sinais corporais dos participantes. A amostra de utilizadores foi variada, incluindo colegas de curso, familiares e amigos de diferentes idades e com variados níveis de conhecimento sobre peças automóveis. Alguns entrevistados tinham experiência prévia na área, enquanto outros não.

O principal objetivo das entrevistas foi identificar quais funcionalidades são mais valorizadas pelos utilizadores ao pesquisar e comprar peças de automóveis online. Também foram exploradas as dificuldades e desafios enfrentados pelos utilizadores durante este processo, além de possíveis melhorias e novas funcionalidades que poderiam ser incorporadas.

As perguntas feitas durante as entrevistas foram as seguintes:

**Experiência Geral**
- Como costuma pesquisar e comprar peças automóveis online? Pode descrever a sua experiência habitual?
- Já utilizou um site para agendar inspeções ao seu veículo? Se sim, como foi o processo?

**Navegação e Utilização do Site**
- O que torna um site de compra de peças automóveis fácil de usar para si? Que funcionalidades considera essenciais?
- Como prefere pesquisar peças automóveis? Por marca e modelo do veículo, referência da peça, ou outro critério?
- Quais são os maiores desafios que já encontrou ao tentar comprar peças online?

**Processo de Agendamento de Inspeções**
- O que espera encontrar num sistema de agendamento de inspeções? O que tornaria esse processo mais conveniente para si?
- Como prefere receber confirmações e lembretes sobre inspeções agendadas? (Email, SMS, notificação da app, etc.)

**Confiança e Suporte ao Cliente**
- O que influencia a sua decisão de confiar num site para comprar peças ou agendar uma inspeção? Avaliações, garantia, atendimento ao cliente, entre outros?
- Se encontrasse um problema com uma peça ou com o agendamento de uma inspeção, como gostaria que o site lidasse com a situação?
 


## B.2b. Results

>	This section tracks all informal user interviews, summarizing key insights and linking to detailed notes for each session. 

### Interview List 
| Date       | Participant / Role | Key Insights                                                    | Link to Notes                |     |
| ---------- | ------------------ | --------------------------------------------------------------- | ---------------------------- | --- |
| 23-02-2025 | Parent 1     | Trabalha com automóveis, costuma comprar peças online | [📄 Notes](./interviews/interview-anonimo01.md) |     |
| 23-02-2025 | Student 1 | Gosta de automóveis, costuma usar o site AutoDoc   | [📄 Notes](./interviews/interview-anonimo02.md)     |     |
| 22-02-2025 | Student 2 | Costuma arranjar as peças online e faz a manutenção em casa | [📄 Notes](./interviews/interview-anonimo03.md) |     |
| 25-02-2025 | Student 3 | Nunca encomendou peças online     | [📄 Notes](./interviews/interview-anonimo04.md) |     |
| 25-02-2025 | Student 4 | Não tem experiência com carros          |  [📄 Notes](./interviews/interview-student4.md)  |     |
| 25-02-2025 | Student 5 | Nunca encomendou peças online       | [📄 Notes](./interviews/interview-student5.md) |     |

Notas gerais: Nenhum dos participantes alguma vez agendou uma inspeção online.

### Common Themes & Patterns 

- **Recurring Problems:** 
	- Issue 1
	- Issue 2
- **Frequently Used Tools:** 
	- Tool 1
	- Tool 2
- **Desired Features / Solutions:** 
	- Feature 1
	- Feature 2
- --- 



---
[Back to main Logbook Page](../hci_logbook.md)

---
