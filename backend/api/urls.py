from django.db import router
from django.urls import path,include
# from .views import ArticleList,ArticleDetail
from .views import ArticleViewset,UserViewset

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('article',ArticleViewset,basename='article')
router.register('users',UserViewset)

urlpatterns = [
    #path('', views.index,name="index"),
    # path('article/', views.article_list,name="article_list"),
    # path('article/<str:id>', views.getby_id,name="getby_id"),
    # path('article/',ArticleList.as_view()),
    # path('article/<int:id>/',ArticleDetail.as_view()),
    # path('article/',ArticleList.as_view()),
    # path('article/<int:id>/',ArticleDetail.as_view()),
    path('api/',include(router.urls)),
]
