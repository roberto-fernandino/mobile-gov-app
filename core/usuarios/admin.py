from django.contrib import admin
from .models import Usuario, Informações, Endereco


# Register your models here.
@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ["cpf", "nome", "email"]
    list_display_links = ["cpf"]
    date_hierarchy = "created_at"
    search_fields = ["nome", "cpf", "email"]
    ordering = ["-last_login"]
    filter_horizontal = ["user_permissions"]
    list_filter = ["is_verified"]


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
    list_filter = ["renda", "despesas_mensais", "nivel_escolaridade"]


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
    search_fields = ["cpf_usuario", "cidade", "bairro"]

    def cpf_usuario(self, obj):
        return obj.usuario.cpf
