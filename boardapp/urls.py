from django.urls import path
from django.contrib.auth import views as auth_views
from boardapp.views import *

urlpatterns = [

	path('', main_page, name='main'),
	path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
	path('logout/', auth_views.LogoutView.as_view(), name='logout'),
	path('password_change/', auth_views.PasswordChangeView.as_view(template_name='password_change.html'), name='password_change'),
	path('password_change_completed/', auth_views.PasswordChangeDoneView.as_view(template_name='password_change_done.html'), name='password_change_done'),
	path('user_register/', user_register_page, name='register'),
	path('user_register_idcheck/', user_register_idcheck, name='registeridcheck'),
	path('user_register_res/', user_register_result, name='registerres'),
	path('user_register_completed/', user_register_completed, name='registercompleted'),
	path('board_list/', board_list_page, name='boardlist'),
	path('board_list/<category>/', board_list_page, name='boardlist'),
	path('board_write/<category>/', board_write_page, name='boardwrite'),
	path('board_write_res/', board_write_result, name='boardwriteres'),
	path('board_view/<int:pk>/', BoardView.as_view(), name='boardview'),
	path('board_delete_res/', board_delete_result, name='boarddeleteres'),
	path('board_modify/<int:pk>/', BoardModifyView.as_view(), name='boardmodify'),
	path('board_modify_res/', board_modify_result, name='boardmodifyres'),
	path('comm_list/<category>/', board_comm_list_page, name='commlist'),
	path('comm_view/<int:pk>/', BoardCommView.as_view(), name='commview'),
	path('comm_modify/<int:pk>/', BoardCommModifyView.as_view(), name='commmodify'),
	path('reply_list/<article>/', reply_list, name='replylist'),
	path('reply_modify/<int:pk>/', ReplyModifyView.as_view(), name='replymodify'),
	path('reply_write_res/', reply_write_result, name='replywriteres'),
	path('reply_modify_res/', reply_modify_result, name='replymodifyres'),
	path('reply_delete_res/', reply_delete_result, name='replydeleteres'),
	path('board_like/<int:article>/', board_like, name='boardlike'),
	path('board_like_res/', board_like_result, name='boardlikeres'),
	path('introduce/', introduce_page, name='introduce'),
	path('error/', error_page, name='error'),

]