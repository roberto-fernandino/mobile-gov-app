from urllib import response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UsuarioSerializer, EnderecoSerializer, InformacoesSerializer
from rest_framework.response import Response
from django.contrib.auth import authenticate
from usuarios.models import Usuario, Endereco, Informações
from usuarios.pdf_generator import create_pdf
from pathlib import Path
from django.conf import settings
from django.http import FileResponse


@api_view(["POST"])
def login_usuario(request):
    cpf = request.data.get("cpf")
    password = request.data.get("password")
    user = authenticate(cpf=cpf, password=password)
    if user is not None:
        if user.is_authenticated:
            endereco = Endereco.objects.get(usuario=user)
            informacoes = Informações.objects.get(usuario=user)
            user_serialier = UsuarioSerializer(user)
            endereco_serializer = EnderecoSerializer(endereco)
            informacoes_serializer = InformacoesSerializer(informacoes)
            response = {
                "detail": "logado",
                "usuario": user_serialier.data,
                "endereco": endereco_serializer.data,
                "informacoes": informacoes_serializer.data,
            }
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
def add_user(request):
    cpf = request.data.get("cpf")
    email = request.data.get("email")
    data_nascimento = request.data.get("dataNascimento")
    nome = request.data.get("nome")
    sobrenome = request.data.get("sobrenome")
    password = request.data.get("password")
    cep = request.data.get("cep")
    logradouro = request.data.get("logradouro")
    numero = request.data.get("numero")
    bairro = request.data.get("bairro")
    cidade = request.data.get("cidade")
    renda = request.data.get("renda")
    gasto = request.data.get("gasto")
    numero_de_familiares = request.data.get("familia")
    escolaridade = request.data.get("escolaridade")
    complemento = (
        request.data.get("complemento")
        if request.data.get("complemento") != None
        else None
    )
    nascimento_tratado = data_nascimento.split("T")[0]
    new_user = Usuario.objects.create_user(
        cpf=cpf,
        email=email,
        data_nascimento=nascimento_tratado,
        nome=nome,
        sobrenome=sobrenome,
        password=password,
    )
    if new_user:
        Endereco.objects.create(
            cep=cep,
            usuario=new_user,
            logradouro=logradouro,
            numero=numero,
            complemento=complemento,
            bairro=bairro,
            cidade=cidade,
        )
        Informações.objects.create(
            usuario=new_user,
            renda=renda,
            numero_membros_familia=numero_de_familiares,
            despesas_mensais=gasto,
            nivel_escolaridade=escolaridade,
        )
        serializer = UsuarioSerializer(new_user)

        return Response(
            {"detail": "Usuario criado", "usuario": serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(
        {"detail": "Usuario não criado, informações inválidas."},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
def generate_pdf(request, user_id):
    ROOT_DIR = settings.BASE_DIR.parent
    print(ROOT_DIR)
    user_info = {}
    usuario = Usuario.objects.get(id=6)
    informacoes = Informações.objects.get(usuario=usuario)
    endereco = Endereco.objects.get(usuario=usuario)

    user_serializer = UsuarioSerializer(usuario)
    informacoes_serializer = InformacoesSerializer(informacoes)
    endereco_serializer = EnderecoSerializer(endereco)

    user_info.update(user_serializer.data)
    user_info.update(informacoes_serializer.data)
    user_info.update(endereco_serializer.data)

    image_path = Path(ROOT_DIR / "src" / "img" / "gov1.png")
    save_path = Path(ROOT_DIR / "core" / "usuarios" / "pdf")
    pdf_path = create_pdf(save_path, image_path, user_info)
    pdf = open(pdf_path, "rb")
    response = FileResponse(pdf, content_type="application/pdf")
    response["Content-Disposition"] = f'attachment; filename="{pdf_path.name}"'
    return response
