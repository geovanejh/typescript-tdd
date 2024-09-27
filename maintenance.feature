Feature: Controle de manutenções

    Cenário: Técnico de manutenção deseja agendar uma manutenção preventiva
        Dado que sou um técnico de manutenção
        Quando Eu agendo uma manutenção para uma máquina específica
        Então O sistema válida as informações e confirma o agendamento.

    - A data de agendamento da manutenção não pode ser inferior a data atual.
    - O técnico responsável pela manutenção deve estar atribuído ao papel "Técnico" no sistema.

    Cenário: Gerente de produção solicita a um relatório com o total de manutenções de uma maquina
        Dado que eu sou um gerente de produção
        Quando eu solicito um relatório sintético de manutenções
        Então o sistema deve apresentar os valores de acordo com o periodo

    Cenário 3: Técnico Manutenção conclui manutenção e libera máquina para uso
        Dado que eu sou técnico de manutenção
        Quando eu solicito que a manutenção seja concluída
        Então o sistema deve apresentar a manutenção como concluída