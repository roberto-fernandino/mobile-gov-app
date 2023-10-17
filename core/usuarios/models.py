from ast import Raise
from unittest.mock import Base
from venv import create
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
