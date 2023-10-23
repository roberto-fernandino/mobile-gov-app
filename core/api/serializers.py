from rest_framework import serializers
from usuarios.models import Usuario, Informações, Endereco


class InformacoesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            "renda",
            "numero_membros_familia",
            "despesas_mensais",
            "nivel_escolaridade",
        ]
        model = Informações


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            "cep",
            "logradouro",
            "numero",
            "complemento",
            "bairro",
            "cidade",
        ]
        model = Endereco


# Serializers
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["cpf", "nome", "sobrenome", "email", "data_nascimento"]
        model = Usuario
