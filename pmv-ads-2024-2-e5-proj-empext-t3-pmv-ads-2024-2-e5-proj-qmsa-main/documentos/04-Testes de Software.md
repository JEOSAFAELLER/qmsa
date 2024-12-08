
# Planos de Testes de Software

## Funcionalidades Avaliadas

As funcionalidades a serem avaliadas no sistema de gestão empresarial que está sendo desenvolvido para a QMSA Consultoria serão baseadas nos requisitos principais do sistema e nos módulos que compõem a solução.. Abaixo, detalho as funcionalidades que devem ser testadas e avaliadas em cada módulo:
1. Cadastro de Clientes e Contratos: Avaliar a funcionalidade de gerenciamento de clientes, contratos e condições de pagamento.
2.  Gestão de Custos Mensais: Verificar se o sistema permite o registro e o acompanhamento dos custos mensais de cada cliente, substituindo o uso de planilhas.
3. Relatórios Financeiros: Testar a geração de relatórios financeiros que consolidam dados sobre custos e despesas ao longo de um período.
4. Importação de Dados de Planilhas: Avaliar a funcionalidade que permite importar dados de planilhas Excel, como informações financeiras e custos.
5.  Exportação de Relatórios para Planilhas: Testar a capacidade do sistema de exportar relatatórios e dados gerados para arquivos de planilhas Excel.
6.  Automação de Cálculos: Verificar se o sistema automatiza corretamente cálculos de custos e gera relatórios precisos com base nos dados importados.

   ## Ferramentas Utilizadas para a realização dos testes:

- Trello para gerenciamento e rastreamento de bugs;


- ## Cenários de Testes

Os cenários de testes apresentados a seguir foram selecionados para garantir que os requisitos da aplicação sejam satisfeitos. Cada cenário descreve uma funcionalidade específica da aplicação e como será validada por meio de testes.

### RF- 01. Cadastrar e Autentificar Usuários.

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | Cadastrar e Autentificar Usuários.|
| **Objetivo:** |Realizar corretamente o cadastro de novos usuários, armazenando suas informações de forma segura. |
| **Cenário de Teste** | Cenário 01. Cadastro de usuário com todos os dados válidos; | 
| **Passos para Execução** |1. Navegue até a página de cadastro.; <br> 2. Preencha todos os campos obrigatórios com dados válidos (nome, e-mail, senha forte, confirmação de senha); <br> 3. Clique em "Cadastrar". <br> |  
| **Resultados Esperados:** | O usuário é cadastrado com sucesso, recebe uma mensagem de confirmação, e o sistema direciona o usuário à página de login ou dashboard. |

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** |  Cadastrar e Autentificar Usuários.|
| **Objetivo:** |Verificar que o processo de autenticação (login) funciona conforme o esperado, permitindo apenas o acesso de usuários cadastrados com as credenciais corretas. |
| **Cenário de Teste** | Cenário 02. Cadastro com campos obrigatórios em branco; | 
| **Passos para Execução** |1. Navegue até a página de cadastro.; <br> 2. Deixe um ou mais campos obrigatórios (e-mail, senha, nome) em branco; <br> 3. Clique em "Cadastrar". <br> |  
| **Resultados Esperados:** |O sistema exibe mensagens de erro informando que os campos obrigatórios devem ser preenchidos.|

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | Cadastrar e Autentificar Usuários.|
| **Objetivo:** |Assegurar que erros e exceções sejam tratados adequadamente, como quando um usuário tenta se cadastrar com dados inválidos ou autenticar-se com informações incorretas. |
| **Cenário de Teste** | Cenário 03. Cadastro com e-mail já registrado | 
| **Passos para Execução** |1.Tente cadastrar um novo usuário utilizando um e-mail que já está registrado no sistema; <br>  
| **Resultados Esperados:** |O sistema exibe uma mensagem de erro informando que o e-mail já está em uso e impede o cadastro.|

