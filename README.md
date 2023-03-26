# RecipeFinder
RecipeFinder is a mobile app developed using React Native and AWS Lambda to help users keep track of inredients in their fridge as well as their recipes. 
# Features
* Full user sign in authorization functionality allowing users to keep track of their own data.
* Allow users to keep track of what ingredients are in their fridge, and their homemade recipes.
* Recommend recipes based on attributes like the last cosume date and frequency. (Potentially using ChatGPT api for recommendation)
* All users to mark what recipe is consumed and update the ingredienst in the fridge accordingly
# Getting Started
1. Clone the repo
2. Download **Expo Go** on your mobile device
3. Navigate to the **Frontend** folder in your terminal and run `npx expo start`
4. Scan the QR code using your Expo Go
# Reminder
If you want to deploy the backend to your own AWS account, you need to add a layer with PyJWT downloaded as zip file for the Lambda Function
