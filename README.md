
# React + Vite + Firebase

# 🌐 Online Language Tutors

## Project Description
This project is a web application for a company that offers online language tutoring services. The application consists of three main pages:
- **"Home"**
- **"Teachers"**
- **"Favorites"**

These pages provide users with access to information about tutors, their advantages, and the opportunity to choose the best tutor for language learning.

## Main Technologies

**React**: for creating the user interface.  
**Firebase**: for implementing the database (Realtime Database) and user authentication.  
**React Hook Form**: for form validation during registration and authentication.  
**Yup**: for validating data schemas in forms.  
**Styled Components**: for styling components according to the mockup.
## Mockup
The mockup of the application can be found <a href="https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D94%0B%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0">here</a>. The design has been implemented considering the provided examples, complemented by unique color solutions.


## Technical Task
### Main Functionalities:
1. **Authentication**: The user authentication functionality (registration, login, logout) is implemented using Firebase.
2. **Form Validation**: React Hook Form and Yup are used to validate the registration/authentication fields.
3. **Database**: A collection of tutors has been created in the Realtime Database with the following fields:
   - `name`
   - `surname`
   - `languages`
   - `levels`
   - `rating`
   - `reviews`
   - `price_per_hour`
   - `lessons_done`
   - `avatar_url`
   - `lesson_info`
   - `conditions`
   - `experience`
   
   The collection is populated using the `teachers.json` file.

4. **Tutor Card**: A card describing the characteristics of the tutor has been implemented according to the mockup.
5. **Loading Cards**: On the "Teachers" page, 4 cards are rendered, and more can be loaded by clicking the "Load more" button.
6. **Favorite Tutors**:
   - **For Unauthorized Users**: A modal window or push notification about functionality limitations.
   - **For Authorized Users**: Adding tutors to the favorites list with state persistence upon page refresh.
7. **Detailed Information**: Clicking the "Read more" button expands the card to show more details.
8. **Booking a Trial Lesson**: Clicking the "Book trial lesson" button opens a modal window with a booking form.
9. **Private "Favorites" Page**: Available only to authorized users to view their favorite tutors.

## Installation and Running
To run the application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository_URL>

  Author

Miroshnychenko Svitlana

Contacts
   "If you have any questions, please feel free to contact me at <a href="mailto:example@example.com">example@example.com</a>.

- 💼 [LinkedIn](https://www.linkedin.com/in/svitlana-miroshnychenko-12659a2b6/)  