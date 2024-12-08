
# Especificações do Projeto
 Com o uso do Prisma como ORM para interagir com o banco de dados MySQL, o sistema de registro de horas técnicas se torna ainda mais eficiente e intuitivo. O Prisma oferece uma interface de consulta moderna e fácil de usar, permitindo que os desenvolvedores realizem operações de CRUD de maneira rápida e sem a necessidade de escrever SQL manualmente. Essa abstração não apenas acelera o desenvolvimento, mas também reduz a probabilidade de erros, tornando o sistema mais confiável e estável. Além disso, a geração automática de tipos TypeScript a partir do esquema de banco de dados ajuda a garantir a integridade dos dados e a facilitar a detecção de problemas durante o desenvolvimento.

A combinação do Prisma com NestJS reforça a arquitetura modular do sistema. O Prisma se integra perfeitamente ao NestJS, permitindo que os desenvolvedores organizem as interações com o banco de dados dentro dos serviços, mantendo a lógica de negócios separada dos controladores. Isso resulta em um código mais limpo e fácil de manter, pois cada parte do sistema tem uma responsabilidade bem definida. Assim, quando novas funcionalidades precisam ser adicionadas ou modificações precisam ser feitas, a equipe pode fazê-lo com confiança, sabendo que a estrutura do projeto suportará as mudanças.

Além disso, o Prisma facilita a realização de consultas complexas e a manipulação de relacionamentos entre os dados, o que é particularmente útil em um sistema de registro de horas técnicas. Os usuários podem precisar consultar rapidamente horas trabalhadas, projetos em que estiveram envolvidos ou gerar relatórios detalhados. Com o Prisma, essas operações se tornam mais simples e eficientes, permitindo que os usuários tenham acesso a informações críticas de forma rápida. Em resumo, a escolha do Prisma como ORM, em conjunto com NestJS e MySQL, resulta em uma solução robusta e escalável para o sistema de registro de horas técnicas, que atende às necessidades dos usuários e se adapta facilmente a futuras expansões.


## Arquitetura e Tecnologias

Arquitetura MVC com NestJS e MySQL

| Tecnologia      | Descrição                                                                                                    |
|------------------|-------------------------------------------------------------------------------------------------------------|
| **MVC**          | Padrão de arquitetura de software que separa as responsabilidades da aplicação em três partes principais:   |
|                  | - **Model**: Representa a camada de dados, interagindo diretamente com o banco de dados (MySQL, no nosso caso). |
|                  | - **View**: Responsável pela interface do usuário, exibindo os dados fornecidos pelo controller.           |
|                  | - **Controller**: Atua como intermediário, recebendo as requisições do usuário, manipulando os dados com o modelo e enviando a resposta para a view. |
| **NestJS**       | Framework Node.js progressivo, inspirado no Angular, que promove uma arquitetura limpa e escalável. Facilita a implementação do padrão MVC. |
| **MySQL**        | Sistema gerenciador de banco de dados relacional, amplamente utilizado para armazenar dados estruturados.    |
| **Front-end**    | Next.js é uma estrutura de desenvolvimento que facilita a criação de interfaces de usuário dinâmicas e otimizadas.  |




![MVC](/documentos/img/mvc.png)

## Project Model Canvas
![Project Model Canvas ](/documentos/img/ProjectModelCanvas.png)
## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito                                              | Prioridade |
|------|---------------------------------------------------------------------|------------|
|RF-001| Cadastrar e Autentificar Usuários                                    | ALTA       |
|RF-002|  Associar as horas técnicas e as atividades a projetos específicos ou clientes      | ALTA      |         
|RF-003| Registrar Horas de Trabalho                                          | ALTA       |
|RF-004| Cadastrar as atividades  | ALTA |
|RF-005| Calcular as horas trabalhadas                                        | MÉDIA      |
|RF-006| Gerar relatórios filtrados por cliente, com exportação em XLS e PDF  | MÉDIA      |
|RF-007| Permitir filtrar por cliente e periodo                               | MÉDIA      |
|RF-008| Incluir gráficos no dashboard para visualização dos dados            | BAIXA      |
|RF-009| Permitir que editem seus registros de horas                         | BAIXA      |
|RF-010| Cadastrar clientes com campos de projetos e valor da hora técnica   | BAIXA      |
|RF-011| Criar um usuário admin inicial com permissão para cadastrar novos consultores e permissões |Alta| 
|RF-012| Criar página da landing page|Baixa| 
                                                                                               

