export const SyntacticValidation = {
  validateEmail(email: string): { check: boolean, msg: string } {
    const minEmailLength = 14;
    const maxEmailLength = 45;

    const minLocalLength = 6;
    const maxLocalLength = 30;

    const minDomainLength = 7;
    const maxDomainLength = 14;

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
  
    if (email.length < minEmailLength) {
      return { check: false, msg: "The email address must not be shorter than 14 characters" };
    }
    if (email.length > maxEmailLength) {
      return { check: false, msg: "The email address must not be longer than 45 characters" };
    }
  
    const emailParts = email.split('@');
    if (emailParts.length !== 2) {
      return { check: false, msg: "Domain name part is missing" };
    }

    const [localPart, domainPart] = emailParts;
  

    if (localPart.length < minLocalLength) {
      return { check: false, msg: "The recipient name part must not be shorter than 6 characters" };
    }
    if (localPart.length > maxLocalLength) {
      return { check: false, msg: "The recipient name part must not be longer than 30 characters" };
    }

    if (domainPart.length < minDomainLength) {
      return { check: false, msg: "The domain name part must not be shorter than 7 characters" };
    }
    if (domainPart.length > maxDomainLength) {
      return { check: false, msg: "The domain name part must not be longer than 14 characters" };
    }
        
    return emailRegex.test(email)? { check: true, msg: "" } : { check: false, msg: "Invalid email address" };
  },
  validatePassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  },
  validateUsername(username: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(username);
  }
};