from django.contrib import admin
from .models import Usuario, Informações, Endereco


# Register your models here.
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ["cpf", "nome", "email"]
    list_display_links = ["cpf"]


@admin.register(Informações)
class InformaçõesAdmin(admin.ModelAdmin):
    list_display = [
        "usuario",
        "renda",
        "numero_membros_familia",
        "despesas_mensais",
        "nivel_escolaridade",
    ]
    list_display_links = ["usuario"]


@admin.register(Endereco)
class EndereçoAdmin(admin.ModelAdmin):
    list_display = [
        "cpf_usuario",
        "cidade",
        "bairro",
        "logradouro",
        "numero",
        "complemento",
    ]
    list_display_links = ["cpf_usuario"]

    def cpf_usuario(self, obj):
        return obj.usuario.cpf
