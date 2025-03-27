# IoT-Based Attendance System

*We built this **IoT-Based Attendance System** to simplify and automate attendance tracking using NFC technology. The system allows students and faculty to log attendance by tapping their I-Cards with NFC Tag on an NFC-enabled device. It eliminates manual roll calls or paper-based tracking, ensuring efficiency and time-saving. The web application provides real-time attendance insights with role-based access; faculty can manage users and view all attendance records. New users can be added while students can track their attendance.*

## 💡Problem Statement:
We noticed that attendance in schools and colleges is taken manually, which takes up much time. Faculty has to spend extra minutes marking attendance for others. To address this, we proposed an IoT-Based Attendance System that uses NFC Cards and a cloud database to automate the process. This can help reduce manual effort, minimize errors, and make attendance marking more convenient.

## 🎯Our Objectives With the Project
1. We are developing an IoT-Based Attendance System using NFC Cards to automatically mark attendance.
2. We will store attendance records in a cloud database to access them easily. 
3. We are also making a web app that allows real-time attendance tracking by faculty and students.
4. On the faculty's side, we will generate reports to help analyze attendance data. 
5. On the student's side, they can view their attendance.

## 📊Benefits & Business Case

### 🏫Who Benefits?
- Our system helps to automate attendance tracking, so teachers don't have to take roll calls manually.
- Students can check their attendance anytime from anywhere through the web app and avoid attendance shortages
- Teachers can focus on teaching instead of marking attendance and generate reports to track student's attendance.

### 📈How the Data is Useful?
- All attendance is stored in a cloud database, making access easy and reducing the chances of missing or incorrect records.
- Schools can analyze attendance patterns to identify students who frequently miss class and take action early.
- Parents and students can check attendance records anytime, reducing confusion about attendance shortages.

## 🔍Methodology

### 🛠️Hardware Components & Their Uses
| Sr. No | Components                           | Purpose                                                 | 
|--------|--------------------------------------|---------------------------------------------------------|  
| 1      | NFC Card                             | Unique ID for each student.                             |  
| 2      | PN532 NFC Reader                     | Scans NFC Cards and reads the Unique IDs.               |
| 3      | ESP8266 Microcontroller              | Sends the data to the server via MQTT.                  |  
| 4      | LCD Display (PCF8574-based)          | Displays attendance status.                             |  
| 5      | LED Indicator                        | Red light used to track progress.                       |  
| 6      | Piezo Buzzer                         | Provides sound feedback.                                |  

### 💻Software Stack & Technologies Used
| Sr. No | Technology                           | Purpose                                                 | 
|--------|--------------------------------------|---------------------------------------------------------|  
| 1      | MongoDB + Prisma ORM                 | Database Management.                                    |  
| 2      | Next.js + React                      | Frontend Development.                                   |
| 3      | Node.js + tRPC                       | Backend Development.                                    |  
| 4      | MQTT Protocol                        | Handles communication between device & cloud.           |  
| 5      | NextAuth                             | Google OAuth sign-in for students and faculties.        |  
  
## 🏗️Project Structure

```bash
📂 IoT-Attendance-System
 ├── 📁 server           # Backend server (Node.js + tRPC)
 │   ├── 📁 prisma         # Prisma ORM database setup
 │   ├── 📜 index.js       # Main server entry point
 │   ├── 📜 package.json   # Dependencies
 │   └── 📜 .gitignore    
 │
 ├── 📁 website             # Next.js web application
 │   ├── 📁 src               # Core source files
 │   │   ├── 📁 components      # UI components
 │   │   ├── 📁 styles          # Global styles (Tailwind)
 │   │   ├── 📁 trpc            # API routes (backend)
 │   │   ├── 📜 middleware.ts   # Authentication middleware
 │   ├── 📜 next.config.js           # Next.js configuration
 │   ├── 📜 tailwind.config.ts       # Tailwind configuration
 │   ├── 📜 package.json             # Dependencies
 │   ├── 📜 .gitignore    
 │   └── 📜 README.md     
 │
 ├── 📁 esp8266           # IoT Device Code (ESP8266 + NFC Reader)
 │   ├── 📁 firmware         # Microcontroller firmware (C++)
 │   ├── 📁 mqtt             # MQTT setup for cloud communication
 │   └── 📜 README.md        # Hardware setup guide
 │
 └── 📜 README.md           # Project documentation
```

## 🔮Future Prospects

- Allow teachers to mark their attendance using the same NFC system.
- Track attendance for each lecture or subject instead of just daily attendance.
- Create a mobile app for students and teachers to check attendance and get updates.
- Send automatic alerts to students with low attendance.
- Make offline attendance possible by storing data locally and syncing it later.
- Allow parents to track their child's attendance through a portal.
- Improve the UI/UX of the web app for better usability.

## 🤝Contribution Guidelines

*We welcome contributions to improve and expand the IoT-Based Attendance System! Whether it's fixing bugs, improving documentation, adding features, or optimizing code, your help is appreciated.*
