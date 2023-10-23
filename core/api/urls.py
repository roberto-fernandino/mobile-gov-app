from django.urls import path
from . import views

app_name = "api"


urlpatterns = [
    path("login/", views.login_usuario, name="login_usuario"),
    path("signup/", views.add_user, name="singup_usuario"),
    path("generate-pdf/<int:user_id>", views.generate_pdf, name="pdf-generate"),
]