### RF- 02. Associar as horas técnicas e as atividades a projetos específicos ou clientes 

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | Associar as horas técnicas e as atividades a projetos específicos ou clientes .|
| **Objetivo:** |Verificar se o sistema permite a associação correta de horas técnicas e atividades a projetos ou clientes específicos, garantindo a rastreabilidade e precisão na alocação de recursos e no cálculo de custos.|
| **Cenário de Teste** | Cenário 01.  Garantir que o sistema permita a associação de horas técnicas e atividades a projetos ou clientes específicos.
| **Passos para Execução** |1. Acesse o sistema e faça login com um usuário válido; <br> 2. Navegue até a funcionalidade de registro de atividades; <br> 3. Preencha os seguintes campos obrigatórios: Nome da Atividade: Descreva a atividade , Horas Técnicas, Data da Atividade <br> 4. Clique no botão "Salvar" ou equivalente para registrar a atividade.  <br>|
| **Resultados Esperados:** |O sistema salva o registro da atividade sem erros. A atividade aparece listada na visualização do projeto ou cliente associado. As horas técnicas atribuídas são corretamente contabilizadas no total do projeto ou cliente. Relatórios e dashboards refletem os dados inseridos, vinculados ao projeto ou cliente específico. |

### RF- 03. Registrar Horas de Trabalho
| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | Registrar Horas de Trabalho.|
| **Objetivo:** |O objetivo deste caso de teste é verificar se o sistema impede o registro de mais de 24 horas de trabalho por dia para um usuário, garantindo que os dados de horas trabalhadas sejam consistentes e realistas. Isso ajuda a prevenir entradas incorretas ou abusivas no sistema, assegurando que o controle de horas seja confiável e siga as limitações naturais de um dia (24 horas). |
| **Cenário de Teste** | Cenário 01. Registrar Horas de Trabalho | 
| **Passos para Execução** |1.Acessar a página de registro de horas; <br> 2.Registrar menos de 24 horas, <br> 3. Salvar o registro, <br> 4.Verificar se o registro foi salvo com sucesso  <br> 5.Tentar registrar um total de mais de 24 horas em um único dia, <br> 6. Salvar o registro de horas adicionais, <br> 7. Verificar o comportamento do sistema, <br> 8. Tentar registrar exatamente 24 horas no total para o dia, <br> 9. Salvar o registro e verificar a aceitação.|
| **Resultados Esperados:** |O sistema permite o registro de menos de 24 horas para um dia sem problemas. Ao tentar registrar mais de 24 horas em um único dia, o sistema deve impedir o registro e exibir uma mensagem de erro apropriada. O sistema deve aceitar exatamente 24 horas no total para um dia. |

### RF- 04. Cadastrar as atividades.

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | Descrever os tipos atividades.|
| **Objetivo:** |Verificar a capacidade do sistema de permitir a descrição e seleção de tipos de atividades ao registrar horas. |
| **Cenário de Teste** | Cenário 01. Descrição dos Tipos de Atividades no Registro de Horas. <br>  |  
| **Resultados Esperados:** | O sistema deve permitir que o usuário selecione tipos de atividades pré-definidos para cada registro de horas. O sistema deve permitir que o usuário adicione uma descrição detalhada da atividade realizada. O registro deve ser salvo corretamente com o tipo de atividade e a descrição associados. O sistema deve suportar a inclusão de múltiplos registros de horas com diferentes tipos de atividades para o mesmo dia. |

### RF- 05. Calcular as horas trabalhadas.

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** |Calcular as horas trabalhadas.|
| **Objetivo:**  |Verificar o cálculo automático das horas trabalhadas em um dia, semana e mês | 
| **Passos para Execução** |1.Acessar a página de registro de horas; <br> 2.Registrar horas de trabalho para um único dia, <br> 3. Verificar o cálculo diário de horas, <br>  4. Registrar mais horas em um mês completo; <br> 5. Acessar o relatório mensal e semanal; <br> 6. Verificar o cálculo das horas.|  
| **Resultados Esperados:** | O sistema deve calcular corretamente o total de horas trabalhadas diariamente, somando todas as entradas de horas para um único dia. O sistema deve calcular o total de horas semanais e mensais  somando as horas registradas em todos os dias da respectiva semana e mês. O cálculo das horas deve ser exibido corretamente nos relatórios diários, semanais e mensais. |

