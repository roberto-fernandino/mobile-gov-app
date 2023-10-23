from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from pathlib import Path
from api.serializers import UsuarioSerializer, InformacoesSerializer, EnderecoSerializer
from usuarios.models import Endereco, Informações, Usuario
from django.conf import settings
import os

image_path = os.path.join(settings.BASE_DIR, "src", "img", "gov.png")


def create_pdf(path: Path, image_path: Path, user_info: dict = None):
    save_path = path / f"{user_info['nome']}.pdf"

    c = canvas.Canvas(str(save_path), pagesize=letter)
    width, height = letter

    c.drawInlineImage(
        str(image_path),
        (width - 225) / 2,
        height - 120,
        width=150,
        height=100,
    )

    text = c.beginText(100, height - 200)
    text.setFont("Arial", 12)
    for campo, informação in user_info.items():
        line_to_write = str(f"{campo}-{informação}")
        text.textLine(line_to_write)

    c.drawText(text)
    c.showPage()
    c.save()
    print(f"Saving pdf in {save_path}")
