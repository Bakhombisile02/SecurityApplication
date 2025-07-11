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

5. **Configure Backend Environment**:
   - In the `BACKEND` directory, create a `.env` file by copying from a `.env.example` (if provided) or creating it manually.
   - Add the following required environment variables to `.env`:
     ```
     MONGODB_URL=your_mongodb_connection_string
     JWT_SECRET_KEY=your_strong_jwt_secret_key
     HTTPS_PASSPHRASE=your_https_certificate_passphrase
     ```
   - Ensure `BACKEND/.gitignore` includes `.env` to prevent committing secrets. (A `.gitignore` file has been added to the `BACKEND` directory for this.)

6. start server using `npm run start`.

7. navigate to FRONTEND using `cd FRONTEND`

7. install node modules using `npm install`.
    
8. start application by running `ng serve –open`

9. Register or log in to start using the application.

---

## 6. Security Practices <a name="security-practices"></a>

This application employs several security practices to ensure the safety of data and operations:

- **Security Key Certificates**: Follow industry-standard practices for creating and managing security key certificates.

- **Password Hashing**: User passwords are securely hashed before being stored in the database.

- **Secure Coding**: Adherence to secure coding practices to mitigate common vulnerabilities.

- **Secrets Management**: All sensitive configuration values, including database connection strings, JWT secret keys, and HTTPS certificate passphrases, are managed via environment variables through a `.env` file in the `BACKEND` directory. This file is excluded from version control by `.gitignore` to prevent accidental exposure of secrets.
  
- **HTTP Headers Security**: Utilization of Helmet middleware to set secure HTTP headers. This includes:
    - `X-Frame-Options` (via `frameguard`) to prevent clickjacking.
    - HTTP Strict Transport Security (HSTS) to enforce secure communication over HTTPS.
    - A Content Security Policy (CSP) to provide an additional layer of defense against XSS and data injection attacks.

- **Input Validation and Sanitization**: Comprehensive validation and sanitization of all incoming data on the backend using `express-validator` and `Joi`. This includes checks for data types, formats, lengths, and sanitization (e.g., escaping) to protect against common vulnerabilities like XSS and injection attacks.

- **Request Rate Limiting**: Implementation of rate limiting middleware (`express-rate-limit`) to mitigate against denial-of-service (DoS) attacks by restricting the number of requests per IP address within a specified time window.

- **Cross-Origin Resource Sharing (CORS) Configuration**: Configuration of CORS middleware with a refined policy to restrict cross-origin requests primarily to the intended frontend origin (`https://localhost:4200`) and specific HTTP methods, enhancing security against cross-origin attacks.

- **Dependency Vulnerability Management**: Regular auditing of project dependencies (both frontend and backend) using `npm audit`. Vulnerable dependencies are updated where possible to mitigate known exploits.

- **Static Code Analysis (SAST)**: Integration of CodeQL with GitHub Actions, configured to use extended security query suites (`security-extended`, `security-and-quality`). This helps in automatically identifying potential security vulnerabilities and coding errors in the JavaScript/TypeScript codebase during development.

- **Frontend Configuration Management**: API URLs and other environment-specific settings for the frontend application are managed using Angular's standard environment files (`src/environments/environment.ts` and `src/environments/environment.prod.ts`), avoiding hardcoded values in components or services.

- **Logging and Monitoring**: Usage of Morgan middleware for logging HTTP requests, enabling monitoring and analysis of application traffic for security auditing and troubleshooting.

---

### Security Considerations / Future Enhancements

- **JWT Storage**: Currently, JWTs (authentication tokens) are stored in `localStorage` on the frontend. While common, `localStorage` is susceptible to XSS attacks. For enhanced security, it is highly recommended to transition to storing JWTs in `HttpOnly` cookies. This change would require modifications on both the backend (to set the cookie) and frontend (to handle authentication state differently), along with the implementation of CSRF (Cross-Site Request Forgery) protection on the backend.

---

## 7. Contributing <a name="contributing"></a>

We welcome contributions from the community. If you'd like to contribute, please follow our [contribution guidelines](CONTRIBUTING.md).

---

## 8. License <a name="license"></a>

This project is licensed under the [MIT License](LICENSE).

---

For any questions or issues, please contact [siyamukeladlamini1@gmail.com](mailto:siyamukeladlamini1@gmail.com).

Thank you for using GovLink Application Development Security!

