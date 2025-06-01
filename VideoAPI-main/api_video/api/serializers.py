
from rest_framework import serializers
from api_video import models


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Video
        fields = '__all__'
        extra_kwargs = {
            'id' : {'help_text': 'identificador'},
            'nome':{'help_text': 'nome do vídeo'},
            'descricao':{'help_text': 'descrição do vídeo'},
            'data':{'help_text':'data definida por vontade do usuário'},
            'arquivo':{'help_text':'o arquivo que contém o vídeo'},
            'thumbnail':{'help_text': 'a imagem representativa do vídeo'}
        }

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Playlist
        fields = '__all__'
        extra_kwargs = {
            'id' : {'help_text': 'identificador'},
            'nome':{'help_text': 'nome da playlist'},
            'descricao':{'help_text': 'descrição da playlist'},
            'data':{'help_text':'data definida por vontade do usuário'},
            'thumbnail':{'help_text': 'a imagem representativa da playlist'},
            # 'videos':{'help_text': 'os vídeos que nela estão'},
        }

class PlaylistVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlaylistVideo
        fields = '__all__'
        extra_kwargs = {
            'id' : {'help_text': 'identificador'},
            'playlist':{'help_text': 'id da playlist referida'},
            'video':{'help_text': 'id do vídeo contido.'},
        }