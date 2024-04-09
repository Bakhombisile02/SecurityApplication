# GovLink

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Security Practices](#security-practices)
7. [Contributing](#contributing)
8. [License](#license)

---

## 1. Introduction <a name="introduction"></a>

Welcome to GovLink, a secure MEAN stack security application developed as a hypothetical school case study for efficient inter-departmental coordination within national governments. This project was undertaken as part of the third-year curriculum for computer science at Varsity College.

GovLink aims to address the complexities of governmental operations by providing a platform where users can securely register, log in, create, view, and manage board issues. Emphasizing data integrity and confidentiality, GovLink ensures that sensitive governmental information is protected and accessible only to authorized personnel.

Through this project, the goal was to simulate real-world scenarios and challenges faced by government agencies in coordinating their activities. By leveraging modern web technologies and adhering to best practices in security and data management, GovLink demonstrates the potential for digital solutions to streamline governmental processes while maintaining the highest standards of security and privacy.

---

## 2. Features <a name="features"></a>

- User Registration and Authentication
- Creation of Security Key Certificates
- Integration with MongoDB for Data Storage
- Password Hashing for Enhanced Security
- Secure Coding Best Practices
- Posting and Viewing of Issues
- Deleting Issues

---

## 3. Requirements <a name="requirements"></a>

To run this application, you will need the following:

- Node.js and npm installed on your system.
- MongoDB installed and running.
- A web browser to access the application.

---

## 4. Installation <a name="installation"></a>

1. Clone the repository:
git clone https://github.com/Bakhombisile02/APDS7311-Application.git

2. Navigate to the project directory:
cd BACKEND

3. Install the required dependencies:
npm install

4. Navigate to the project directory:
cd FRONTEND

5. Install the required dependencies:
npm install


---

## 5. Usage <a name="usage"></a>

1. regenerate new certificate and key using this software `https://slproweb.com/products/Win32OpenSSL.html`.

2. open a new terminal in visual studio

3. navigate to BACKEND using `cd BACKEND`
   
4. install node modules using `npm install`.

5. start server using `npm run start`.

6. navigate to FRONTEND using `cd FRONTEND`

7. install node modules using `npm install`.
    
8. start application by running `ng serve –open`

9. Register or log in to start using the application.

---

## 6. Security Practices <a name="security-practices"></a>

This application employs several security practices to ensure the safety of data and operations:

- **Security Key Certificates**: Follow industry-standard practices for creating and managing security key certificates.

- **Password Hashing**: User passwords are securely hashed before being stored in the database.

- **Secure Coding**: Adherence to secure coding practices to mitigate common vulnerabilities.
  
- **HTTP Headers Security**: Utilization of Helmet middleware to set secure HTTP headers, including frame options and HSTS, to prevent clickjacking attacks and enforce secure communication over HTTPS.

- **Request Rate Limiting**: Implementation of rate limiting middleware to mitigate against denial-of-service (DoS) attacks by restricting the number of requests per IP address within a specified time window.

- **Cross-Origin Resource Sharing (CORS) Configuration**: Configuration of CORS middleware to restrict cross-origin requests to only trusted origins, enhancing security against cross-origin attacks.

- **Logging and Monitoring**: Usage of Morgan middleware for logging HTTP requests, enabling monitoring and analysis of application traffic for security auditing and troubleshooting.

---

## 7. Contributing <a name="contributing"></a>

We welcome contributions from the community. If you'd like to contribute, please follow our [contribution guidelines](CONTRIBUTING.md).

---

## 8. License <a name="license"></a>

This project is licensed under the [MIT License](LICENSE).

---

For any questions or issues, please contact [siyamukeladlamini1@gmail.com](mailto:siyamukeladlamini1@gmail.com).

Thank you for using GovLink Application Development Security!

