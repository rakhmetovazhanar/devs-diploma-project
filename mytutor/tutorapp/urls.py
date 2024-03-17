from django.urls import path
from .views import register_teacher, register_student, login_student, login_teacher, logout

urlpatterns = [
    path('register-teacher/', register_teacher, name='register-teacher'),
    path('register-student/', register_student, name='register-student'),
    path('login_teacher/', login_teacher, name='login-teacher'),
    path('login_student/', login_student, name='login_student'),
    path('logout/', logout, name='logout'),
]