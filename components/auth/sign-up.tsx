import React, { useState } from 'react'
// import HomeImg from '../public/images/HomePageLogo.svg'
// import SkillUp from '../public/images/SkillUpLogo.svg'
import LoginIcon from '../../public/images/LoginIcon.svg'

import style from '../../components/detailsCard/ShippingForm.module.css'
import Styles from '../../components/auth/sign-in.module.css'
import { Box, Flex, Image, useToast } from '@chakra-ui/react'

import Router from 'next/router'
import Cookies from 'js-cookie'
import { useLanguage } from '../../hooks/useLanguage'
import { SignUpPropsModel } from './auth.types'
import {
    FormErrors,
    signUpValidateForm,
} from '../../utilities/detailsForm-utils'
import Button from '../button/Button'
const SignUp = () => {
    const { t } = useLanguage()
    const [formData, setFormData] = useState<SignUpPropsModel>({
        name: '',
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState<FormErrors>({
        name: '',
        email: '',
        password: '',
    })
    const [isFormFilled, setIsFormFilled] = useState(false)
    const toast = useToast()
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prevFormData: SignUpPropsModel) => ({
            ...prevFormData,
            [name]: value,
        }))

        const updatedFormData = {
            ...formData,
            [name]: value,
        }

        const errors = signUpValidateForm(updatedFormData) as any
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errors[name] || '',
        }))
        setIsFormFilled(
            updatedFormData.name.trim() !== '' &&
                updatedFormData.email.trim() !== '' &&
                updatedFormData.password.trim() !== ''
        )
    }

    const handleRegister = async () => {
        const registrationData = {
            username: formData.name,
            email: formData.email,
            password: formData.password,
        }

        try {
            const response = await fetch(`${baseUrl}/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            })

            if (response.ok) {
                const data = await response.json()
                const token = data.jwt

                Cookies.set('authToken', token)
                Router.push('/homePage')
            } else {
                const errorData = await response.json()

                toast({
                    title: 'Error!.',
                    description: errorData.error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })

                console.error('Registration failed')
            }
        } catch (error) {
            console.error('An error occurred:', error)
        }
    }
    return (
        <>
            <Box
                className={Styles.main_container}
                mt="40px"
            >
                <Flex className={Styles.logo_container}>
                    <Image
                        src={LoginIcon}
                        alt="Home Icon"
                    />
                </Flex>
                <Box
                    className={Styles.signin_container}
                    pt="40px"
                >
                    <div className={style.container}>
                        <div className={style.did_floating_label_content}>
                            <input
                                className={style.did_floating_input}
                                type="text"
                                placeholder=" "
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <label className={style.did_floating_label}>
                                {t.formName}
                            </label>
                            {formErrors.name && (
                                <div className={style.error}>
                                    {t[formErrors.name]}
                                </div>
                            )}
                        </div>
                        <div className={style.did_floating_label_content}>
                            <input
                                className={style.did_floating_input}
                                type="text"
                                placeholder=" "
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <label className={style.did_floating_label}>
                                {t.formEmail}
                            </label>
                            {formErrors.email && (
                                <div className={style.error}>
                                    {t[formErrors.email]}
                                </div>
                            )}
                        </div>
                        <div className={style.did_floating_label_content}>
                            <input
                                className={style.did_floating_input}
                                type="password"
                                placeholder=" "
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <label className={style.did_floating_label}>
                                {t.password}
                            </label>
                            {formErrors.password && (
                                <div className={style.error}>
                                    {t[formErrors.password]}
                                </div>
                            )}
                        </div>
                    </div>
                </Box>
                <Button
                    buttonText={t.register}
                    background={'rgba(var(--color-primary))'}
                    color={'rgba(var(--text-color))'}
                    handleOnClick={handleRegister}
                    isDisabled={!isFormFilled}
                />
            </Box>
        </>
    )
}
export default SignUp