### RF- 06. Gerar relatórios filtrados por cliente, com exportação em XLS e PDF

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** |Gerar relatórios filtrados por cliente, com exportação em XLS e PDF.|
| **Objetivo:** | Verificar a geração de relatórios filtrados por cliente e a exportação nos formatos XLS e PDF. | 
| **Passos para Execução** |1. Acessar a página de relatórios; <br> 2. Selecionar o filtro por cliente, <br> 3. Definir o período de tempo,<br> 4. Gerar o relatório filtrado, <br> 5. Verificar a visualização do relatório; <br> 6. Exportar o relatório em formato XLS. <br>7. Verificar o arquivo XLS exportado,<br> 8. Exportar o relatório em formato PDF; <br>9. Verificar o arquivo PDF exportado|  
| **Resultados Esperados:** | O sistema deve gerar corretamente o relatório filtrado por cliente com base nas seleções do usuário. O sistema deve exportar corretamente o relatório em formato XLS (Excel), contendo todos os dados filtrados. O sistema deve exportar corretamente o relatório em formato PDF, com o layout adequado e todos os dados filtrados. Tanto o arquivo XLS quanto o PDF devem conter os dados consistentes e completos de acordo com o cliente e período filtrados. |

### RF- 07. Permitir filtrar por cliente e periodo

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** | Permitir filtrar por cliente e periodo|
| **Objetivo:** | Verificar a capacidade de filtrar relatórios por cliente e intervalo de datas. | 
| **Passos para Execução** |1.Acessar a página de relatórios; <br> 2. Selecionar o filtro por cliente, <br> 3. Selecionar o intervalo de datas, <br> 4. Gerar o relatório filtrado,<br>  5. Verificar a visualização do relatório;<br>  6. Verificar a consistência dos dados;|  
| **Resultados Esperados:** |O sistema deve gerar corretamente o relatório filtrado pelo cliente e pelo intervalo de datas selecionado. O relatório deve conter apenas os registros correspondentes ao "Cliente A" e ao período especificado. O sistema deve exibir uma mensagem apropriada quando não houver dados disponíveis para o cliente e o intervalo de datas selecionados. |

### RF- 08. 	Incluir gráficos no dashboard para visualização dos dados

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** |Incluir gráficos no dashboard para visualização dos dados .|
| **Objetivo:** | Verificar a inclusão e a funcionalidade de gráficos no dashboard para visualização dos dados. | 
| **Passos para Execução** |1Acessar o dashboard ; <br> 2. Verificar a presença dos gráficos, <br> 3. Verificar o tipo de gráfico,  <br> 4. Interagir com os gráficos,  <br>5. Verificar a precisão dos dados; 6. <br>Filtrar dados nos gráficos. 7. <br> Verificar a atualização automática, 8. <br> Testar a visualização em dispositivos diferentes; |
| **Resultados Esperados:** | Os gráficos devem ser visíveis e apresentados no dashboard sem erros. Os tipos de gráficos devem ser apropriados e funcionais, exibindo os dados corretamente. As interações com os gráficos devem fornecer informações adicionais e detalhadas de forma precisa.Os dados apresentados nos gráficos devem ser consistentes com os registros do sistema. Os gráficos devem atualizar corretamente com base nos filtros aplicados e novos dados registrados. A visualização dos gráficos deve ser adequada em diferentes dispositivos.|

### RF- 09. Permitir que editem seus registros de horas

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** |Permitir que editem seus registros de horas.|
| **Objetivo:** |Verificar a funcionalidade de edição de registros de horas pelos usuários. | 
| **Passos para Execução** |1. Acessar a página de registros de horas:; <br> 2. Selecionar um registro de horas existente; <br> 3. Clicar na opção de editar,  <br> 4. Modificar os detalhes do registro, <br> 5. Salvar as alterações;  <br>6. Verificar a atualização do registro;  <br> 7. Tentar editar um registro de uma data bloqueada (passada), 8. <br> Verificar o histórico de alterações (se aplicável);|
| **Resultados Esperados:** |O sistema permite que o usuário edite seus registros de horas e os atualize com sucesso. O registro atualizado reflete corretamente as alterações feitas (número de horas, tipo de atividade, descrição). O sistema bloqueia a edição de registros de horas em períodos definidos como bloqueados (ex: após a aprovação ou fechamento de folha). O histórico de alterações, se existente, deve refletir corretamente as mudanças feitas.|

