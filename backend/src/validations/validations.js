const MINREQUIREDFNCHAR = 5;
const validateData = (body) => {
    const { fullName, email, mobile, role, state, city } = body;
    const usMobileRegex = /^(\+1\s?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

    if (!fullName) {
        return 'Full Name is required';
    }
    if (fullName.length < MINREQUIREDFNCHAR) return `Full Name atleast ${MINREQUIREDFNCHAR} characters required`
    
    // EMAIL VALIDATIONS
    if (!email) return 'Email is required';
   
    if (!email.includes('@') ) {
        return 'Invalid Email Type'
    }
    // US MOBILE NUMBER VALIDATIONS
    if (!mobile) return 'Mobile number is required';
    if (!usMobileRegex.test(mobile)) {
        return 'Invalid Mobile Number'
    }
    // USER ROLE VALIDATION
    if (!role) return 'Role is required';

    // STATE VALIDATION
    if (!state) return 'State is required';

    // CITY VALIDATION
    if (!city) return 'City is required';
}

// VALIDATE EMPLOYER DATA 

const validateEmployerData=(data)=>{
    const { company_name, company_email, meeting_link, contact_name, contact_mobile, zip_code, openings, technologies, contact_email } = data

    //COMPANY NAME VALIDATION
    if(!company_name) return "company name is required"
    
    if(company_name.length < 5 ) return "please enter the company name above 5 characters"

    //COMPANY EMAIL VALIDATION
    if(!company_email) return "email is required"
    
    if(!company_email.includes("@")) return "please enter valid email"

    //CONTACT NAME VALIDATION
    if(!contact_name) return "please enter contact name";
    
  //MOBILE NUMBER VALIDATION
    if(!contact_mobile) return "please enter mobile number";
    
    if(contact_mobile.length !== 10) "please enter valid mobile number"

    //OPENINGS VALIDATION
    if(!openings) return "please enter the openings"
    
     //TECHNOLOGIES VALIDATION
    if(!technologies) return "please enter the technologies"

    //CONTACTEMAIL VALIDATION
    if(!contact_email) return "please enter the email"

    
    if(!contact_email.includes("@")) return "please enter valid email"


}

module.exports = { validateData , validateEmployerData};