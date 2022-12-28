# WEB PROGRAMMING

## Laboratory No.4

### Professor: Письмак Алексей Евгеньевич
### Student: Dau Cong Tuan Anh
### Group: P32151
### Variant: 17000

## Task:

```
* Rewrite the application from the previous lab using the following technologies:

- The back-end layer must be based on Java EE (must use EJBs).
- The front-end layer must be built on React + Redux (you need to use ES6 and JSX) using the React Toolbox component set
- The interaction between the back-end and front-end levels must be organized through the REST API.
- The application should still include 2 pages - the start page and the main page of the application. 
* Both application pages must be adapted to display in 3 modes:

- "Desktop" - for devices whose screen width is equal to or greater than 1077 pixels.
- "Tablet" - for devices whose screen width is equal to or greater than 737 pixels, but less than 1077 pixels.
- "Mobile" - for devices whose screen width is less than 737 pixels.

```
##### The start page should contain the following elements:
- "Header" containing the student's full name, group number and option number.
- Form for entering login and password. Information about users registered in the system should be stored in a separate database table (the password should be stored as a hash sum). 
- Access of unauthorized users to the main page of the application should be prohibited.
##### The main page of the application should contain the following elements:
- A set of input fields for setting the coordinates of a point and the radius of the area in accordance with the setting option: 
- Checkbox {'-3','-2','-1','0','1','2','3',' 4','5'} for the x-coordinate, 
- Input (-5 ... 5) for the y-coordinate, 
- Checkbox {'-3','-2','-1','0', '1','2','3','4','5'} to set the radius of the area. 
- If the input field allows input of deliberately incorrect data (such as letters in point coordinates or a negative radius), then the application must validate them.
- A dynamically updated picture depicting an area on the coordinate plane in accordance with the number of the variant and points, the coordinates of which were specified by the user. 
- Clicking on the image should initiate a script that determines the coordinates of a new point and sends them to the server to check if it falls into the area. 
- The color of the dots should depend on the fact of hitting / missing the area. Changing the radius should also initiate a redraw of the image.
- A table listing the results of previous checks.
- A link by which an authenticated user can close their session and return to the application start page.
##### Additional application requirements:
- All test results must be stored in a database managed by the Oracle DBMS.
- You need to use JPA to access the database.
## Task
<img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab4/docs/IMG/task.jpg" style="width:700px;"/>

## result:
- Login:
 <img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab4/docs/IMG/login.jpeg" style="width:900px;"/>
 <br/>
- Application layout:
<img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab4/docs/IMG/main_page.jpeg" style="width:900px;"/>
- Test Unauthorize send request to server with Postman:
<img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab4/docs/IMG/test_unauth.jpeg" style="width:900px;"/>
<br/>

 ## Conclusion :
For this laboratory work, I learned many new, about React application, redux, responsive , how to manage Database via JPA, Stateful ,Stateless, Singleton , ... Restful API, CORS , .... 