### RF- 10. Cadastrar clientes com campos de projetos e valor da hora técnica 

| Campo                   | Informação                                                                                             |
|-------------------------|--------------------------------------------------------------------------------------------------------|
| **Requisitos Associados:** |Verificar se o sistema permite o cadastro de clientes, garantindo que os campos relacionados aos projetos e ao valor da hora técnica sejam corretamente preenchidos, armazenados e exibidos.|
| **Objetivo:** |Garantir que o sistema permita o cadastro de clientes com informações completas, incluindo projetos associados e valor da hora técnica.s | 
| **Passos para Execução** |1. Acesse o sistema e navegue até a funcionalidade de "Cadastro de Clientes".; <br> 2. Clique no botão "Novo Cliente" ou equivalente. <br> 3. Preencha os seguintes campos obrigatórios. <br> 
| **Resultados Esperados:**| O cliente é cadastrado com sucesso, e o sistema exibe uma mensagem de confirmação. O cliente aparece na lista de clientes com os dados corretamente preenchidos. O(s) projeto(s) selecionado(s) aparecem associados ao cliente cadastrado. O valor da hora técnica é exibido corretamente e pode ser utilizado em cálculos futuros. Campos obrigatórios não preenchidos impedem o salvamento do cadastro, e o sistema exibe mensagens de erro claras.|


# Registro de Testes de Software
Os resultados obtidos nos testes de software realizados são descritos abaixo. 
### RF- 001. Cadastrar e Autentificar Usuários.

| Cenário de Teste             | Evidência                                                                                           |
|------------------------------|-----------------------------------------------------------------------------------------------------|
| **Cenário 01. Cadastro de usuário com todos os dados válidos** |https://github.com/user-attachments/assets/ac618d3e-5af0-4aec-a453-afb012306b1b|
| **Cenário 02. Cadastro com campos obrigatórios em branco** |![tela7](https://github.com/user-attachments/assets/221c5a46-be50-4db2-9632-fa5db4c0391f)|               |
| **Cenário 03. Cadastro com e-mail já registrado** | ![tela 06](https://github.com/user-attachments/assets/48a59f82-479c-48ab-b587-fe6b13db5f97)| 
| **Cenário 04. Tela Login** |![tela08](https://github.com/user-attachments/assets/4029466a-b27e-485d-bfa3-be5c09943a5e)|

### RF- 002. Associar as horas técnicas e as atividades a projetos específicos ou clientes.

| Cenário de Teste             | Evidência            | Responsável pelo Teste                                                       |
|------------------------------|----------------------|-------------------------------------------------------------------------------|
| **Cenário 01. Garantir que o sistema permita a associação de horas técnicas e atividades a projetos ou clientes específicos.**  | https://github.com/user-attachments/assets/2e32adff-d719-447d-8155-44c2e4adeeed| Felipe Corrêa |

### RF- 004. Cadastrar as atividades.

| Cenário de Teste             | Evidência            | Responsável pelo Teste                                                       |
|------------------------------|----------------------|-------------------------------------------------------------------------------|
| **Cenário 01. Descrição dos Tipos de Atividades no Registro de Horas**  | https://github.com/user-attachments/assets/ac682219-e710-43a6-bff6-25bad58b3384| Jeosafa Eller |

### RF- 008.Incluir gráficos no dashboard para visualização dos dados.

| Cenário de Teste             | Evidência            | Responsável pelo Teste                                                       |
|------------------------------|----------------------|-------------------------------------------------------------------------------|
| **Cenário 01. Verificar a inclusão e a funcionalidade de gráficos no dashboard para visualização dos dados.**  |https://github.com/user-attachments/assets/83dda23f-5bba-42cf-993d-06224838511f | Ronald Justiniano |

### RF- 010. Cadastrar clientes com campos de projetos e valor da hora técnica 

| Cenário de Teste             | Evidência            | Responsável pelo Teste                                                       |
|------------------------------|----------------------|-------------------------------------------------------------------------------|
| **Cenário 01.Garantir que o sistema permita o cadastro de clientes com informações completas, incluindo projetos associados e valor da hora técnica.**  |https://github.com/user-attachments/assets/cf2e3dcb-5abd-44ac-a163-2c66400c70| Taciana Vitorino|






