import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { authService } from '@/services/auth/auth.service'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

export function ForgotPasswordPage() {
    const { t } = useTranslation()
    const [success, setSuccess] = useState(false)

    const form = useForm({
        defaultValues: {
            email: '',
        },
        onSubmit: async ({ value }) => {
            await authService.forgotPassword(value)
            setSuccess(true)
        },
    })

    return (
        <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="space-y-1 text-center">
                <h1 className="text-2xl font-bold tracking-tight">{t('forgot_password.title')}</h1>
                <CardDescription>
                    {t('forgot_password.description')}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {success ? (
                    <div className="text-center text-green-600">
                        {t('forgot_password.success_message')}
                    </div>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                        className="grid gap-4"
                    >
                        <form.Field
                            name="email"
                            validators={{
                                onChange: ({ value }) =>
                                    !value.includes('@') ? t('login.invalid_email') : undefined,
                            }}
                            children={(field) => (
                                <div className="grid gap-2">
                                    <Label htmlFor={field.name}>{t('login.email_label')}</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder={t('login.email_placeholder')}
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                    />
                                    {field.state.meta.errors ? (
                                        <p className="text-sm text-red-500">{field.state.meta.errors.join(', ')}</p>
                                    ) : null}
                                </div>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {t('forgot_password.send_link')}
                        </Button>
                    </form>
                )}
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <div className="text-center text-sm text-muted-foreground">
                    <Link to="/" className="flex items-center justify-center gap-2 underline underline-offset-4 hover:text-primary">
                        <FaArrowLeft className="h-3 w-3" /> {t('forgot_password.back_to_login')}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