### Requisitos Não Funcionais

|ID     | Descrição do Requisito                                                               | Prioridade |
|-------|--------------------------------------------------------------------------------------|------------|
|RNF-001| Performance e Tempo de Resposta - O sistema deve responder a solicitações de registro e consulta de horas em até 2 minutos para garantir uma experiência de usuário eficiente, mesmo durante períodos de alta carga | ALTA       |
|RNF-002| Compatibilidade com Navegadores - O sistema deve ser compatível com os navegadores da web (Chrome, Firefox) nas versões mais recentes, garantindo uma experiência consistente e sem erros em diferentes plataformas e ambientes.  | ALTA       |
|RNF-003| Usabilidade e Interface -O sistema deve proporcionar uma experiência de navegação simples e intuitiva, com menus claros e acessíveis, permitindo que os usuários localizem rapidamente as funcionalidades.| MÉDIA   |
|RNF-004| Segurança de Dados - O sistema deve implementar criptografia de dados em trânsito e em repouso para proteger informações sensíveis, como registros de horas e dados pessoais dos usuários, conforme padrões de segurança da empresa      | MÉDIA      |
|RNF-005| Manutenibilidade -O sistema deve ser projetado com uma arquitetura modular e documentação clara para facilitar a manutenção e a implementação de novas funcionalidades, permitindo atualizações e correções sem causar impacto significativo no funcionamento geral.                 | MÉDIA      |

### Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID | Restrição                                             |
|---|-------------------------------------------------------|
|01 | Limitação de Registro de Horas - O sistema deve limitar o registro de horas a um máximo de 24 horas por dia para cada usuário, evitando o registro de mais horas do que o número total de horas disponíveis em um dia. |
|02 | O sistema deve desconectar automaticamente os usuários após um período definido de inatividade (por exemplo, 30 minutos) para garantir a segurança e evitar acessos não autorizados..
|03 |Limite de Tamanho de Arquivos para Upload - O sistema deve limitar o tamanho dos arquivos que podem ser carregados para um máximo de 10 MB por arquivo, para garantir a performance e evitar problemas de armazenamento e processamento.
|04| O sistema deve limitar o número de tentativas de login mal-sucedidas para evitar ataques de força bruta. Por exemplo, bloquear o usuário por 15 minutos após 5 tentativas falhas consecutivas.
|05|  O sistema deve exigir que as senhas dos usuários sigam regras de complexidade, como no mínimo 8 caracteres, contendo pelo menos uma letra maiúscula, um número e um caractere especial.



## Diagrama de Casos de Uso

Apresentamos o Diagrama de Casos de Uso, referente ao projeto conceitual do sistema.

![Diagrama de Casos de Uso](/documentos/img/Diagrama%20de%20Casos%20de%20Uso%20v4.png)



## Modelo ER (Projeto Conceitual)

Este repositório contém o Modelo Entidade-Relacionamento (ER) referente ao projeto conceitual do sistema. O diagrama descreve as entidades principais, seus atributos e os relacionamentos entre elas, fornecendo uma visão clara e abstrata da estrutura de dados e das interações entre os componentes do sistema.

![ER](/documentos/img/DIAGRAMANV.jpg)


## Projeto da Base de Dados

![Projeto da Base de Dados ](/documentos/img/Diagrama%20ER%20de%20banco%20de%20dados%20QMSA.png)

