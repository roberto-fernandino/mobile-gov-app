from urllib import response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UsuarioSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate

"""{
    "cpf":"701.136.996-11",
    "password": "dulce2014"
}
"""


# Serializers here
@api_view(["POST"])
def login_usuario(request):
    cpf = request.data.get("cpf")
    password = request.data.get("password")
    user = authenticate(cpf=cpf, password=password)
    if user is not None:
        if user.is_authenticated:
            serialier = UsuarioSerializer(user)
            response = {"detail": "logado", "usuario": serialier.data}
            return Response(response)
        else:
            return Response(
                {
                    "detail": "Credenciais Inválidas",
                },
                status=status.HTTP_404_NOT_FOUND,
            )
    else:
        return Response(
            {
                "detail": "Credenciais Inválidas",
            },
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
def postUsuario(request):
    serializer = UsuarioSerializer(request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
