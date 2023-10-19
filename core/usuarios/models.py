from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from datetime import datetime


class CustomUserManager(BaseUserManager):
    def create_user(
        self,
        cpf,
        nome,
        sobrenome,
        data_nascimento,
        email,
        password=None,
        created_at=datetime.now(),
    ):
        if not cpf:
            raise ValueError("Cpf Obrigatório!")
        if not email:
            raise ValueError("Email Obrigatório!")
        if not nome:
            raise ValueError("Nome Obrigatório!")
        if not sobrenome:
            raise ValueError("Sobrenome Obrigatório!")
        if not data_nascimento:
            raise ValueError("Sobrenome Obrigatório!")
        if not password:
            raise ValueError("Senha Obrigatória!")
        user = self.model(
            cpf=cpf,
            nome=nome,
            sobrenome=sobrenome,
            email=email,
            data_nascimento=data_nascimento,
            password=password,
            created_at=created_at,
        )
        user.set_password(password)
        user.is_admin = False
        user.is_staff = False
        user.is_superuser = False
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        cpf,
        nome,
        sobrenome,
        data_nascimento,
        email,
        password=None,
        created_at=datetime.now(),
    ):
        if not cpf:
            raise ValueError("Cpf Obrigatório!")
        if not email:
            raise ValueError("Email Obrigatório!")
        if not nome:
            raise ValueError("Nome Obrigatório!")
        if not sobrenome:
            raise ValueError("Sobrenome Obrigatório!")
        if not data_nascimento:
            raise ValueError("Sobrenome Obrigatório!")
        if not password:
            raise ValueError("Senha Obrigatória!")
        user = self.create_user(
            cpf=cpf,
            nome=nome,
            email=email,
            sobrenome=sobrenome,
            data_nascimento=data_nascimento,
            password=password,
            created_at=created_at,
        )
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


# Create your models here.
class Usuario(AbstractBaseUser, PermissionsMixin):
    cpf = models.CharField(max_length=15, unique=True, blank=False, null=False)
    nome = models.CharField(max_length=200, blank=False, null=False)
    sobrenome = models.CharField(max_length=200, blank=False, null=False)
    data_nascimento = models.DateField()
    email = models.EmailField(verbose_name="email address", max_length=255)
    password = models.CharField(max_length=100, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Permissions
    is_admin = models.BooleanField(default=False, verbose_name="admin")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    # Manager
    objects = CustomUserManager()

    USERNAME_FIELD = "cpf"
    REQUIRED_FIELDS = ["nome", "sobrenome", "data_nascimento", "email", "password"]

    def __str__(self) -> str:
        return self.nome


class Endereco(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    cep = models.CharField(max_length=9, unique=False, blank=False, null=False)
    logradouro = models.CharField(max_length=255)
    numero = models.IntegerField()
    apartamento = models.CharField(max_length=20, null=True, blank=True)
    bairro = models.CharField(max_length=255)
    cidade = models.CharField(max_length=255)


class Informações(models.Model):
    RENDA_CHOIES = [
        ("R$ 0.0 - R$ 1.000.00", "R$ 0.0 - R$ 1.000.00"),
        ("R$ 1.000.00 - R$ 5.000.00", "R$ 1.000.00 - R$ 5.000.00"),
        ("R$ 5.000.00 - R$ 15.000.00", "R$ 5.000.00 - R$ 15.000.00"),
        ("Maior que R$ 20.000.00", "Maior que R$ 20.000.00"),
    ]
    DESPESAS_CHOICES = [
        ("R$ 0.0 - R$ 1.000.00", "R$ 0.0 - R$ 1.000.00"),
        ("R$ 1.000.00 - R$ 5.000.00", "R$ 1.000.00 - R$ 5.000.00"),
        ("R$ 5.000.00 - R$ 15.000.00", "R$ 5.000.00 - R$ 15.000.00"),
        ("Maior que R$ 20.000.00", "Maior que R$ 20.000.00"),
    ]
    MEMBROS_FAMILIA_CHOICES = [
        ("Até 5 Membros", "Até 5 Membros"),
        ("Até 10 Membros", "Até 10 Membros"),
        ("Mais que 10", "Mais que 10"),
    ]
    ESCOLARIDADE_CHOICES = [
        ("Ensino Fundamental Incompleto", "Ensino Fundamental Incompleto"),
        ("Ensino Médio Incompleto", "Ensino Médio Incompleto"),
        ("Ensino Médio Completo", "Ensino Médio Completo"),
        ("Cursando Faculdade", "Cursando Faculdade"),
        ("Curso Superior Completo", "Curso Superior Completo"),
    ]
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    renda_familiar = models.CharField(max_length=100, choices=RENDA_CHOIES)
    numero_membros_familia = models.CharField(
        max_length=100, choices=MEMBROS_FAMILIA_CHOICES
    )
    despesas_mensais = models.CharField(max_length=100, choices=DESPESAS_CHOICES)
    nivel_escolaridade = models.CharField(max_length=150, choices=ESCOLARIDADE_CHOICES)
