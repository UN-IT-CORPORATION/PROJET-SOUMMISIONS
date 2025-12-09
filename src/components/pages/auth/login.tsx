import { useForm } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { authService } from '@/services/auth/auth.service'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'


export function LoginPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            try {
                const response = await authService.login(value)
                localStorage.setItem('token', response.token)
                navigate({ to: '/dashboard' })
            } catch (e) {
                setError(t('login.invalid_credentials'))
            }
        },
    })

    return (
        <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center">
                    <img src="/images/logo.png" alt="EBAX Logo" className="h-12 w-auto" />
                </div>
                <CardDescription>
                    {t('login.welcome')}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">

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
                    <form.Field
                        name="password"
                        children={(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor={field.name}>{t('login.password_label')}</Label>
                                <div className="relative">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t('login.password_placeholder')}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <FaEye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">
                                            {showPassword ? "Hide password" : "Show password"}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full cursor-pointer">
                        {t('login.sign_in')}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <div className="text-center text-sm text-muted-foreground">
                    <Link to="/forgot-password" className="underline underline-offset-4 hover:text-primary">
                        {t('login.forgot_password')}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
