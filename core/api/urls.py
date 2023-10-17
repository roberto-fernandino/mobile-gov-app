from django.urls import path
from . import views

app_name = "api"


urlpatterns = [
    path("login/", views.login_usuario, name="login_usuario"),
    path("add-usuario/", views.postUsuario, name="post_usuario"),
]
