from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)  # Store raw password for now (can hash later)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    doctor_name = models.CharField(max_length=100)
    appointment_datetime = models.DateTimeField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[
        ('Upcoming', 'Upcoming'),
        ('Past', 'Past'),
        ('Cancelled', 'Cancelled'),
    ])

    def __str__(self):
        return f"{self.doctor_name} - {self.appointment_datetime}"
