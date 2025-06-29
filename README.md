# 🏆 Math Genius AI – 🧠 Won $10 Merit Prize!

This is my awarded submission for the StackUp Hackathon. **Math Genius AI** is an intelligent, interactive learning platform focused on enhancing math education with **AI-generated quizzes, handwriting recognition**, and **adaptive explanations**.  
I received a **$10 merit prize** for its innovation in AI + Education! 🥳

---

## 📸 Screenshots
 ![](./Screenshot%202025-06-29%20143839.png) ![](./Screenshot%202025-06-29%20143850.png) 
  ![](./Screenshot%202025-06-29%20143817.png) 
![](./Screenshot%202025-06-29%20143731.png) 

---


# **📚 Math Genius AI – Next-Gen Math Learning Platform**  

🚀 **Math Genius AI** is an **AI-powered interactive learning platform** that enhances mathematics learning through **handwriting recognition, adaptive quizzes, and AI-generated explanations**.  

🔗 **Demo Video:** [Watch Here](https://youtu.be/_UfK5yp_wGk?feature=shared)  

📸 **MongoDB Data Storage Screenshot:** ![View Image](https://i.ibb.co/r2PXzMRY/Screenshot-148.png)  

📸 **Math Handwriting Recognition Screenshot:** ![View Image](https://i.ibb.co/twvdX97Z/Screenshot-143.png)  

⚠️ **Known Issue:** Handwriting recognition is currently not working properly. I am actively improving this feature.  

---

## **⚡ Features**  

✅ **Handwriting Recognition** – Solve equations using real-time drawing *(Currently experiencing issues)*  
✅ **AI-Powered Question Generation** – Google Gemini API for unique questions  
✅ **Adaptive Quiz System** – Personalized learning experience  
✅ **Step-by-Step Explanations** – Clear breakdowns of solutions  
✅ **Performance Tracking** – Quiz scores and learning analytics  
✅ **Secure Authentication** – OTP-based email verification & JWT sessions  
✅ **PDF Report Generation** – Save and track quiz results  
✅ **Interactive UI** – Built with Next.js, React, and TailwindCSS  

---

## **🛠️ Tech Stack**  

### **Frontend:**  
- **Next.js & React** – Fast and scalable UI  
- **TypeScript** – Type-safe development  
- **Tailwind CSS** – Modern and responsive design  
- **Canvas API** – Real-time math drawing  
- **jsPDF** – PDF generation for reports  

### **Backend:**  
- **Node.js & Express.js** – High-performance backend  
- **MongoDB & Mongoose** – Secure and scalable data storage  
- **Google Gemini AI API** – AI-powered question generation  
- **Gmail SMTP** – Secure email verification system  

---

## **📌 Core Functionalities**  

### **1️⃣ AI-Powered Question Generation**  
**Generates topic-based math questions dynamically** using Google Gemini AI.  

#### **Example API Prompt:**  
```js
const prompt = `Create a ${difficulty} level mathematics question for ${topic}, specifically about ${actualSubtopic}.
  ${previousQuestion ? `Previous question was: ${previousQuestion}. Create a different but related question.` : ''}

  Return only a valid JSON object with this exact structure:
  {
    "topic": "${topic}",
    "subtopic": "${actualSubtopic}",
    "difficulty": "${difficulty}",
    "question": "your question here",
    "options": ["first option", "second option", "third option", "fourth option"],
    "correctAnswer": "exact text of correct option",
    "explanation": "step-by-step solution"
  }`;
```

✅ **Adaptive difficulty** – Adjusts based on user performance  
✅ **Step-by-step explanations** – Each question includes detailed solutions  

---

### **2️⃣ AI-Powered Math Assistant**  
A **smart tutor** that helps students with their math queries using a **conversational AI**.  

```js
const prompt = `
  You are a friendly math tutor. Respond in a conversational way without using markdown formatting or bullet points.
  Keep explanations brief and direct. For calculations, simply show the steps in plain text.

  Example:
  Q: "What is 4 + 4?"  
  A: "Let me help you with that! 4 plus 4 equals 8."
  
  Here's the student's question: ${message}
`;
```

✅ **Conversational & interactive**  
✅ **Clear step-by-step solutions**  

---

### **3️⃣ Handwriting Recognition for Math**  
AI-powered **real-time handwritten equation recognition** with solution generation.  

⚠️ **Known Issue:** Handwriting recognition is not working properly. We are actively improving this feature.  

```js
const prompt = `
  Analyze this handwritten mathematical expression and:
  1. Extract the exact mathematical expression
  2. Solve it step-by-step
  3. Format the response as:

  - **Recognized Expression:** (write the expression)
  - **Solution:** (step-by-step solution)
`;
```

✅ **Supports real-time handwriting recognition** *(Currently experiencing issues)*  
✅ **Extracts mathematical symbols & equations**  
✅ **Provides structured step-by-step solutions**  

---

## **📌 Topics Covered**  
📚 **Algebra** | 📏 **Geometry** | 📐 **Trigonometry** | 📊 **Statistics** | 📈 **Calculus**  
🔢 **Number Theory** | 📦 **Mensuration** | 🧩 **Sets & Relations**  Also You can use Custom Topic 

---

## **🔧 Environment Variables Setup**  
Create a `.env.local` file in **root directory** (`hackathon-feb/src/`) and add:  

```plaintext
# MongoDB Database Connection
MONGODB_URI="your_mongodb_connection_string"

# Email Authentication for OTP System
EMAIL="your_email@example.com"
EMAIL_PASS="your_email_password_of_16_digit_get_it_from_google"

# Google Gemini AI API Key
GEMINI_API_KEY="your_gemini_api_key"
```

⚠️ **Keep this file private & add it to `.gitignore`!**  

---

## **🚀 How to Set Up & Run Math Genius AI**  

### **1️⃣ Prerequisites**  
✅ **Node.js** (Download: [https://nodejs.org/](https://nodejs.org/))  
✅ **Git** (Download: [https://git-scm.com/](https://git-scm.com/))  
✅ **MongoDB** (Local or Cloud - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))  

---

### **2️⃣ Clone the Repository**  
```sh
git clone https://github.com/Nitrajsinh-Solanki/hackathon-feb.git
cd hackathon-feb
```

---

### **3️⃣ Install Dependencies**  
```sh
npm install
```

---

### **4️⃣ Start the Development Server**  
```sh
npm run dev
```
🔗 Open **http://localhost:3000**  

---

## **💡 Why Choose Math Genius AI?**  
✔️ **AI-Powered Learning** – Unique, adaptive math questions  
✔️ **Interactive UI** – Real-time handwriting recognition & quizzes *(Currently experiencing issues)*  
✔️ **Secure & Scalable** – Robust authentication & backend  
✔️ **Progress Tracking** – Monitor student performance  

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---

## **🤝 Contributing**  
Contributions are welcome! To contribute:  
1. Fork the repo  
2. Create a new branch (`git checkout -b feature-branch`)  
3. Make your changes  
4. Commit & push (`git push origin feature-branch`)  
5. Submit a pull request  

---

## **📩 Contact**  
📧 **Email:** [nrsolanki2005@gmail.com](mailto:nrsolanki2005@gmail.com)  
🔗 **GitHub:** [Nitrajsinh-Solanki](https://github.com/Nitrajsinh-Solanki)  

---

🎉 **Start Learning Math Smarter with Math Genius AI!** 🚀  

---
