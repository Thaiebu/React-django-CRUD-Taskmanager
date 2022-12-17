from django.contrib import admin

# Register your models here.

from .models import Article

# admin.site.register(Article)
@admin.register(Article)
class ArticlModel(admin.ModelAdmin):
    list_filter = ('title','description')
    list_display = ('title','description')