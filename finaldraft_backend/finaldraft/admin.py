from django.contrib import admin
from .models import Assignment,Submission,Attachment,Subtask,SubtaskInfo,GroupInfo
# Register your models here.

admin.site.register(Assignment)
admin.site.register(Submission)
admin.site.register(Attachment)
admin.site.register(Subtask)
admin.site.register(SubtaskInfo)
admin.site.register(GroupInfo)