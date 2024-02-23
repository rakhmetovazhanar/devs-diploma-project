from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=250, choices=ROLE_CHOICES, null=False)

class Teacher(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="teacher_account")
    first_name = models.CharField(max_length=250, blank=False, null=False)
    last_name = models.CharField(max_length=250, blank=False, null=False)
    city = models.CharField(max_length=250, null=False, blank=False)
    age = models.IntegerField(blank=False, null=False)
    education = models.CharField(max_length=250, null=False, blank=False)
    phone_number = models.CharField(max_length=250, blank=False, null=False)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    subject = models.CharField(max_length=250, blank=False, null=False)
    description = models.CharField(max_length=250, blank=False, null=False)

class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="student_account")
    first_name = models.CharField(max_length=250, blank=False, null=False)
    last_name = models.CharField(max_length=250, blank=False, null=False)
    city = models.CharField(max_length=250, null=False, blank=False)
    phone_number = models.CharField(max_length=250, blank=False, null=False)
    age = models.IntegerField(blank=False, null=False)

class Category(models.Model):
    category_name = models.CharField(max_length=250, blank=False, null=False)  

class Course(models.Model):
    category_id = models.OneToOneField(Category, on_delete=models.CASCADE, related_name="course_category")
    teacher_id = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="teacher_courses")
    course_name = models.CharField(max_length=250, null=False, blank=False)
    course_description = models.CharField(max_length=250, null=False, blank=False)
    course_cost = models.IntegerField(null=False, blank=False)
    

    