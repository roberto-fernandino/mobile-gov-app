from rest_framework import serializers
from usuarios.models import Usuario, Informações, Endereco


class InformacoesSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Informações


class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Endereco


# Serializers
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Usuario
