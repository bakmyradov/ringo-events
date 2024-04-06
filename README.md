<h1><img src="./images/Ringo-White.png" width=40 alt="logo"/> Ringo</h1>

---
## What is Ringo?
**Ringo** is an _event sharing & ticketing_ platform that allows organisations to create and share their events.  

It is user-experience focused and aims to provide a seamless experience for both the event organisers and the attendees.
Users can search for events, view event details, save events, purchase tickets and more.

The application consists of a **web app** and a **mobile app**. The web app is used by the event organisers to create and manage their events. 
The mobile app is used by the participants to view and purchase tickets for the events. 

The platform also provides a dedicated app for scanning and validating tickets.

Some of the features of the application are:
- Sign-in using Google / Apple
- Event search by distance to the user's location
- Support for multiple currencies (with automatic conversion when searching)
- Support for multiple ticket types (early bird, regular, etc.)
- Support for registration forms for events
- Users are able to review and rate organisers

---

## Technical Aspects

> **_NOTE:_** As we worked on Ringo as a team with my friends, this repository only contains my contributions to the project.

In the development of Ringo's web application, we opted for **Nuxt 3** to build a dynamic and responsive dashboard exclusively for event organizers.

### Web App Dashboard
The web application, built with **Nuxt 3**, is primarily used by event organizers. It serves as a central hub for:
- Creating and editing events: Organizers can set event details, upload images, and configure tickets.
- Managing registrations: Viewing participant lists, managing waitlists, and sending updates to attendees.
- Analyzing event performance: Access to analytics and feedback to understand attendee engagement and satisfaction.

The dashboard's design emphasizes usability and simplicity, ensuring that organizers can efficiently manage their events without navigating through complex interfaces.

### Leveraged Features of Nuxt 3
- **Automatic routing** for streamlined page creation and navigation.
- **Server-side rendering** for improved SEO and faster page loads.
- **Pinia state management** for managing application state.
- **Modular architecture** for easier maintenance and feature scalability.

This approach enabled us to create a robust platform where event organizers can manage their events, track registrations, and gather insights—all from one intuitive dashboard.

---

## Tech stack

### Backend
<table>
    <tr>
        <th>
            <a href="#"><img src="./images/java.svg" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                Java
            </span>
        </th>
        <th>
            <a href="#"><img src="./images/spring-boot.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                Spring Boot
            </span>
    </tr>
    <tr>
        <th>
            <a href="#"><img src="./images/postgres.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                PostgreSQL
            </span>
        </th>
        <th>
            <a href="#"><img src="./images/amazon-s3.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                Amazon S3
            </span>
        </th>
    </tr>
</table>

### Web app
<table>
    <tr>
        <th>
            <a href="#"><img src="./images/javascript.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                JavaScript
            </span>
        </th>
        <th>
            <a href="#"><img src="./images/vue.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                Vue.js
            </span>
        </th>
    </tr>
</table>

### Mobile app
<table>
    <tr>
        <th>
            <a href="#"><img src="./images/flutter.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                Flutter
            </span>
        </th>
        <th>
            <a href="#"><img src="./images/dart-logo.png" width=20 height=20 alt="vue"/></a>
            <span style="color:white;font-weight:100;font-size:20px;font-family: '.AppleSystemUIFont',serif">
                Dart
            </span>
        </th>
    </tr>
</table>

---
## Screenshots

### Mobile app
<img src="./images/screenshots/Feed.png" width=400/>
<img src="./images/screenshots/Event.png" width=400/>
<img src="./images/screenshots/Event2.png" width=400/>
<img src="./images/screenshots/Search.png" width=400/>
<img src="./images/screenshots/Profile.png" width=400/>
<img src="./images/screenshots/Ticket.png" width=400/>
<img src="./images/screenshots/RegistrationForm.png" width=400/>
<img src="./images/screenshots/ContactHost.png" width=400/>
<img src="./images/screenshots/Organisation.png" width=400/>

### Web app
<img src="./images/screenshots/WebLogin.jpg" width=800/><br>
<img src="./images/screenshots/WebEvents.jpg" width=800/><br>
<img src="./images/screenshots/WebProfile.jpg" width=800/><br>





