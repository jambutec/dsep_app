import {
    SignInPropsModel,
    SignUpPropsModel,
} from '../components/auth/auth.types'
import { ShippingFormData } from '../pages/checkoutPage'

export interface FormErrors {
    name?: string
    mobileNumber?: string
    email?: string
    address?: string
    pinCode?: string
    password?: string
}

export const validateForm = (formData: ShippingFormData): FormErrors => {
    const errors: FormErrors = {}

    if (formData.name.trim() === '') {
        errors.name = 'errorName'
    }

    if (formData.mobileNumber.trim() === '') {
        errors.mobileNumber = 'errorNumber'
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
        errors.mobileNumber = 'errorNumber2'
    }

    if (formData.email.trim() === '') {
        errors.email = 'errorEmail'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'errorEmail2'
    }

    if (formData.address.trim() === '') {
        errors.address = 'errorAddress'
    }

    if (formData.pinCode.trim() === '') {
        errors.pinCode = 'errorZipcode'
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
        errors.pinCode = 'errorZipcode2'
    }

    return errors
}

export const signInValidateForm = (formData: SignInPropsModel): FormErrors => {
    const errors: FormErrors = {}

    if (formData.email.trim() === '') {
        errors.email = 'invalidEmail'
    } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
        errors.email = 'invalidEmail'
    }
    if (formData.password.trim() === '') {
        errors.password = 'passwordRequired'
    } else if (formData.password.length < 8) {
        errors.password = 'pass8charlong'
    } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = 'pass1upperCase'
    } else if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(formData.password)) {
        errors.password = 'pass1SpecialChar'
    }

    return errors
}
export const signUpValidateForm = (formData: SignUpPropsModel): FormErrors => {
    const errors: FormErrors = {}

    if (formData.name.trim() === '') {
        errors.name = 'nameRequired'
    } else if (!/^[A-Za-z\s]*$/.test(formData.name)) {
        errors.name = 'nameContainLetterAndSpace'
    }

    if (formData.email.trim() === '') {
        errors.email = 'invalidEmail'
    } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
        errors.email = 'invalidEmail'
    }
    if (formData.password.trim() === '') {
        errors.password = 'passwordRequired'
    } else if (formData.password.length < 8) {
        errors.password = 'pass8charlong'
    } else if (!/[A-Z]/.test(formData.password)) {
        errors.password = 'pass1upperCase'
    } else if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(formData.password)) {
        errors.password = 'pass1SpecialChar'
    }

    return errors
}
