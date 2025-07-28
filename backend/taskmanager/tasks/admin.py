from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to', 'priority', 'due_date', 'status')
    list_filter = ('status', 'priority', 'assigned_to')    
    search_fields = ('title', 'description', 'assigned_to__username')
    ordering = ('-due_date',)
    readonly_fields =('task_id',)