from django.contrib import admin
from boardapp.models import *

# Register your models here.
admin.site.register(Boards)
admin.site.register(BoardCategories)
admin.site.register(BoardReplies)
admin.site.register(BoardLikes)