Feature: Módulo de manutenção
    Scenario: Técnico de manutenção deseja agendar uma manutenção preventiva
        Given that I'm a maintenance technician
        When I schedule a new maintenance
        Then the system confirms that its scheduled

    #Cenário 2: Gerente de produção solicita a um relatório com o total de manutenções de uma maquina
        Dado que eu sou um gerente de produção
        Quando eu solicito um relatório sintético de manutenções
        Então o sistema deve apresentar os valores de acordo com o periodo

    Primeiro digitei o teste, ele falhou pq a function ainda não existe.
    Então eu digitei a função
    Depois de digitar a função o teste falhou novamente
        "maintenance checker › should return a value of total maintenance of a machine

        expect(received).toBe(expected) // Object.is equality

        Expected: 3
        Received: 0"
    Isso quer dizer que a função scheduleMaintenance não está adicionando as manutenções ao contador.
    Então vamos ajustar a função scheduleMaintenance
    Depois de adicionar o ajuste a função scheduleMaintenance, o teste passou