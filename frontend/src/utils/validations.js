export const validateJobSeekerData = (body) => {

    const MINREQUIREDFNCHAR = 4;
    console.log(body);

    const { name, email, mobile, role, state, city } = body;

    const usMobileRegex = /^(\+1\s?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

    if (!name) {
        return 'Full Name is required';
    }
    if (name.length < MINREQUIREDFNCHAR) return `Full Name atleast ${MINREQUIREDFNCHAR} characters required`

    // EMAIL VALIDATIONS
    if (!email) return 'Email is required';

    if (!email.includes('@')) {
        return 'Invalid Email Type'
    }
    // US MOBILE NUMBER VALIDATIONS
    if (!mobile) return 'Mobile number is required';
    if (!usMobileRegex.test(mobile)) {
        return 'Invalid Mobile Number'
    }
    // USER ROLE VALIDATION
    if (!role) return 'Role is required';

    if (role.length < 4) return 'Role must be atleast 4 and more chars'
    // STATE VALIDATION
    if (!state) return 'State is required';

    // CITY VALIDATION
    if (!city) return 'City is required';
}


export const validateEmployerData = (body) => {
    const MINREQUIREDFNCHAR = 5;

    const { name, email, mobile, companyName, companyUrl, state, city } = body;

    const usMobileRegex = /^(\+1\s?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

    if (!name) {
        return 'Contact Name is required';
    }
    if (name.length < MINREQUIREDFNCHAR) return `Contact Name atleast ${MINREQUIREDFNCHAR} characters required`

    // EMAIL VALIDATIONS
    if (!email) return 'Email is required';

    if (!email.includes('@')) {
        return 'Invalid Email Type'
    }

    // US MOBILE NUMBER VALIDATIONS
    if (!mobile) return 'Contact number is required';
    if (!usMobileRegex.test(mobile)) {
        return 'Invalid Contact Number'
    }

    // COMPANY NAME VALIDATION
    if (!companyName) return 'Company Name is required';

    // COMPANY URL VALIDATION
    if (!companyUrl) return 'Company URL is required';

    // STATE VALIDATION
    if (!state) return 'State is required';

    // CITY VALIDATION
    if (!city) return 'City is required';
}