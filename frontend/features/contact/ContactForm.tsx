export interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void
  isLoading: boolean
  error?: string | null
  success?: boolean
}
