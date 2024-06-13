<hr/>
User Stories, Use Cases and Requirements<br/><br/>

CSCD350 - Software Development <br>
Team Name: Ctrl Freaks <br>
Date: 04/19/2024 <br>
Canvas Group Number: 6
<br/> <hr/> 
Submitted By:

| Name           	| Email ID          	|
|----------------	|-------------------	|
| Daniel Montes  	| dmontes2@ewu.edu  	|
| Jared Diaz     	| jdiaz38@ewu.edu   	|
| Logan Taggart  	| ltaggart1@ewu.edu 	|
| Brady Dullanty 	| bdullanty@ewu.edu 	|
| Eric Vo        	| tvo12@ewu.edu     	|
<hr/>

Instructor:	Sanmeet Kaur <br/>
GSA: Dominic Maclsaac, Harley Davis <br/>
Lab Section:	2 <br/>
Date: 04/19/2024 <br/> <hr/>

1. **User Stories Based on the project description, add the user stories of this form: .** <br/><br/>
*As a [type of user], I want [an action] so that [a benefit/a value results]* <br><br>
U1 Hiker <br>
As a hiker, I want to be able to view the weather forecast, so that I know how to dress and what trails will or will not be reasonable to hike based on the conditions. <br><br>
U2 Traveler <br>
As a traveler, I want to have knowledge of what the weather will be so that I can plan my quick trips around the weather and if the weather is not what I would like, I would be able to at least prepare for the weather or hold off for another time. For example, if I want to go to the beach and it is going to be pouring rain or worse weather it’ll be nice to know so that I can be prepared whether it is what I wear, things I bring, or just wait for another day. <br><br>
U3 Truck Driver <br>
As a truck driver, I want to know and be aware of the current/future weather as much as possible when traveling during the winter months because some places get hit harder than others at times. It is nice to know where has bad weather so that I am not being blindsided by snow, freezing rain, etc. <br><br>
U4 Air Quality Notifications<br>
As a person who has health conditions that make me sensitive to the quality of the air, I want to be able to view and/or be alerted when the quality is not optimal due to smoke/dust so that I can know when it is safe for me to be outside.<br><br>
U5 Business Owner<br>
As a painting business owner, I want to be able to view how the weather will be for the day so that I am able to effectively organize and plan if my employees will be able to work inside or outside.<br><br>
U6 Hazardous Event<br>
As someone who lives in a tornado ridden area, I want to get quick updates on when one is in the area so that I have proper time to respond for my safety.<br><br>
U7 Farmers<br>
As an agricultural worker, I want to use the forecast so that I can see if we need to do something to help or protect our crops, if it is safe for workers to be outside, or whether there will be work that day based on conditions outside.<br><br>
U8 People with Dependents<br>
As a parent, I want to use the app to check the forecast for dangerous events like hail or thunderstorms so that I can ensure my kid can play outside in a safe and healthy environment. 
 <br/>

2. **Use Case Diagrams** <br/><br/>
![](https://github.com/Sanmeet-EWU/github-teams-project-bid-ctrl-freaks/blob/main/user-stories_use-cases_requirements/useCaseDiagram.jpg) <br><br>
3. **Requirements and Specifications** <br/><br/>
R1 (U1-7) <br>
There will be a feature to show the current weather/forecasted weather in your area.<br><br>
R2 (U2,3,8)<br>
There will be a feature to show the current weather/forecasted weather in other areas.<br><br>
R3 (U4,6)<br>
There will be a feature to track the current air quality and the forecasted air quality for an area.<br><br>
R4 (U1-8)<br>
There will be notifications if dangerous weather conditions are in your area.<br><br>
R5 (U1-8)<br>
There will be an option to choose what time and time scale you want.<br><br>
R6 (U1-8)<br>
There will be a profile system for tracking history and saving locations/preferences using backend
storage systems with SQL.<br><br>
R7 (U1-8)<br>
There will be a log in system using Firebase security systems.<br><br>
R8 (U1-8)<br>
There will be a visual presentation of the current weather using Vue to make visual parsing easier.<br><br>
R9 (U1-8)<br>
There will be a microservice that when given coordinates or a city/zip code returns formatted weather
information to our front-end requester.<br><br>

4. **Glossary** <br/>
- Vue – A framework for creating user interfaces that is built with JavaScript
- SQL – A language for managing and storing data
- FireBase – A backend as a service provided by Google
- Microservices – A small segment/component of an application or feature
- Opt In – The user is prompted if they want a feature(s) to be enabled
- Opt Out – The user is able to disable a certain feature(s) within the app

<hr>
