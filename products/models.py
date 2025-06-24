from django.db import models

class categories(models.Model):
    name = models.CharField(max_length=50 ,null=True)

class product(models.Model):
     product_name = models.CharField(max_length=50 ,null=True)
     price = models.IntegerField(default=0)
     serial_code = models.CharField(max_length=300 ,null=True)
     description = models.CharField(max_length=500 ,null=True)
     image = models.ImageField(upload_to='uploads', null=True)
     category = models.ForeignKey(categories, on_delete=models.CASCADE, null=True)

     def __str__(self):
         return self.product_name
         