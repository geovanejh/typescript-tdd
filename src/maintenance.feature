Feature: Módulo de manutenção
    Scenario: Técnico de manutenção deseja agendar uma manutenção preventiva
        Given that I'm a maintenance technician
        When I schedule a new maintenance
        Then the system confirms that its scheduled

#Cenário 4: Técnico de manutenção deseja agendar uma manutenção
           Dado que eu sou técnico de manutenção
           Quando eu solicito a manutenção
           Então o sistema deve validar os campos tecnico e maquina
    