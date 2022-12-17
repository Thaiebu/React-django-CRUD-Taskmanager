from django.shortcuts import render,HttpResponse
from django.urls import is_valid_path
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view,APIView
from rest_framework.response import Response
from rest_framework import status,generics
from django.views.decorators.csrf import csrf_exempt
from rest_framework import mixins,viewsets
from .models import Article
from .serializers import Articleserializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
# Create your views here.


def index(request):
    return HttpResponse("It is working")
# @csrf_exempt

'''


@api_view(["GET","POST"])
def article_list(request):
    #get all articles
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = Articleserializer(articles,many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Articleserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST) 


# @csrf_exempt
@api_view(["GET","PUT","DELETE"])
def getby_id(request,id):
    try:
        articles = Article.objects.get(id=id)
    except Article.DoesNotExist:
        return HttpResponse(status=404)


    if request.method == 'GET':
        serializer = Articleserializer(articles,many=False)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = Articleserializer(articles,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status = status.HTTP_404_NOT_FOUND)
    elif request.method == 'DELETE':
        articles.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

'''
'''
class ArticleList(APIView):
    def get(self,request):
        articles = Article.objects.all()
        serializer = Articleserializer(articles,many=True)
        return Response(serializer.data)
    def post(self,request):
        serializer = Articleserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data ,status = status.HTTP_201_CREATED)
        return Response(serializer.data ,status = status.HTTP_201_CREATED)
class ArticleDetail(APIView):
    def get_object(self,id):
        try:
            return Article.objects.get(id=id)
        except Article.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    def get(self,request,id):
        article = Article.objects.get(id=id)
        serializer = Articleserializer(article)
        return Response(serializer.data)
    def put(self,request,id):
        article = Article.objects.get(id=id)
        serializer = Articleserializer(article,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,id):
        article = Article.objects.get(id=id)
        article.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

'''

# class ArticleList(generics.GenericAPIView,mixins.ListModelMixin, mixins.CreateModelMixin):
#     queryset = Article.objects.all()
#     serializer_class = Articleserializer

#     def get(self,request):
#         return self.list(request)
    
#     def post(self,request):
#         return self.create(request)

# class ArticleDetail(generics.GenericAPIView,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,mixins.DestroyModelMixin):
#     queryset = Article.objects.all()
#     serializer_class = Articleserializer

#     lookup_field="id"

#     def get(self,request,id):
#         return self.retrieve(request,id=id)
#     def put(self,request,id):
#         return self.update(request,id=id)

#     def delete(self,request,id):
#         return self.destroy(request,id=id)



class ArticleViewset(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = Articleserializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication,]


class UserViewset(viewsets.ModelViewSet):
    queryset =User.objects.all()
    serializer_class = UserSerializer

