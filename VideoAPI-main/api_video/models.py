from django.db import models
import os
import uuid
from django.utils.deconstruct import deconstructible
from django.core.exceptions import ValidationError

@deconstructible 
class RenameImage(object):
    def __init__(self, subdir='imagens'): 
        self.subdir = subdir

    def __call__(self, instance, filename):
        extension = filename.split('.')[-1] 
        new_name = f"{uuid.uuid4()}.{extension}" 
        return os.path.join(self.subdir, new_name)

@deconstructible 
class RenameVideo(object):
    def __init__(self, subdir='videos'): 
        self.subdir = subdir

    def __call__(self, instance, filename):
        extension = filename.split('.')[-1] 
        new_name = f"{uuid.uuid4()}.{extension}" 
        return os.path.join(self.subdir, new_name)

ALLOWED_IMAGE_EXTENSIONS = ['png', 'jpeg', 'jpg', 'gif']
ALLOWED_VIDEO_EXTENSIONS = ['mp4']
class Video(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    data= models.DateField(auto_now_add=True)
    arquivo= models.FileField(upload_to=RenameVideo('videos/'))
    thumbnail = models.ImageField(upload_to=RenameImage('imagens/'), blank=True)

    def clean(self):
        if self.thumbnail:
            imgExtension = self.thumbnail.name.split('.')[-1].lower()
            if imgExtension not in ALLOWED_IMAGE_EXTENSIONS: 
                raise ValidationError(f"Extensão {imgExtension} não permitida. As extensões permitidas são: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}.")
        vidExtension = self.arquivo.name.split('.')[-1].lower()
        if vidExtension not in ALLOWED_VIDEO_EXTENSIONS:
            raise ValidationError(f"Extensão {imgExtension} não permitida. As extensões permitidas são: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}.")

            
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

class Playlist(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    data = models.DateField(auto_now_add=True)
    thumbnail = models.ImageField(upload_to=RenameImage('imagens/'), blank=True)
    # videos = models.ManyToManyField(Video)

    def clean(self):
        if self.thumbnail:
            extension = self.thumbnail.name.split('.')[-1].lower()
            if extension not in ALLOWED_IMAGE_EXTENSIONS:
                raise ValidationError(f"Extensão {extension} não permitida. As extensões permitidas são: {', '.join(ALLOWED_IMAGE_EXTENSIONS)}.")
            
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

# Não era desnecessário...
class PlaylistVideo(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete = models.CASCADE)
    video = models.ForeignKey(Video, on_delete = models.CASCADE)

