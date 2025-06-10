from rest_framework import viewsets, status
from api_video.api import serializers
from api_video import models
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class VideoViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.VideoSerializer
    queryset = models.Video.objects.all()
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description= "Listar vídeos",
        responses= {200: serializers.VideoSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Criar vídeos",
        responses={201: "Vídeo criad0 com sucesso"}
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Encontrar vídeos",
        responses={200: "Vídeo adquirido com sucesso"}
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Atualizar vídeos conforme id e dados entrados",
        responses={200: "Vídeo atualizado com sucesso"}
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Apaga vídeos no id definido",
        responses={204: "Vídeo destruído com sucesso"}
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PlaylistSerializer
    queryset = models.Playlist.objects.all()
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description= "Listar playlists",
        responses= {200: serializers.PlaylistSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        #GET
        return super().list(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Criar playlists",
        responses={201: "Playlist criada com sucesso"}
    )
    def create(self, request, *args, **kwargs):
        #POST
        return super().create(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Encontrar playlists",
        responses={200: "Playlist adquirida com sucesso"}
    )
    def retrieve(self, request, *args, **kwargs):
        #GET ID
        return super().retrieve(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Atualizar playlists conforme id e dados entrados",
        responses={200: "Playlist atualizada com sucesso"}
    )
    def update(self, request, *args, **kwargs):
        #PUT
        return super().update(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Apaga playlist no id definido",
        responses={204: "Playlist apagada com sucesso"}
    )
    def destroy(self, request, *args, **kwargs):
        #DELETE
        return super().destroy(request, *args, **kwargs)


class PlaylistVideoViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PlaylistVideoSerializer
    queryset = models.PlaylistVideo.objects.all()
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description= "Listar videos em playlists",
        responses= {200: serializers.PlaylistVideoSerializer(many=True)}
    )
    def list(self, request, *args, **kwargs):
        #GET
        return super().list(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Criar arranjo de video numa playlist",
        responses={201: "Arranjo criado com sucesso"}
    )
    def create(self, request, *args, **kwargs):
        #POST
        return super().create(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Encontrar arranjo",
        responses={200: "Arranjo adquirido com sucesso"}
    )
    def retrieve(self, request, *args, **kwargs):
        #GET ID
        return super().retrieve(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Atualizar arranjos conforme id e dados entrados",
        responses={200: "Arranjo atualizado com sucesso"}
    )
    def update(self, request, *args, **kwargs):
        #PUT
        return super().update(request, *args, **kwargs)
    
    @swagger_auto_schema(
        operation_description= "Apaga arranjo no id definido",
        responses={204: "Arranjo apagado com sucesso"}
    )
    def destroy(self, request, *args, **kwargs):
        #DELETE
        return super().destroy(request, *args, **kwargs)
    
class UserViewset(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

class LoginViewset(viewsets.ViewSet):
    def create(self, request):
        #Valida as credenciais do usuario
        serializer = serializers.LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            user = authenticate(username = username, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token
                return Response({
                    'access': str(access_token),
                    'refresh': str(refresh),
                    'user': {
                        'userId': user.id,
                        'username': user.username,
                    }
                }, status= status.HTTP_200_OK)
            return Response("Falha na autenticação", status=status.HTTP_400_BAD_REQUEST) 
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)