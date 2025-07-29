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

//

module.exports = validateData