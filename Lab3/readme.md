# WEB PROGRAMMING

## Laboratory No.3

### Professor: Письмак Алексей Евгеньевич
### Student: Dau Cong Tuan Anh
### Group: P32151
### Variant: 15900

## Task:

```
Develop an application based on the JavaServer Faces Framework that checks if a point falls into a given area on the coordinate plane.

The application must include 2 facelets templates - the start page and the main application page, as well as a set of managed beans that implement server-side logic.

```
##### The start page should contain the following elements:
- "Header" containing the student's full name, group number and option number.
- Interactive clock showing the current date and time, updated every 8 seconds.
- A link that allows you to go to the main page of the application
##### The main page of the application should contain the following elements:
- A set of components for setting the coordinates of a point and the radius of an area in accordance with the setting option. 
You may need to use additional component libraries - ICEfaces (prefix "ace") and PrimeFaces (prefix "p"). 
If a component allows input of deliberately incorrect data (such as letters in point coordinates or a negative radius), then the application must validate them.
- A dynamically updated picture depicting an area on the coordinate plane in accordance with the number of the variant and points, the coordinates of which were specified by the user. 
Clicking on the image should initiate a script that determines the coordinates of a new point and sends them to the server to check if it falls into the area. 
The color of the dots should depend on the fact of hitting / missing the area. 
Changing the radius should also initiate a redraw of the image.
- A table listing the results of previous checks.
- A link that allows you to return to the home page.
##### Additional application requirements:
- All verification results must be stored in a database managed by the PostgreSQL DBMS.
- To access the database, you must use the JDBC protocol without any additional libraries.
- A Session-scoped Managed Bean must be used to manage the list of results.
- Managed beans must be configured using annotations.
- Navigation rules between application pages must be specified in a separate configuration file.
## Task
<img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab3/image/task.jpg" style="width:700px;"/>

## result:
- Gate layout:
 <img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab3/image/gate.jpg" style="width:900px;"/>
 <br/>
- Application layout:
<img src="https://github.com/andrey551/Web-ITMO/blob/main/Lab3/image/main.jpg" style="width:900px;"/>
<br/>
 ## Conclusion :
For this laboratory work, I learned many new, about JSF application , how to manage bean, the different between facelet and servlet, and template concept 
