# Final-Year-Project

## What is this?

This is our final year project.

A full stack Javascript application for user review and recommendation system

Members are:
 Bayjid Hossain
 Arif Mahmud
 Ashiqur Rahman

Login and Account Route 
========================== 

##Register User (POST) 
http://localhost:7777/api/register 
------------------------------------------- 

 ##Login User (POST) 
http://localhost:7777/api/login 
------------------------------------------- 

##Logout User (GET) 
http://localhost:7777/api/logout 
------------------------------------------- 

// ##Update Account of User (POST) 
http://localhost:7777/api/account 
-------------------------------------------- 

http://localhost:7777/api/account/forgot 
----------------------------------------------- 
http://localhost:7777/api/account/reset/:token 

##Routes
============ 

-------##For Any Users---------------------- 

// ##Display all stores (GET) 
localhost:7777/api/stores 

// ##Display store by ther slug (seo friendly name) (GET)
 http://localhost:7777/api/store/3-food 

// ##Display all tags with their corresponding number of stores (GET) 
 http://localhost:7777/api/stores/tags 

// ##Display stores by tag name (GET) 
 http://localhost:7777/api/stores/tags/Licensed

// ##Display top ranking store (GET)   
 http://localhost:7777/api/top 

//-------##For Login Users------------------------ 

// ##Display login user wishlist (GET) 
 http://localhost:7777/hearts 

// ##Add new review (POST) 
 http://localhost:7777/reviews/:id 

// ------##For store owners and admins ---------------- 

//##Add new store (POST) 
 http://localhost:7777/api/add 

// ##Edit store (POST) 
 http://localhost:7777/stores/5baf698e8d22672b74c21ac0/edit 




