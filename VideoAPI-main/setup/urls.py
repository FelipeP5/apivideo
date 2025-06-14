from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, permissions
from api_video.api import viewsets
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.conf import settings
from django.conf.urls.static import static

schema_view = get_schema_view(
    openapi.Info(
        title="Vídeo API",
        default_version='v1',
        description="Sistema para controle Video pessoal",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contato@video.com.br"),  
        license=openapi.License(name="Free"), 
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


route= routers.DefaultRouter()
route.register(r'video', viewsets.VideoViewSet, basename='video')
route.register(r'playlist', viewsets.PlaylistViewSet, basename='playlist')
route.register(r'playlistvideo', viewsets.PlaylistVideoViewSet, basename='playlistvideo')
route.register(r"login", viewsets.LoginViewset, basename="login")
route.register(r"usuario", viewsets.UserViewset, basename="usuario")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(route.urls)),
]

urlpatterns += [
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)