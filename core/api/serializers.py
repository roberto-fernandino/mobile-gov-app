from rest_framework import serializers
from usuarios.models import Usuario


# Serializers
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Usuario
