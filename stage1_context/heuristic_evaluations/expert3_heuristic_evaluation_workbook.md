<!-- This Heuristic Evaluation Workbook replicates the one proposed by the 
Nielsen Norman Group available at: https://media.nngroup.com/media/articles/attachments/Heuristic_Evaluation_Workbook_-_Nielsen_Norman_Group.pdf
-->

**Evaluator**: [Tiago Melo]
**Date**: [23-02-2025]
**Product**: [AutoDoc]

---

Severity Scale adopted: [[severity_scale_heuristic_evaluation]]
Summary of each usability heuristic: [here](https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1-compressed.pdf)

# 1 Visibility of System Status
>   Não existe nada que diga ao utilizador quando se clica no botão de pesquisar se a peça/veículo está a ser pesquisada ou não.
>
>   Quando se elimina um veículo da garagem não é apresentada nenhuma mensagem com feddback.
>   
>   De resto, o design do site comunica corretamente o estado do sistema e apresenta feedback das ações realizadas pelo utilizador
>

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
| Falta de feeback quando é efetuada uma pesquisa | 2            | Adicionar um simbolo que represente que a pesquisa está a acontecer               |
| Falta de feeback do que acontece quando um veículo é eliminado da garagem   | 2            | Adicionar um pop-up que de feedback ao utilizador               |

# 2 Match Between System and The Real World
>   Quando se acede ao site a informação é apresentada na lingua do utilizador e é utilizada linguagem comum o que facilita a compreensão e navegação do site.
>
>   Tirando uma ocasião em que é utilizado o termo modificação aquando da pesquisa por um veículo, não sendo o vocabulário mais adequado para descrever o que é que é suposto dizer.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
| É utilizado o termo modificação aquando da pesquisa de um veículo que é um pouco confuso | 1            | Utilizar o termo especificação por exemplo               |

# 3 User Control and Freedom
>   Na maioria dos casos não existe um botão visivel para voltar atrás ou cancelar ações. Apesar disso a prática comum de utilizar o logo do site para voltar á página inicial está implementada.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
| Tirando o processo de compra não existe nenhuma instância onde exista um botão de retroceder | 2            | Aplicar mais o uso do botão de retroceder               |
| Na aba Os meus veículos não existe um botão para eliminar um veículo da garagem   | 2            | Adicionar a funcionalidade de eliminar um veículo através da aba Os meus veículos               |
| Não é possível eliminar um item do carrinho através do dropdown do menu principal | 2 | Acrescentar um botão que o permita fazer | 

# 4 Consistency and Standards
>   O sistema segue as convenções da industria na pesquisa por veiculo sendo por matricula ou por modelo.
>
>   Faz uso de simbolos facilmente reconheciveis e um uso de cores consistente.
>
>   Utiliza também uma estrutura tipica de um Website o que facilita a sua navegação.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
# 5 Error Prevention
>   O sistema faz uso de mensagens de erro adequadas quando o utilizador comete algum erro como introduzir uma matricula inválida, ou não preencher algum campo adequadamente.
>
>   O checkout está dividido em diferentes fases o que diminui a quantidade de informação que o utilizador consome de uma vez, e visto que é uma fase critica é importante para diminuir a quantidade de acidentes.
>
>   Quando se adiciona uma peça ao carrinho é exibido um pop-up informando o utilizador que adicionou um produto ao carrinho.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |

# 6 Recognition Rather than Recall
>   O sistema exibe toda a informação necessária para o utilizador o poder usar sem grandes dificuldades. Os produtos estão dividios em categorias e o processo de procura por um veiculo em especifico pode ser feito de duas maneiras sendo ambas intuitivas.
>
>   A funcionalidade da Garagem é que pode gerar confusões pois tem dois pontos de acesso e cada um leva a uma representação diferente. Enquanto o botão no menu principal demonstra os veiculos que estão na garagem, tem a funcionalidade de adicionar novos veiculos e também de remove-lose procurar peças especificas a esse veículo, a aba Os meus Veiculos não possibilita a remoção de veículos.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
| Incoerência nas duas representações da garagem | 2            | Uniformizar a Garagem e a aba Os meus veículos               |
# 7 Flexibility and Efficiency of Use
>   A lista de desejos está escondida atrás no botão O meu AutoDoc o que pode ser frustante para novos utilizadores.
>
>   O facto de um veículo poder ser procurado tanto por matrícula como por modelo é uma mais valia pois pode facilitar a utilização do sistema por novos utilizadores.
>
>   Através da página inicial é possível aceder a todas as funcionalidades mais importantes como o carrinho, a garagem, a área pessoal, etc...
>
>   O site é personalizável ao utilizador pois após um veículo ser adicionado á garagem as peças procuradas são destinadas a esse veículo.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
| Lista de desejos escondida | 1            | Colocar um botão para a lista de desejos no menu principal junto ao carrinho               |
# 8 Aesthetic and Minimalist Design
>   O site apresenta toda a informação importante no menu principal mas tenta mostrar muitas coisas ao mesmo tempo como por exemplo uma secção para pesquisar um veículo, uma secção para as categorias de peças, outra para as marcas mais populares, outra para os produtos mais vendidos, outra para os melhores fabricantes. Apesar de ter informação ser no geral uma coisa boa, em certos casos pode ser um pouco de mais.
>
>   Existe também um slide de imagens logo no início do menu principal que influencia os utilizadores a usarem o site, o que numa primeira utilização pode dar jeito mas depois torna-se distrativo.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
| O menu principal contem muita informação | 1            | Reduzir a quantidade de informção no menu principal               |
| O slide de imagens no menu principal é distrativo   | 2            | Colocar o slide num pop-up para que só seja visto uma vez               |
# 9 Help Users Recognize, Diagnose, and Recover from Errors
>   As mensagens de erro são percetiveis e seguem as normas gerais, e também oferecem uma solução quando possível

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |

# 10 Help and Documentation
>   Na barra de pesquisa para procurar por uma peças existe um botão que oferece informação detalhada sobre como proceder, o que pode ser bastante útil para novos utilizadores.
>   
>   O site possui também uma secção de apoio ao cliente no fim do página principal como é habitual. Esta secção tem para além de informação sobre o site e suporte ao cliente, vídeos e guias.
>
>   Possui tambémm um chat que pode ser utilizado para tirar dúvidas ou obter informação que não seja demonstrada no site.

| **Issue**       | **Severity** | Recommendation |
| --------------- | ------------ | -------------- |
