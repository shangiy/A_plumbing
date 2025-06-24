
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('contact/',views.contact,name='contact'),
    path('teams/',views.team, name='teams'),
    path('about/',views.about, name='about'),
     path('checkout/',views.checkout, name='checkout'),
     path('dashboard/',views.dashboard, name='dashboard'),
 path('login/',views.login, name='login'),
 path('signup/',views.signup, name='signup'),

    path('products/plumbing/',views.plumbing, name='plumbing'),
    path('products/roofing/',views.roofing, name='roofing'),
    path('products/tanks/',views.tanks, name='tanks'),
    path('products/lighting/',views.lighting, name='lighting'),
    path('products/decor/',views.decor, name='decor'),


]
