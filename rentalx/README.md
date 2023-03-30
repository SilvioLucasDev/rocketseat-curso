<h1 align="center">
 RENTALX - Levantamento de requisitos
</h1>

# Cadastro de carro
**RF** 
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O carro deve pertencer a uma categoria.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

##

# Cadastro de categoria
**RF** 
Deve ser possível cadastrar uma nova categoria.

**RN**
Não deve ser possível cadastrar uma nova categoria já existente.
A nova categoria cadastrada deve ser aprovada.
O usuário responsável pelo cadastro deve ser um usuário administrador.

##

# Listagem de carro
**RF** 
Deve ser possível listar todos os carros disponíveis.

**RN**
O usuário não precisa estar logado no sistema para visualizar os carros.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.
Deve ser possível listar todos os carros disponíveis pela categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.

##

# Cadastro de especificação no carro
**RF** 
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listas todas as especificações.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não disponível.
Não deve ser possível cadastrar uma especificação já exinte para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

##

# Cadastro de imagens do carro
**RF** 
Deve ser possível cadastrar imagem do carro.

**RFN**
Utilizar o multer para upload de arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

##

# Alguel de carro carro
**RF** 
Deve ser possível cadastrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo carro.
Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo usuário.